import React from "react"
import PropTypes from "prop-types"

import SsmParameter from "../../containers/ssmparameters/SsmParameter"

export class SsmParameterHandler extends React.Component {
  render(){
    const { env: envName } = this.props.match.params
    return <SsmParameter envName={envName}/>
  }
}

SsmParameterHandler.propTypes = {
  match: PropTypes.object.isRequired,
}

export default SsmParameterHandler