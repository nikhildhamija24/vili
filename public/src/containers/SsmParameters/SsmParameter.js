import React from 'react';
import SsmParameterRow from './SsmParameterRow';

export class SsmParameter extends React.Component { // each actual parameter here
    render() {
        return (
            <SsmParameterRow Name={"Name"} Value={"Value"} ModifiedDate={"Modified_Date"} />
        )
    }
}

export default SsmParameter