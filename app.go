package main

import (
	"time"

	"github.com/iris-contrib/examples/mvc/login/datasource"
	"github.com/iris-contrib/examples/mvc/login/repositories"
	"github.com/iris-contrib/examples/mvc/login/services"
	"github.com/iris-contrib/examples/mvc/login/web/controllers"
	"github.com/iris-contrib/examples/mvc/login/web/middleware"

	"github.com/kataras/iris"
	"github.com/kataras/iris/mvc"
	"github.com/kataras/iris/sessions"

	"github.com/valyala/tcplisten"

	"os"
	"log"
	"fmt"
	"google.golang.org/api/option"
	"firebase.google.com/go"
	"google.golang.org/api/iterator"
	"cloud.google.com/go/firestore"
	"context"
	"encoding/json"

)


func newApp() *iris.Application {


	app := iris.New()

	// You got full debug messages, useful when using MVC and you want to make
	// sure that your code is aligned with the Iris' MVC Architecture.
	app.Logger().SetLevel("debug")

	app.RegisterView(iris.HTML("./client/build", ".html").Binary(Asset, AssetNames))

	app.Get("/", func(ctx iris.Context) {
		ctx.View("index.html")
	})

	mvc.New(app).Handle(new(APIController))

	assetHandler := app.StaticEmbeddedHandler("./client/build", Asset, AssetNames)

	app.SPA(assetHandler).AddIndexName("index.html")

	return app
}

func main() {

	// Heroku provides the port to bind to
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000" // Setting a Default port to 8000 to be used locally
	}

	app := newApp()

	listenerCfg := tcplisten.Config{
		ReusePort:   true,
		DeferAccept: true,
		FastOpen:    true,
	}

	// tcp4 for ipv4 TCP listener; or tcp6 or ipv6
	l, err := listenerCfg.NewListener("tcp4", ":"+port)
	if err != nil {
		app.Logger().Fatal(err)
	}

	// Shutdown Callback
	app.ConfigureHost(func(h *iris.Supervisor) {
		h.RegisterOnShutdown(func() {
			println("💀Server Terminated 💀")
		})
	})


	// ---- Serve our controllers. ----


	// Prepare our repositories and services.
	db, err := datasource.LoadUsers(datasource.Memory)
	if err != nil {
		app.Logger().Fatalf("error while loading the users: %v", err)
		return
	}
	repo := repositories.NewUserRepository(db)
	userService := services.NewUserService(repo)

	// "/users" based mvc application.
	users := mvc.New(app.Party("/users"))
	// Add the basic authentication(admin:password) middleware
	// for the /users based requests.
	users.Router.Use(middleware.BasicAuth)
	// Bind the "userService" to the UserController's Service (interface) field.
	users.Register(userService)
	users.Handle(new(controllers.UsersController))

	// "/user" based mvc application.
	sessManager := sessions.New(sessions.Config{
		Cookie:  "sessioncookiename",
		Expires: 24 * time.Hour,
	})
	user := mvc.New(app.Party("/user"))
	user.Register(
		userService,
		sessManager.Start,
	)
	user.Handle(new(controllers.UserController))
	// Error Handling Client Error
	app.OnErrorCode(iris.StatusNotFound, notFound)
	// Error Handling Internal Error
	app.OnErrorCode(iris.StatusInternalServerError, internalServerError)

	log.Fatal(app.Run(iris.Listener(l)))
	app.Run(
		iris.Listener(l),
		// Disables the updater.
		iris.WithoutVersionChecker,
		// Ignores err server closed log when CTRL/CMD+C pressed.
		iris.WithoutServerError(iris.ErrServerClosed),
		// Enables faster json serialization and more.
		iris.WithOptimizations,
		)

}

// Creating MVC Controller Type
type APIController struct {}

// GET: /api/runbooks
func (c *APIController) GetApiRunbooks() string {

	ctx := context.Background()
	// Use a service account
	sa := option.WithCredentialsFile("./firestore.json")
	app, err := firebase.NewApp(ctx, nil, sa)
	if err != nil {
		log.Fatalln(err)
	}

	client, err := app.Firestore(ctx)
	if err != nil {
		log.Fatalln(err)
	}
	defer client.Close()

	var counter int = 0

	iter := client.Collection("runbooks").OrderBy("dateCreated", firestore.Desc ).Documents(ctx)

	type Runbook struct {
		Id 			string	`json:"id"`
		Index 		int		`json:"index"`
		Title		string	`json:"title"`
		Description	string	`json:"description"`
		Image		string	`json:"image"`
		Type		string	`json:"type"`
		Views		int		`json:"views"`
		Answers		int		`json:"answers"`
		Upvotes		int		`json:"upvotes"`
		Downvotes	int		`json:"downvotes"`
		Datecreated	int		`json:"dateCreated"`
		Comments 	int		`json:"comments"`
	}

	// Writing an array of maps
	// https://stackoverflow.com/questions/23066758/how-can-i-write-an-array-of-maps-golang
	//rbArray := make(map[int][]Runbook)
	var a []Runbook

	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			fmt.Println("Error:",err)
		}

		var runbookData Runbook

		if err := doc.DataTo(&runbookData); err != nil {
			fmt.Println("Error Occured", err)
		}

		var runbooks = []Runbook{
			{
				Id:doc.Ref.ID,
				Index: counter,
				Title:runbookData.Title,
				Description:runbookData.Description,
				Image:runbookData.Image,
				Views:runbookData.Views,
				Answers:runbookData.Answers,
				Upvotes:runbookData.Upvotes,
				Downvotes:runbookData.Downvotes,
				Datecreated: runbookData.Datecreated,
				Comments:runbookData.Comments,
			},
		}
		// Concatenating Slices using '...'
		// https://stackoverflow.com/questions/16248241/concatenate-two-slices-in-go
		//rbArray[counter] = append(rbAraray[counter], runbooks...)
		a = append(a, runbooks...)
		counter++

		//fmt.Println("DATA:",a)
	}

	// Prettify JSON data when in Console
	b, err := json.MarshalIndent(a,"","  ")
	if err != nil {
		fmt.Println("error:",err)
	}

	allRunbooks := func() string{
		return string(b)
	}
	fmt.Println("Data: " +string(b))
	return allRunbooks()
}

// Error Handling for Internal Server Error
func internalServerError(ctx iris.Context) {
	ctx.WriteString("Oops something went wrong with the server, Come back later...")
}
func notFound(ctx iris.Context) {
	// when 404 then render the template $views_dir/errors/404.html
	ctx.WriteString("Error 404 - The page you're looking for doesn't exist...")
}
