import { CHANGE_SSM_PARAMETER, SET_SSM_PARAMTER_FIELD } from "../constants"
import SsmParameter from "../models/SsmParameter"
import { getInitialState, changeObject, setDataField } from "./utils"

const initialState = getInitialState()

export default function( state=initialState, action) {
  switch (action.type) {
    case CHANGE_SSM_PARAMETER:
      return changeObject(state, action, SsmParameter)
    case SET_SSM_PARAMTER_FIELD:
      return setDataField(state, action)
    default:
      return state
  }
}
