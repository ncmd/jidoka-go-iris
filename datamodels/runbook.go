package datamodels


type Runbook struct {
	Id 			string	`json:"id"`
	Index 		int		`json:"index"`
	Title		string	`json:"title"`
	Description	string	`json:"description"`
	Image		string	`json:"image"`
	Type		string	`json:"type"`
	Views		int		`json:"views"`
	Answers		int		`json:"answers"`
	Upvotes		int		`json:"upvotes"`
	Downvotes	int		`json:"downvotes"`
	Datecreated	int		`json:"dateCreated"`
	Comments 	int		`json:"comments"`
}