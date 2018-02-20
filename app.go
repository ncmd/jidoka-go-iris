package main

import (
	"github.com/kataras/iris"
	"os"
	"log"
)



func main() {

	port := os.Getenv("PORT") // Heroku provides the port to bind to
	if port == "" {
		port = "8000"
	}

	// Serve using a host:port form.
	var addr = iris.Addr("0.0.0.0:"+port)

	app := iris.New()

	// Register the templates/**.html as django and reload them on each request
	// so changes can be reflected, set to false on production.
	app.RegisterView(iris.Django("./templates", ".html").Reload(true))

	// GET: http://localhost:8000
	app.Get("/", index)

	// GET: http://localhost:8000/profile/myname/article/42
	app.Get("/profile/{name:string}/article/{id:int}", iris.Gzip, article)

	// Now listening on: http://localhost:3000
	// Application started. Press CTRL+C to shut down.
	log.Fatal(app.Run(addr))
	app.Run(addr)
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
	ctx.JSON(iris.Map{"message": "Hello World"})
}
