package main

import (
	"github.com/kataras/iris"
	"github.com/kataras/iris/mvc"
	"github.com/valyala/tcplisten"
	"os"
)

func main() {

	// Heroku provides the port to bind to
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000" // Setting a Default port to 8000 to be used locally
	}

	app := iris.New()

	listenerCfg := tcplisten.Config{
		ReusePort:   true,
		DeferAccept: true,
		FastOpen:    true,
	}

	l, err := listenerCfg.NewListener("tcp4", ":"+port)
	if err != nil {
		app.Logger().Fatal(err)
	}



	pugEngine := iris.Pug("./templates", ".jade")
	pugEngine.Reload(true) // <--- set to true to re-build the templates on each request.
	app.RegisterView(pugEngine)

	// Creating MVC Controller with path "/api"
	mvc.New(app).Handle(new(APIController))

	// Register the templates/**.html as django and reload them on each request
	// so changes can be reflected, set to false on production.
	app.RegisterView(iris.Django("./templates", ".html").Reload(true))


	// GET: http://localhost:8000/profile/myname/article/42
	app.Get("/profile/{name:string}/article/{id:int}", iris.Gzip, article)

	// Now listening on: http://localhost:3000
	// Application started. Press CTRL+C to shut down.
	app.Run(iris.Listener(l))
	//log.Fatal(app.Run(addr))
	//app.Run(addr)
}

// Creating MVC Controller Type
type APIController struct {}

// GET: /
func (c *APIController) Get() string {
	return "Welcome! To use api use /api"
}

// GET: /api
func (c *APIController) GetApi() string {
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


func article(ctx iris.Context) {
	// retrieve the dynamic path parameters.
	var (
		name         = ctx.Params().Get("name")
		articleID, _ = ctx.Params().GetInt("id")
	)

	// set the template's binded values.
	ctx.ViewData("Name", name)
	ctx.ViewData("ArticleID", articleID)

	// finally, render the template.
	ctx.View("article.html")
}

