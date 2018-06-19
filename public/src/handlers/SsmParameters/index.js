import React from "react"
import PropTypes from "prop-types"
import { Route, Switch } from "react-router"

import SsmParametersList from "../../containers/SsmParameters/SsmParametersList"
import SsmParameter from "../../containers/SsmParameters/SsmParameter"

export class SsmParameters extends React.Component {
    render() {
        const prefix = this.props.match.path
        return(
            <Switch>
                <Route exact path={`${prefix}`} Component={SsmParametersList}/>
                {/* <Route exact path={`${prefix}/:ssmparameter`} Component={SsmParameter}/> */}
            </Switch>
        )
    }
}

SsmParameters.propTypes = {
    match: PropTypes.object.isRequired
}

export default SsmParameters
