import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'react-bootstrap'

export class SsmParameterRow extends React.Component{ // each actual parameter is displayed here
    constructor(props){
        super(props)
    }
    render() {
        return(
            <table className="param-table">
                <tr>
                    <td data-column="name">{this.props.Name}</td>
                    <td data-column="value">{this.props.Value}</td>
                    <td data-column="modifiedDate">{this.props.Modified_Date}</td>
                </tr>
                <hr />
            </table>
        )
    }
}

<<<<<<< HEAD
SsmParametersRow.propTypes = {
=======
SsmParameterRow.propTypes = {
>>>>>>> internal/CLD-6163
    Name: PropTypes.string,
    Value: PropTypes.string,
    Modified_Date: PropTypes.string
}

<<<<<<< HEAD
export default SsmParametersRow
=======
export default SsmParameterRow
>>>>>>> internal/CLD-6163
