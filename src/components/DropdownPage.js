import React from "react";
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";



const DropdownPage = (props) => {
    const [buttonName, setButtonName] = React.useState("Choose Group Item")

    const itemSelected = (value) => {
        props.groupItemCaller(value);
        setButtonName(value);
    }

    return (
        <MDBDropdown>
            <MDBDropdownToggle caret color="primary">
                {buttonName}
            </MDBDropdownToggle>
            <MDBDropdownMenu right basic>
                {props.dropdownItems.map((option) => (
                    <MDBDropdownItem onClick={() => itemSelected(option)}>{option}</MDBDropdownItem>
                ))}
            </MDBDropdownMenu>
        </MDBDropdown>
    );

}

export default DropdownPage;