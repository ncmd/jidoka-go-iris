import {
  SELECT_RUNBOOK,
  SUBMIT_RUNBOOK,
  EXPAND_RUNBOOK_OBJECTIVES,
  EDIT_RUNBOOK,
    LOAD_RUNBOOK_FROM_DIRECT_URI,
} from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case SELECT_RUNBOOK:
      console.log('SELECTED PAYLOAD:', action.payload);
      return [action.payload, action.index];
      case LOAD_RUNBOOK_FROM_DIRECT_URI:
          console.log('LOADED PAYLOAD:', action.payload);
          return [action.payload];
    case SUBMIT_RUNBOOK:
      console.log('SUBMIT PAYLOAD:', action.payload);
      return [action.payload, action.index];
    case EDIT_RUNBOOK:
      console.log('EDIT PAYLOAD:', action.payload);
      return [action.payload, action.index];
    case EXPAND_RUNBOOK_OBJECTIVES:
      const indexr = action.runbookIndex;
      const indexo = action.objectiveIndex;
      console.log('STATE--: ', ...state);
      return {
        ...state,
        [indexr]: {
          ...state[indexr],
          objectives: [
            ...state[indexr].objectives.slice(0, indexo),
            {
              ...state[indexr].objectives[indexo],
              expanded: !state[indexr].objectives[indexo].expanded,
            },
            ...state[indexr].objectives.slice(indexo + 1),
          ],
        },
      };
    default:
      return state;
  }
}
