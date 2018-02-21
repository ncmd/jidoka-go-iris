package datamodels

// Data Model Layer
type Runbook struct {
	ID     		int64  	`json:"id"`
	Type   		string	`json:"type"`
	Creator 	string 	`json:"creator"`
	DateCreated string 	`json:"answers"`
	Image 		string 	`json:"answers"`
	Title   	string	`json:"name"`
	Upvotes  	int 	`json:"upvotes"`
	Downvotes 	int 	`json:"downvotes"`
	Answers 	int 	`json:"answers"`
}