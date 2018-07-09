import React from "react"
import PropTypes from "prop-types"
<<<<<<< HEAD
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
=======
import Table from "react-bootstrap"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import { activateNav } from "../../actions/app"
import { makeLookUpObjects } from "../../selectors"

// import SsmParametersListRow from "./SsmParametersListRow"

function makeMapStateToProps() {
    const lookUpObjects = makeLookUpObjects()
    return (state, ownProps) => {
        const { envName } = ownProps
        const env = state.envs.getIn(["envs", envName])
        return {
            envName,
        }
    }
}

export class SsmParametersList extends React.Component { // List with environment name
    render(){
    console.log("envName", env)
    console.log("env", envName)        
        const header = (
            <div className="view-header">
                <ol className="breadcrumb">
                    <li>
                        <Link to={`/${envName}`}>{envName}</Link>
                    </li>
                    <li className="active">
                        SsmParameters
                    </li>
                </ol>
            </div>
        )
        const columns = [
            { title: "Name", key: "name" },
            { title: "Key Count", key: "key-count" },
            { title: "Created", key: "created" },
          ]
        return(
            <div>
                {header}
                {/* <Table columns={columns}/> */}
            </div>
>>>>>>> internal/CLD-6163
        )
    }
}

<<<<<<< HEAD
export default SsmParametersList

SsmParametersList.propTypes = {
    envName: PropTypes.string,
    env: PropTypes.object,
}

connect(mapStateToProps, dispatchProps)(SsmParametersList)
=======
SsmParametersList.propTypes = {
    envName: PropTypes.string,
}

export default connect(makeMapStateToProps)(SsmParametersList)
>>>>>>> internal/CLD-6163
