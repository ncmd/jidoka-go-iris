import axios from 'axios';
import {
    FETCH_USER,
    FETCH_SURVEYS,
    FETCH_RUNBOOKS,
    FETCH_SEARCH_RUNBOOK,
    FETCH_COMMENTS,
    UPVOTE_RUNBOOK,
    DOWNVOTE_RUNBOOK,
    SORT_RUNBOOKS_SUMVOTES,
    SELECT_RUNBOOK,
    SUBMIT_RUNBOOK,
    EDIT_RUNBOOK,
    UPDATE_RUNBOOK,
    COMMENT_RUNBOOK,
    COMMENT_ADD,
    COMMENT_DEL,
    EXPAND_RUNBOOK_OBJECTIVES,
    LOAD_RUNBOOK_FROM_DIRECT_URI,
} from './types';

// Action Creator, call Express API, uses Dispatch Redux to send to store
export const fetchUser = () => dispatch => {
    const res = axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => dispatch => {
    const res = axios.post('/api/stripe', token);
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => dispatch => {
    const res = axios.post('/api/surveys', values);
    history.push('/surveys');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => dispatch => {
    const res = axios.get('/api/surveys');
    dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

export const fetchRunbooks = () => dispatch => {
    const res = axios.get('/api/runbooks');
    dispatch({ type: FETCH_RUNBOOKS, payload: res.data });
    console.log("RES DATA:",res.data)
};

export const fetchSearchRunbook = runbookId => dispatch => {
    const res = axios.get(`/api/runbooks/${runbookId}/search`);
    dispatch({ type: FETCH_SEARCH_RUNBOOK, payload: res.data });
};

export const fetchRunbookComments = runbookId => dispatch => {
    const res = axios.get(`/api/runbooks/${runbookId}/comments`);
    dispatch({ type: FETCH_COMMENTS, payload: res.data });
};

export const submitRunbook = (values, history) => dispatch => {
    const res = axios.post('/api/runbooks', values);
    history.push('/');
    dispatch({ type: SUBMIT_RUNBOOK, payload: res.data });
};



export const upvoteRunbook = (
    runbookId,
    voteChoice,
    index,
) => dispatch => {
    axios.post(`/api/runbooks/${runbookId}/${voteChoice}`);
    dispatch({ type: UPVOTE_RUNBOOK, index: index });
};

export const expandRunbookObjective = (
    runbookIndex,
    objectiveIndex,
) => dispatch => {
    console.log('Clicked Expand');
    dispatch({
        type: EXPAND_RUNBOOK_OBJECTIVES,
        runbookIndex: runbookIndex,
        objectiveIndex: objectiveIndex,
    });
};

export const addComment = (
    runbookId,
    commentAction,
    index,
) => dispatch => {
    console.log('RUNBOOK ID:', runbookId);
    axios.post(`/api/runbooks/${runbookId}/${commentAction}`);
    dispatch({ type: COMMENT_ADD, index: index });
};

export const delComment = (
    runbookId,
    commentAction,
    index,
) => dispatch => {
    axios.post(`/api/runbooks/${runbookId}/${commentAction}`);
    dispatch({ type: COMMENT_DEL, index: index });
};

export const downvoteRunbook = (
    runbookId,
    voteChoice,
    index,
) => dispatch => {
    axios.post(`/api/runbooks/${runbookId}/${voteChoice}`);
    dispatch({ type: DOWNVOTE_RUNBOOK, index: index });
};

export const sortRunbooksSumvotes = voteChoice => dispatch => {
    const res = axios.get(`/api/runbooks/filter/${voteChoice}`);
    console.log(voteChoice);
    dispatch({ type: SORT_RUNBOOKS_SUMVOTES, payload: res.data });
};

export const selectRunbook = (index, runbookId) => dispatch => {
    const res = axios.get(`/api/runbooks/${runbookId}/details`);
    dispatch({ type: SELECT_RUNBOOK, payload: res.data, index: index });
};

export const loadRunbook = (uri) => dispatch => {
    console.log("URI:",uri);
    const res = axios.get(`${uri}`);
    dispatch({ type: LOAD_RUNBOOK_FROM_DIRECT_URI, payload: res.data})
};

export const editRunbook = (index, runbookId) => dispatch => {
    const res = axios.get(`/api/runbooks/${runbookId}/edit`);
    dispatch({ type: EDIT_RUNBOOK, payload: res.data, index: index });
};

export const updateRunbook = (runbookId, index, values, history) => dispatch => {
    const res = axios.post(`/api/runbooks/${runbookId}/update`,values);
    console.log("SENDING UPDATE");
    history.push(`/runbooks/${runbookId}/details`);
    dispatch({ type: UPDATE_RUNBOOK, payload: res.data, index: index });
};


// Create a Comment for the Runbook, POST to Back-End, and save to Redux State
export const commentRunbook = (
    runbookId,
    comment,
    runbookIndex,
) => dispatch => {
    const res = axios.post(`/api/runbooks/${runbookId}/comment`, {
        comment: comment,
    });
    dispatch({
        type: COMMENT_RUNBOOK,
        payload: res.data,
    });
    dispatch({ type: COMMENT_ADD, index: runbookIndex });
};
