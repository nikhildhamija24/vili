import React from 'react'
import PropTypes from 'prop-types'
import SsmParametersList from '../../containers/ssmparameters/SsmParametersList'

export class SsmParametersListHandler extends React.Component {
    render () {
        const { env: envName } = this.props.match.params
        return <SsmParametersList envName={envName} />
    }
}

SsmParametersListHandler.propTypes = {
    match: PropTypes.object.isRequired,
}

export default SsmParametersListHandler
