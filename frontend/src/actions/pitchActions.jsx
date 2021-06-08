import axios from 'axios'
import { 
  PITCH_LIST_REQUEST,
  PITCH_LIST_SUCCESS,
  PITCH_LIST_FAIL,
} from '../constants/pitchConstants'

export const listPitches = () => async (dispatch) => {
  try {
    dispatch({ type: PITCH_LIST_REQUEST })
    
    const { data } = await axios.get('/api/pitches/')
    dispatch({
      type: PITCH_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
      dispatch({
        type: PITCH_LIST_FAIL,
        payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message
      })
  }
}