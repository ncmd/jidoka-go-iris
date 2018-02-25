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

// GET: /api
func (c *APIController) GetApi() string {
	firestore()
	return "Welcome to Jidoka API"
}

// GET: /api/{string}
func (c *APIController) GetApiBy(name string) string {
	return "Hello " + name
}

// GET: /api/hello
func (c *APIController) GetApiHello() interface{} {
	return map[string]string{"message": "Hello Iris!"}
}

// Error Handling for Internal Server Error
func internalServerError(ctx iris.Context) {
	ctx.WriteString("Oops something went wrong with the server, Come back later...")
}
func notFound(ctx iris.Context) {
	// when 404 then render the template $views_dir/errors/404.html
	ctx.WriteString("Error 404 - The page you're looking for doesn't exist...")
}
