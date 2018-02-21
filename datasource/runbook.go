package datasource

// Data Source/Store Layer
import "github.com/ncmd/jidoka-go-iris/datamodels"

type Runbook struct {
	ID     		int64  	`json:"id"`
	Creator   	string	`json:"creator"`
	Title 		string 	`json:"title"`
}

var Runbooks = map[int64]datamodels.Runbook{
	1: {
		ID:			1,
		Creator:	"Charles Chong",
		Title:		"How to Program",
	},
	2: {
		ID:			2,
		Creator:	"runbook",
		Title:		"How to Write",
	},
}