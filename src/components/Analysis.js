import React from "react";
import {MDBBox, MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBInput} from "mdbreact";
import CustomTransferList from "./CustomTransferList";
import ListTransfer from "./ListTransfer";
import { MDBDropdown, MDBDropdownToggle, MDBBtnGroup, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import { MDBContainer, MDBRow } from "mdbreact";




const ShowAnalysis = (props) => {

    const [reports, setReports] = React.useState([]);
    const [orgUnits, setOrgUnits] = React.useState([])

    console.log(props.organization);

    React.useEffect(()=>{
        console.log(props.organization);
        setReports(props.reportProps);
        setOrgUnits(props.organization)
    }, [props.organization, props.reportProps])

    console.log(reports.length);


    const handleButton = () => {
        props.buttonCallback();
    }


    return (

        <div>
            <MDBBtn color="cyan"
                    onClick={handleButton}
                    className="text-white float-lg-right mr-2" type="submit">
                Back
            </MDBBtn>

            <hr className='hr-light' />

            <MDBBox display="flex" justifyContent="center" >
                <MDBCol className="mb-5" md="13">
                    <MDBCard display="flex" justifyContent="center" className="text-xl-center">
                        <MDBCardBody>
                            <MDBCardTitle >
                                <strong>Analysis</strong>
                            </MDBCardTitle>

                            <MDBCardText>
                                <strong>Select Report, Organisation unit and Period</strong>
                            </MDBCardText>
                            <hr/>

                            <MDBContainer className="pl-5 mt-3">
                                <MDBRow>
                                    <MDBCol md="4">
                                        <div className="text-left my-3">
                                            <label className="grey-text ml-2">
                                                <strong>Select Custom Report</strong>
                                            </label>
                                            <MDBDropdown className=" myDropDown">
                                                <MDBDropdownToggle caret color="primary">
                                                    <input className="form-control myDropDown" style={{ width: "18rem" }}
                                                           type="text" placeholder="Search" aria-label="Search" />
                                                </MDBDropdownToggle>
                                                <MDBDropdownMenu className="dropdown-menu myDrop"  basic >

                                                    {reports.slice(0, (reports.length/2)).map((report, index) => (

                                                        <MDBDropdownItem key={index}>{report.title}</MDBDropdownItem>
                                                    ))}
                                                </MDBDropdownMenu>
                                            </MDBDropdown>
                                        </div>
                                    </MDBCol>
                                    <MDBCol md="4">
                                        <div className="text-left my-3">
                                            <label className="grey-text ml-2">
                                                <strong>Select Organizational Unit</strong>
                                            </label>
                                            <MDBDropdown className=" myDropDown">
                                                <MDBDropdownToggle caret color="primary">
                                                    <input className="form-control myDropDown" style={{ width: "18rem" }}
                                                           type="text" placeholder="Search" aria-label="Search" />
                                                </MDBDropdownToggle>
                                                <MDBDropdownMenu className="dropdown-menu myDrop"  basic >
                                                    {orgUnits.map((item, index) => (
                                                        <MDBDropdownItem key={index}>{item.name}</MDBDropdownItem>
                                                    ))}
                                                </MDBDropdownMenu>
                                            </MDBDropdown>
                                        </div>
                                    </MDBCol>
                                    <MDBCol md="4">
                                        <div className="text-left my-3">
                                            <label className="grey-text ml-2">
                                                <strong>Select Time period</strong>
                                            </label>
                                            <MDBDropdown className=" myDropDown ">
                                                <MDBDropdownToggle caret color="primary">
                                                    <input className="form-control myDropDown" style={{ width: "18rem" }}
                                                           type="text" placeholder="Search" aria-label="Search" />
                                                </MDBDropdownToggle>
                                                <MDBDropdownMenu className="dropdown-menu myDrop"  basic >
                                                    <MDBDropdownItem>Action</MDBDropdownItem>
                                                    <MDBDropdownItem>Another Action</MDBDropdownItem>
                                                    <MDBDropdownItem>Something else here</MDBDropdownItem>
                                                    <MDBDropdownItem divider />
                                                    <MDBDropdownItem>Separated link</MDBDropdownItem>
                                                </MDBDropdownMenu>
                                            </MDBDropdown>
                                        </div>
                                    </MDBCol>
                                </MDBRow>
                            </MDBContainer>

                            <div className="text-center py-4 mt-2">
                                <MDBBtn color="cyan" className="text-white">
                                    Analyze
                                </MDBBtn>
                            </div>

                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBBox>


        </div>
    )

}

export default React.memo(ShowAnalysis);