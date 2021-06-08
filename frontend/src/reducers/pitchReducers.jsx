import { 
  PITCH_LIST_REQUEST,
  PITCH_LIST_SUCCESS,
  PITCH_LIST_FAIL,
} from '../constants/pitchConstants'

export const pitchListReducer = (state = { pitches: [] }, action) => {
  switch (action.type) {
    case PITCH_LIST_REQUEST:
      return { loading: true, pitches: [] };

    case PITCH_LIST_SUCCESS:
      return { loading: false, pitches: action.payload }    

    case PITCH_LIST_FAIL:
      return { loading: false, error: action.payload}

    default:
      return state
  }
};
