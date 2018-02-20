package main

import (
	"github.com/kataras/iris"
	"github.com/kataras/iris/mvc"
	"os"
	"log"
)

func main() {

	// Heroku provides the port to bind to
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000" // Setting a Default port to 8000 to be used locally
	}

	// Serve using a host:port form.
	var addr = iris.Addr("0.0.0.0:"+port)

	app := iris.New()


	pugEngine := iris.Pug("./templates", ".jade")
	pugEngine.Reload(true) // <--- set to true to re-build the templates on each request.
	app.RegisterView(pugEngine)

	// Creating MVC Controller with path "/api"
	mvc.New(app).Handle(new(APIController))

	// Register the templates/**.html as django and reload them on each request
	// so changes can be reflected, set to false on production.
	app.RegisterView(iris.Django("./templates", ".html").Reload(true))

	//// GET: http://localhost:8000
	//app.Get("/", index)

	// GET: http://localhost:8000/profile/myname/article/42
	app.Get("/profile/{name:string}/article/{id:int}", iris.Gzip, article)

	// Now listening on: http://localhost:3000
	// Application started. Press CTRL+C to shut down.
	log.Fatal(app.Run(addr))
	app.Run(addr)
}

// Creating MVC Controller Type
type APIController struct {}

// GET: /api
func (c *APIController) Get() string {
	return "Welcome to Jidoka API"
}

// GET: /api/{name:string}
func (c *APIController) GetBy(name string) string {
	return "Hello " + name
}


func (c *APIController) GetHello() interface{} {
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

func index(ctx iris.Context) {
	ctx.JSON(iris.Map{"message": "Hello World worldie"})
}
