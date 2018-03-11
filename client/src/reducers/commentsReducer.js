import {
  FETCH_COMMENTS,
  COMMENT_RUNBOOK,
} from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_COMMENTS:
      return action.payload;
    case COMMENT_RUNBOOK:
      return [...state.concat(action.payload)];
    default:
      return state;
  }
}
