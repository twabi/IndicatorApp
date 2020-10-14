import React from "react";
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";



const DropdownGroup = (props) => {

    const [buttonName, setButtonName] = React.useState("Filter by Groups")

    const itemSelected = (value) => {
        props.groupCaller(value);
        setButtonName(value)
    }

    try{
        return (
            <MDBDropdown>
                <MDBDropdownToggle id="drophead" caret color="primary">
                    {buttonName}
                </MDBDropdownToggle>
                <MDBDropdownMenu right basic>
                    {props.dropdownGroups.map((option) => (
                        <MDBDropdownItem onClick={() => itemSelected(option)}>{option}</MDBDropdownItem>
                    ))}
                </MDBDropdownMenu>
            </MDBDropdown>
        );

    }catch (ex) {console.log(ex)}


}

export default DropdownGroup;