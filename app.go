package main

import (
	"github.com/kataras/iris"
	"github.com/kataras/iris/mvc"
	"github.com/valyala/tcplisten"
	"os"
	"log"
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

	// tcp4 for ipv4 TCP listener; or tcp6 or ipv6
	l, err := listenerCfg.NewListener("tcp4", ":"+port)
	if err != nil {
		app.Logger().Fatal(err)
	}

	// Watch for template changes and reload when edited
	pugEngine := iris.Pug("./templates", ".jade")
	pugEngine.Reload(true) // <--- set to true to re-build the templates on each request.
	app.RegisterView(pugEngine)

	// Creating MVC Controller
	mvc.New(app).Handle(new(APIController))

	// Register the templates/**.html as django and reload them on each request
	// so changes can be reflected, set to false on production.
	app.RegisterView(iris.Django("./templates", ".html").Reload(true))


	// GET: http://localhost:8000/profile/myname/article/42
	app.Get("/profile/{name:string}/article/{id:int}", iris.Gzip, article)

	// Shutdown Callback
	app.ConfigureHost(func(h *iris.Supervisor) {
		h.RegisterOnShutdown(func() {
			println("💀Server Terminated 💀")
		})
	})

	// Error Handling Client Error
	app.OnErrorCode(iris.StatusNotFound, notFound)
	// Error Handling Internal Error
	app.OnErrorCode(iris.StatusInternalServerError, internalServerError)

	log.Fatal(app.Run(iris.Listener(l)))
	app.Run(iris.Listener(l))

}

// Creating MVC Controller Type
type APIController struct {}

func emptyHandler(ctx iris.Context) {
	ctx.Writef("Hello from subdomain: %s , you're in path:  %s", ctx.Subdomain(), ctx.Path())
}

// GET: /
func (c *APIController) Get() string {
	return "Welcome! Interact with Jidoka API using /api"
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

// Error Handling for Internal Server Error
func internalServerError(ctx iris.Context) {
	ctx.WriteString("Oops something went wrong, try again")
}
func notFound(ctx iris.Context) {
	// when 404 then render the template $views_dir/errors/404.html
	ctx.WriteString("Error 404 - Content does not in API")
}
