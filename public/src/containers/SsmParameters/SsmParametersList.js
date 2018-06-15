import React from "react"
import PropTypes from "prop-types"
import { Table } from "react-bootstrap"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import SsmParametersListRow from "./SsmParametersListRow"

function mapStateToProps() {
   return (state, ownProps) => {
       const { envName } = ownProps
       const env = state.envs.getIn(["envs", envName])
       return {
           env,
       }
   } 
}

export class SsmParametersList extends React.Component { // List with environment names
    render(){
        const { env, envName } = this.props
        return(
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Key Count</td>
                        <td>Created At</td>
                    </tr>
                </thead>
                <tbody>
                    <SsmParametersListRow />
                </tbody>
            </table>
        )
    }
}

export default SsmParametersList

SsmParametersList.propTypes = {
    envName: PropTypes.string,
    env: PropTypes.object,
}

connect(mapStateToProps, dispatchProps)(SsmParametersList)