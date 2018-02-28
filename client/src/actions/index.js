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


export const fetchRunbooks = () => dispatch => {

    return Promise.resolve().then(function() {
        return axios.get('/api/runbooks')
    }).then(function(e) {
        dispatch({ type: FETCH_RUNBOOKS, payload: e.data });
    })


    // const res = axios.get('/api/runbooks');
    // dispatch({ type: FETCH_RUNBOOKS, payload: res.data });
    // console.log("RES DATA:",res.data)
};