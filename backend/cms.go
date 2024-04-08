package main

import (
	"fmt"
	"io"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
)

func ServePage(c *gin.Context) {
	s := fmt.Sprintf("../data/pages/%s.json", c.Param("id"))
	json, err := os.ReadFile(s)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.Data(200, "application/json", json)
}

func UpdatePage(c *gin.Context) {
	data, err := io.ReadAll(c.Request.Body)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	s := fmt.Sprintf("../data/pages/%s.json", c.Param("id"))
	if err = os.WriteFile(s, data, 0644); err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.Data(200, "application/json", data)
}

type PageIndexEntry struct {
	Name string `form:"username" json:"name" binding:"required"`
}
func GetPagesIndex(c *gin.Context) {


	dirPath := "../data/pages" // Replace this with the path to your directory

	files, err := os.ReadDir(dirPath)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	var entries []PageIndexEntry
	for _, file := range files {
                entries = append(entries, PageIndexEntry{Name: strings.Replace(file.Name(),".json","",1)} )
	}
	c.JSON(200, gin.H{"pages": entries})
}

func ServeLandingPage(c *gin.Context) {
	json, err := os.ReadFile("../data/landing_page.json")
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	fmt.Printf("%s", string(json))
	c.Data(200, "application/json", json)
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
	c.Data(200, "application/json", data)
}
