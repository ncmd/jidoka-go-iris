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
export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
    const res = await axios.post('/api/stripe', token);
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
    const res = await axios.post('/api/surveys', values);
    history.push('/surveys');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
    const res = await axios.get('/api/surveys');
    dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

export const fetchRunbooks = () => async dispatch => {
    const res = await axios.get('/api/runbooks');
    dispatch({ type: FETCH_RUNBOOKS, payload: res.data });
    console.log("RES DATA:",res.data)
};

export const fetchSearchRunbook = runbookId => async dispatch => {
    const res = await axios.get(`/api/runbooks/${runbookId}/search`);
    dispatch({ type: FETCH_SEARCH_RUNBOOK, payload: res.data });
};

export const fetchRunbookComments = runbookId => async dispatch => {
    const res = await axios.get(`/api/runbooks/${runbookId}/comments`);
    dispatch({ type: FETCH_COMMENTS, payload: res.data });
};

export const submitRunbook = (values, history) => async dispatch => {
    const res = await axios.post('/api/runbooks', values);
    history.push('/');
    dispatch({ type: SUBMIT_RUNBOOK, payload: res.data });
};



export const upvoteRunbook = (
    runbookId,
    voteChoice,
    index,
) => async dispatch => {
    axios.post(`/api/runbooks/${runbookId}/${voteChoice}`);
    dispatch({ type: UPVOTE_RUNBOOK, index: index });
};

export const expandRunbookObjective = (
    runbookIndex,
    objectiveIndex,
) => async dispatch => {
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
) => async dispatch => {
    console.log('RUNBOOK ID:', runbookId);
    axios.post(`/api/runbooks/${runbookId}/${commentAction}`);
    dispatch({ type: COMMENT_ADD, index: index });
};

export const delComment = (
    runbookId,
    commentAction,
    index,
) => async dispatch => {
    axios.post(`/api/runbooks/${runbookId}/${commentAction}`);
    dispatch({ type: COMMENT_DEL, index: index });
};

export const downvoteRunbook = (
    runbookId,
    voteChoice,
    index,
) => async dispatch => {
    axios.post(`/api/runbooks/${runbookId}/${voteChoice}`);
    dispatch({ type: DOWNVOTE_RUNBOOK, index: index });
};

export const sortRunbooksSumvotes = voteChoice => async dispatch => {
    const res = await axios.get(`/api/runbooks/filter/${voteChoice}`);
    console.log(voteChoice);
    dispatch({ type: SORT_RUNBOOKS_SUMVOTES, payload: res.data });
};

export const selectRunbook = (index, runbookId) => async dispatch => {
    const res = await axios.get(`/api/runbooks/${runbookId}/details`);
    dispatch({ type: SELECT_RUNBOOK, payload: res.data, index: index });
};

export const loadRunbook = (uri) => async dispatch => {
    console.log("URI:",uri);
    const res = await axios.get(`${uri}`);
    dispatch({ type: LOAD_RUNBOOK_FROM_DIRECT_URI, payload: res.data})
}

export const editRunbook = (index, runbookId) => async dispatch => {
    const res = await axios.get(`/api/runbooks/${runbookId}/edit`);
    dispatch({ type: EDIT_RUNBOOK, payload: res.data, index: index });
};

export const updateRunbook = (runbookId, index, values, history) => async dispatch => {
    const res = await axios.post(`/api/runbooks/${runbookId}/update`,values);
    console.log("SENDING UPDATE");
    history.push(`/runbooks/${runbookId}/details`);
    dispatch({ type: UPDATE_RUNBOOK, payload: res.data, index: index });
};


// Create a Comment for the Runbook, POST to Back-End, and save to Redux State
export const commentRunbook = (
    runbookId,
    comment,
    runbookIndex,
) => async dispatch => {
    const res = await axios.post(`/api/runbooks/${runbookId}/comment`, {
        comment: comment,
    });
    dispatch({
        type: COMMENT_RUNBOOK,
        payload: res.data,
    });
    dispatch({ type: COMMENT_ADD, index: runbookIndex });
};
