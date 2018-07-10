import React from "react"
import SsmParameterRow from "./SsmParameterRow"

function mapStateToProps(state, ownProps){
    const { envName } = ownProps
}

export class SsmParameter extends React.Component { // each actual parameter here
    constructor(props) {
        super(props)
        this.state = {
          showDeleteModal: false,
        }
    }

    render() {
        return (
            <SsmParameterRow Name={"Name"} Value={"Value"} ModifiedDate={"Modified_Date"} />
        )
    }
}

export default SsmParameter