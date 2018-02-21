package datamodels

// Data Model Layer
type Runbook struct {
	ID     		int64  	`json:"id"`
	Creator 	string 	`json:"creator"`
	Title   	string	`json:"name"`
}