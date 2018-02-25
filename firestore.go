package main

import (
	"log"
	"context"
	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
	"fmt"
	"google.golang.org/api/iterator"
)

func firestore() {
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


	//_, _, err = client.Collection("users").Add(ctx, map[string]interface{}{
	//	"first": "Ada",
	//	"last":  "Lovelace",
	//	"born":  1815,
	//})
	//if err != nil {
	//	log.Fatalf("Failed adding alovelace: %v", err)
	//}

	fmt.Println("All Runbooks:")
	iter := client.Collection("runbooks").Documents(ctx)
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			fmt.Println("Error:",err)
		}
		type Runbook struct {
			Title		string	`firestore:"title"`
			Description	string	`firestore:"description"`
			Image		string	`firestore:"image"`
			Creator		string	`firestore:"creator"`
			Datecreated	string	`firestore:"dateCreated"`
		}

		var runbookData Runbook

		if err := doc.DataTo(&runbookData); err != nil {
			fmt.Println("Error Occured")
		}

		fmt.Println("Data:",doc.Ref.ID)
	}
}
