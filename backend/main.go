package main

import (
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"os"
        "github.com/gin-contrib/cors"
)


func main() {
	port := os.Getenv("PORT")
	r := gin.Default()
        r.Use(cors.Default())
        
	// the jwt middleware
	authMiddleware := createAuthMiddleware()

	// When you use jwt.New(), the function is already automatically called for checking,
	// which means you don't need to call it again.
	errInit := authMiddleware.MiddlewareInit()
	if errInit != nil {
		log.Fatal("authMiddleware.MiddlewareInit() Error:" + errInit.Error())
	}

	// r.POST("/login", authMiddleware.LoginHandler)
	// r.POST("/register", RegisterUser)

	auth := r.Group("/auth")
	cms := r.Group("/cms")
        cms.GET("/landing_page", ServeLandingPage)
        cms.GET("/pages/:id", ServePage)
        cms.POST("/pages/:id", UpdatePage)
        cms.POST("/landing_page", UpdateLandingPage)
        cms.GET("/pages_index", GetPagesIndex)

	auth.Use(authMiddleware.MiddlewareFunc())
	// Refresh time can be longer than token timeout
	auth.GET("/refresh_token", authMiddleware.RefreshHandler)
	auth.GET("/ping", AuthPing)
	r.Use(authMiddleware.MiddlewareFunc())

	if port == "" {
		port = "8000"
	}

	if err := http.ListenAndServe(":"+port, r); err != nil {
		log.Fatal(err)
	}
}
