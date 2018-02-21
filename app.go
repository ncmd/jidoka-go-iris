package main

import (
	"github.com/kataras/iris"
	"github.com/kataras/iris/mvc"
	"github.com/valyala/tcplisten"
	"os"
	"log"
)

func newApp() *iris.Application {
	app := iris.New()
	app.RegisterView(iris.HTML("./client/build", ".html").Binary(Asset, AssetNames))

	app.Get("/", func(ctx iris.Context) {
		ctx.View("index.html")
	})

	assetHandler := app.StaticEmbeddedHandler("./client/build", Asset, AssetNames)
	// as an alternative of SPA you can take a look at the /routing/dynamic-path/root-wildcard
	// example too
	// or
	// app.StaticEmbedded if you don't want to redirect on index.html and simple serve your SPA app (recommended).

	// public/index.html is a dynamic view, it's handled by root,
	// and we don't want to be visible as a raw data, so we will
	// the return value of `app.SPA` to modify the `IndexNames` by;
	app.SPA(assetHandler).AddIndexName("index.html")

	return app
}

func main() {

	// Heroku provides the port to bind to
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000" // Setting a Default port to 8000 to be used locally
	}

	//app := iris.New()

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

	// Creating MVC Controller
	mvc.New(app).Handle(new(APIController))

	//// Register the templates/**.html as django and reload them on each request
	//// so changes can be reflected, set to false on production.
	//app.RegisterView(iris.Django("./templates", ".html").Reload(true))

	app.StaticEmbedded("/","./client/build", Asset, AssetNames)

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

// Error Handling for Internal Server Error
func internalServerError(ctx iris.Context) {
	ctx.WriteString("Oops something went wrong with the server, Come back later...")
}
func notFound(ctx iris.Context) {
	// when 404 then render the template $views_dir/errors/404.html
	ctx.WriteString("Error 404 - URI Path does not in API")
}
