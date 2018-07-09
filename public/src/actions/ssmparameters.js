import { CHANGE_SSM_PARAMETER, SET_SSM_PARAMTER_FIELD } from "../constants"

import { subObjects, setDataField } from './utils'

export function subSsmParameters(env){
    return subObjects(CHANGE_SSM_PARAMETER, "ssmparamters", env)
}

export function getSsmParameterSpec(env, name){
    return async function(dispatch, getState, api){
        const { results, error } = await api.ssmparameters.getSpec(env, name)
        if(error) {
            return { error }
        }
        dispatch(setDataField(SET_SSM_PARAMTER_FIELD, env, name, "spec", results))
        return { results }
    } 
}

export function createSsmParameter(env, name){
    return async function(dispatch, getState, api){
        await api.ssmparameters.create(env, name)
    }
}

export function deleteSsmParameter(env, name){
    return async function(dispatch, getState, api){
        await api.ssmparameters.delete(env, name)
    }
}