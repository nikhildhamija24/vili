import { CHANGE_SSM_PARAMETER, SET_SSM_PARAMTER_FIELD } from "../constants"

import { subObjects, setDataField } from './utils';

export function subSsmParameters(env){
    return subObjects(CHANGE_SSM_PARAMETER, "ssmparamters", env)
}