package services

import (
	"github.com/ncmd/jidoka-go-iris/datamodels"
	"github.com/ncmd/jidoka-go-iris/repositories"
)

// MovieService handles some of the CRUID operations of the movie datamodel.
// It depends on a movie repository for its actions.
// It's here to decouple the data source from the higher level compoments.
// As a result a different repository type can be used with the same logic without any aditional changes.
// It's an interface and it's used as interface everywhere
// because we may need to change or try an experimental different domain logic at the future.
type RunbookService interface {
	GetAll() []datamodels.Runbook
	GetByID(id int64) (datamodels.Runbook, bool)
	DeleteByID(id int64) bool
	UpdateCreatorAndTitleByID(id int64, creator string, title string) (datamodels.Runbook, error)
}

// NewMovieService returns the default movie service.
func NewRunbookService(repo repositories.RunbookRepository) RunbookService {
	return &runbookService{
		repo: repo,
	}
}

type runbookService struct {
	repo repositories.RunbookRepository
}

// GetAll returns all movies.
func (s *runbookService) GetAll() []datamodels.Runbook {
	return s.repo.SelectMany(func(_ datamodels.Runbook) bool {
		return true
	}, -1)
}

// GetByID returns a movie based on its id.
func (s *runbookService) GetByID(id int64) (datamodels.Runbook, bool) {
	return s.repo.Select(func(m datamodels.Runbook) bool {
		return m.ID == id
	})
}

// UpdatePosterAndGenreByID updates a movie's poster and genre.
func (s *runbookService) UpdateCreatorAndTitleByID(id int64, creator string, title string) (datamodels.Runbook, error) {
	// update the movie and return it.
	return s.repo.InsertOrUpdate(datamodels.Runbook{
		ID:     id,
		Creator: creator,
		Title:  title,
	})
}

// DeleteByID deletes a movie by its id.
//
// Returns true if deleted otherwise false.
func (s *runbookService) DeleteByID(id int64) bool {
	return s.repo.Delete(func(m datamodels.Runbook) bool {
		return m.ID == id
	}, 1)
}