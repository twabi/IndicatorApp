import React from "react";
import {
    MDBContainer,
    MDBTabPane,
    MDBTabContent,
    MDBNav,
    MDBNavItem,
    MDBNavLink,
    MDBCardBody,
    MDBCard,
    MDBCol, MDBBox, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBRow, MDBCardHeader
} from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'



const TabSync = (props) => {

    const [activeItem, setActiveItem] = React.useState("1");
    const [periodTypes, setPeriodTypes] = React.useState([])
    const [key, setKey] = React.useState('home');

    React.useEffect(()=>{
        setPeriodTypes(props.periodProps)
    }, [props.periodProps])

    const toggle = tab => e => {
        if (activeItem !== tab) {
            setActiveItem(tab)
        }
    };


    const FixedPeriod = () => (
        <MDBRow>
            <MDBCol md="6">
                <div className="text-left my-3">
                    <label className="grey-text ml-2">
                        <strong>Select Time Period Type</strong>
                    </label>
                    <MDBDropdown className=" myDropDown">
                        <MDBDropdownToggle caret color="primary">
                            select period type
                        </MDBDropdownToggle>
                        <MDBDropdownMenu className="dropdown-menu myDrop"  basic >
                            {periodTypes.map((item, index) => (
                                <MDBDropdownItem key={index}>
                                    {item.name}
                                </MDBDropdownItem>
                            ))}
                        </MDBDropdownMenu>
                    </MDBDropdown>
                </div>
            </MDBCol>
            <MDBCol md="6">
                <div className="text-left my-3">
                    <label className="grey-text ml-2">
                        <strong>Year</strong>
                    </label>
                    <MDBDropdown className=" myDropDown">
                        <MDBDropdownToggle caret color="primary">
                            select year
                        </MDBDropdownToggle>
                        <MDBDropdownMenu className="dropdown-menu myDrop"  basic >
                            <MDBDropdownItem >something</MDBDropdownItem>
                        </MDBDropdownMenu>
                    </MDBDropdown>
                </div>
            </MDBCol>

        </MDBRow>
    )

    const RelativePeriods = ()=> (

        <MDBRow>
            <MDBCol md="6">
                <div className="text-left my-3">
                    <label className="grey-text ml-2">
                        <strong>Select Time Period Type</strong>
                    </label>
                    <MDBDropdown className=" myDropDown">
                        <MDBDropdownToggle caret color="primary">
                            select period type
                        </MDBDropdownToggle>
                        <MDBDropdownMenu className="dropdown-menu myDrop"  basic >
                            {periodTypes.map((item, index) => (
                                <MDBDropdownItem key={index}>
                                    {item.name}
                                </MDBDropdownItem>
                            ))}
                        </MDBDropdownMenu>
                    </MDBDropdown>
                </div>
            </MDBCol>
            <MDBCol md="6">
                <div className="text-left my-3">
                    <label className="grey-text ml-2">
                        <strong>Select Period</strong>
                    </label>
                    <MDBDropdown className=" myDropDown">
                        <MDBDropdownToggle caret color="primary">
                            select actual period
                        </MDBDropdownToggle>
                        <MDBDropdownMenu className="dropdown-menu myDrop"  basic >
                            <MDBDropdownItem >something</MDBDropdownItem>
                        </MDBDropdownMenu>
                    </MDBDropdown>
                </div>
            </MDBCol>

        </MDBRow>
    )

    return (

        <Router>
            <MDBBox className="width-custom" display="flex" justifyContent="center" >
                <MDBCol className="mb-5 width-custom" md="13">
                    <MDBCard display="flex" justifyContent="center" className="text-xl-center w-100 width-custom">

                        <MDBCardBody>

                            <MDBContainer>

                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={key}
                                    onSelect={(k) => setKey(k)}>

                                    <Tab eventKey="home" title="Home">
                                        <p>one thing</p>
                                    </Tab>
                                    <Tab eventKey="profile" title="Profile">
                                        <p>second thing</p>
                                    </Tab>
                                </Tabs>

                            </MDBContainer>

                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBBox>

        </Router>



    )

}

export default React.memo(TabSync)