import {
  FETCH_RUNBOOKS,
  FETCH_SEARCH_RUNBOOK,
  SORT_RUNBOOKS_SUMVOTES,
  UPVOTE_RUNBOOK,
  DOWNVOTE_RUNBOOK,
  COMMENT_ADD,
  COMMENT_DEL,
} from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_RUNBOOKS:
      return action.payload;
    case FETCH_SEARCH_RUNBOOK:
      return action.payload;
    case SORT_RUNBOOKS_SUMVOTES:
      return action.payload;
    case UPVOTE_RUNBOOK:
      const indexu = action.index;
      return [
        ...state.slice(0, indexu),
        { ...state[indexu], upvotes: state[indexu].upvotes + 1 },
        ...state.slice(indexu + 1),
      ];
    case DOWNVOTE_RUNBOOK:
      const indexd = action.index;
      return [
        ...state.slice(0, indexd),
        { ...state[indexd], downvotes: state[indexd].downvotes + 1 },
        ...state.slice(indexd + 1),
      ];
    // Add Comment to Runbook in Redux State
    case COMMENT_ADD:
      const indexadd = action.index;
      return [
        ...state.slice(0, indexadd),
        { ...state[indexadd], comments: state[indexadd].comments + 1 },
        ...state.slice(indexadd + 1),
      ];
    case COMMENT_DEL:
      const indexdel = action.index;
      return [
        ...state.slice(0, indexdel),
        { ...state[indexdel], comments: state[indexdel].comments - 1 },
        ...state.slice(indexdel + 1),
      ];
    default:
      return state;
  }
}
