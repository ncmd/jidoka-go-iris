package repositories

// The layer which has direct access to the "datasource" and can manipulate data directly.

import (
	"errors"
	"sync"
	"github.com/ncmd/jidoka-go-iris/datamodels"
)

// Query represents the visitor and action queries.
type Query func(datamodels.Runbook) bool



// RunbookRepository handles the basic operations of a runbook entity/model.
// It's an interface in order to be testable, i.e a memory runbook repository or
// a connected to an sql database.
type RunbookRepository interface {
	Exec(query Query, action Query, limit int, mode int) (ok bool)

	Select(query Query) (runbook datamodels.Runbook, found bool)
	SelectMany(query Query, limit int) (results []datamodels.Runbook)

	InsertOrUpdate(runbook datamodels.Runbook) (updatedRunbook datamodels.Runbook, err error)
	Delete(query Query, limit int) (deleted bool)
}

// NewMovieRepository returns a new movie memory-based repository,
// the one and only repository type in our example.
func NewRunbookRepository(source map[int64]datamodels.Runbook) RunbookRepository {
	return &runbookMemoryRepository{source: source}
}

// runbookMemoryRepository is a "RunbookRepository"
// which manages the runbook using the memory data source (map).
type runbookMemoryRepository struct {
	source map[int64]datamodels.Runbook
	mu     sync.RWMutex
}

const (
	// ReadOnlyMode will RLock(read) the data .
	ReadOnlyMode = iota
	// ReadWriteMode will Lock(read/write) the data.
	ReadWriteMode
)

func (r *runbookMemoryRepository) Exec(query Query, action Query, actionLimit int, mode int) (ok bool) {
	loops := 0

	if mode == ReadOnlyMode {
		r.mu.RLock()
		defer r.mu.RUnlock()
	} else {
		r.mu.Lock()
		defer r.mu.Unlock()
	}

	for _, runbook := range r.source {
		ok = query(runbook)
		if ok {
			if action(runbook) {
				if actionLimit >= loops {
					break // break
				}
			}
		}
	}

	return
}

// Select receives a query function
// which is fired for every single movie model inside
// our imaginary data source.
// When that function returns true then it stops the iteration.
//
// It returns the query's return last known "found" value
// and the last known movie model
// to help callers to reduce the LOC.
//
// It's actually a simple but very clever prototype function
// I'm using everywhere since I firstly think of it,
// hope you'll find it very useful as well.
func (r *runbookMemoryRepository) Select(query Query) (runbook datamodels.Runbook, found bool) {
	found = r.Exec(query, func(m datamodels.Runbook) bool {
		runbook = m
		return true
	}, 1, ReadOnlyMode)

	// set an empty datamodels.Movie if not found at all.
	if !found {
		runbook = datamodels.Runbook{}
	}

	return
}

// SelectMany same as Select but returns one or more datamodels.Movie as a slice.
// If limit <=0 then it returns everything.
func (r *runbookMemoryRepository) SelectMany(query Query, limit int) (results []datamodels.Runbook) {
	r.Exec(query, func(m datamodels.Runbook) bool {
		results = append(results, m)
		return true
	}, limit, ReadOnlyMode)

	return
}


// InsertOrUpdate adds or updates a movie to the (memory) storage.
//
// Returns the new movie and an error if any.
func (r *runbookMemoryRepository) InsertOrUpdate(runbook datamodels.Runbook) (datamodels.Runbook, error) {
	id := runbook.ID

	if id == 0 { // Create new action
		var lastID int64
		// find the biggest ID in order to not have duplications
		// in productions apps you can use a third-party
		// library to generate a UUID as string.
		r.mu.RLock()
		for _, item := range r.source {
			if item.ID > lastID {
				lastID = item.ID
			}
		}
		r.mu.RUnlock()

		id = lastID + 1
		runbook.ID = id

		// map-specific thing
		r.mu.Lock()
		r.source[id] = runbook
		r.mu.Unlock()

		return runbook, nil
	}

	// Update action based on the movie.ID,
	// here we will allow updating the poster and genre if not empty.
	// Alternatively we could do pure replace instead:
	// r.source[id] = movie
	// and comment the code below;
	current, exists := r.Select(func(m datamodels.Runbook) bool {
		return m.ID == id
	})

	if !exists { // ID is not a real one, return an error.
		return datamodels.Runbook{}, errors.New("failed to update a nonexistent movie")
	}

	// or comment these and r.source[id] = m for pure replace
	if runbook.Creator != "" {
		current.Creator = runbook.Creator
	}

	if runbook.Title != "" {
		current.Title = runbook.Title
	}

	// map-specific thing
	r.mu.Lock()
	r.source[id] = current
	r.mu.Unlock()

	return runbook, nil
}

func (r *runbookMemoryRepository) Delete(query Query, limit int) bool {
	return r.Exec(query, func(m datamodels.Runbook) bool {
		delete(r.source, m.ID)
		return true
	}, limit, ReadWriteMode)
}