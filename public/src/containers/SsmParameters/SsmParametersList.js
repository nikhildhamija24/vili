import React from "react"
import PropTypes from "prop-types"
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
        )
    }
}

SsmParametersList.propTypes = {
    envName: PropTypes.string,
}

export default connect(makeMapStateToProps)(SsmParametersList)
