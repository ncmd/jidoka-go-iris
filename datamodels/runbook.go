package datamodels

import (
	"time"
)

type Runbook struct {
	ID				int64     `json:"id" form:"id"`
	Title			string    `json:"title" form:"title"`
	Creator			string    `json:"creator" form:"creator"`
	Description		string    `json:"description" form:"description"`
	CreatedAt		time.Time `json:"created_at" form:"created_at"`
}

// IsValid can do some very very simple "low-level" data validations.
func (r Runbook) IsValid() bool {
	return r.ID > 0
}