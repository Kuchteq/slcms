package main

import (
	"fmt"
	"io"
	"os"

	"github.com/gin-gonic/gin"
)

func ServeLandingPage(c *gin.Context) {
        json, err := os.ReadFile("../data/landing_page.json")
        if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
        }
        fmt.Printf("%s",string(json))
        c.Data(200,"application/json",json)
}

func UpdateLandingPage(c *gin.Context) {
  //       var dto map[string]interface{}
  //       err:=c.BindJSON(&dto)
  //       if err !=nil {
  //               log.Printf(err.Error())
		// c.JSON(500, gin.H{"error": err.Error()})
		// return
  //       }
        data, err := io.ReadAll(c.Request.Body)
        if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
        }

        // json, _ := os.ReadFile("/home/maniu/Projects/Websites/Clients/Kociaki/Frontend/sccms/public/landing_page.json")
        
        os.WriteFile("../data/landing_page.json", data, 0644)
        c.Data(200,"application/json",data)
}
