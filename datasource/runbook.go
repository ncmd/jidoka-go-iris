package datasource

// Houses Imaginary Data
import "github.com/ncmd/jidoka-go-iris/datamodels"


type Runbook struct {
	ID     		int64  	`json:"id"`
	Type   		string	`json:"type"`
	Creator 	string 	`json:"creator"`
}

var Runbooks = map[int64]datamodels.Runbook{
	1: {
		ID:			1,
		Type:		"runbook",
		Creator:	"Charles Chong"
	},
	2: {
		ID:			2,
		Type:		"runbook",
		Creator:	"Charles Chong"
	},
}