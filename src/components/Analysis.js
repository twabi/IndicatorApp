import React from "react";
import {MDBBox, MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBInput} from "mdbreact";
import CustomTransferList from "./CustomTransferList";
import ListTransfer from "./ListTransfer";
import { MDBDropdown, MDBDropdownToggle, MDBBtnGroup, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import { MDBContainer, MDBRow } from "mdbreact";




const ShowAnalysis = (props) => {

    var initState = props.organization;
    var initReport = props.reportProps;

    const [reports, setReports] = React.useState(initReport);
    const [orgUnits, setOrgUnits] = React.useState(initState);
    const [searchValue, setSearchValue] = React.useState("");
    const [reportValue, setReportValue] =React.useState("")

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


    function handleOrgSearch({ target: { value } }) {

        // Set captured value to input
        setSearchValue(value)

        // Variable to hold the original version of the list
        let currentList = [];
        // Variable to hold the filtered list before putting into state
        let newList = [];

        currentList = orgUnits;

        // If the search bar isn't empty
        if (value !== "") {
            // Assign the original list to currentList

            // Use .filter() to determine which items should be displayed
            // based on the search terms
            newList = currentList.filter(item => {
                // change current item to lowercase
                const lc = item.name.toLowerCase();
                // change search term to lowercase
                const filter = value.toLowerCase();
                // check to see if the current list item includes the search term
                // If it does, it will be added to newList. Using lowercase eliminates
                // issues with capitalization in search terms and search content
                return lc.includes(filter);
            });
        } else {
            // If the search bar is empty, set newList to original task list
            newList = initState;
        }


        // Set the filtered state based on what our rules added to newList
        setOrgUnits(newList);
    }


    function handleReportSearch({ target: { value } }) {

        // Set captured value to input
        setReportValue(value)

        // Variable to hold the original version of the list
        let currentList = [];
        // Variable to hold the filtered list before putting into state
        let newList = [];

        currentList = reports;

        // If the search bar isn't empty
        if (value !== "") {
            // Assign the original list to currentList

            // Use .filter() to determine which items should be displayed
            // based on the search terms
            newList = currentList.filter(item => {
                // change current item to lowercase
                const lc = item.title.toLowerCase();
                // change search term to lowercase
                const filter = value.toLowerCase();
                // check to see if the current list item includes the search term
                // If it does, it will be added to newList. Using lowercase eliminates
                // issues with capitalization in search terms and search content
                return lc.includes(filter);
            });
        } else {
            // If the search bar is empty, set newList to original task list
            newList = initReport;
        }


        // Set the filtered state based on what our rules added to newList
        setReports(newList);
    }

    const handleReportsClick = (value) => {
        setReportValue(value);
    }

    const handleOrgUnitClick = (value) => {
        setSearchValue(value);
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
                    <MDBCard display="flex" justifyContent="center" className="text-xl-center w-100">
                        <MDBCardBody>
                            <MDBCardTitle >
                                <strong>Analysis</strong>
                            </MDBCardTitle>

                            <MDBCardText>
                                <strong>Select Report, Organisation Unit and Period</strong>
                            </MDBCardText>
                            <hr/>

                            <MDBContainer className="pl-5 mt-3">
                                <MDBRow>
                                    <MDBCol md="6">
                                        <div className="text-left my-3">
                                            <label className="grey-text ml-2">
                                                <strong>Select Custom Report</strong>
                                            </label>
                                            <MDBDropdown className=" myDropDown">
                                                <MDBDropdownToggle caret color="primary">
                                                    <input className="form-control myDropDown" style={{ width: "18rem" }}
                                                           type="text"
                                                           value={reportValue}
                                                           onChange={e => handleReportSearch(e)}
                                                           placeholder="search available reports"
                                                           aria-label="Search" />
                                                </MDBDropdownToggle>
                                                <MDBDropdownMenu className="dropdown-menu myDrop"  basic >

                                                    {reports.slice(0, (reports.length/2)).map((report, index) => (

                                                        <MDBDropdownItem onClick={()=>{handleReportsClick(report.title)}} key={index}>
                                                            {report.title}
                                                        </MDBDropdownItem>
                                                    ))}
                                                </MDBDropdownMenu>
                                            </MDBDropdown>
                                        </div>
                                    </MDBCol>
                                    <MDBCol md="6">
                                        <div className="text-left my-3">
                                            <label className="grey-text ml-2">
                                                <strong>Select Organizational Unit</strong>
                                            </label>
                                            <MDBDropdown className=" myDropDown">
                                                <MDBDropdownToggle caret color="primary">
                                                    <input className="form-control myDropDown" style={{ width: "18rem" }}
                                                           type="text"
                                                           value={searchValue}
                                                           onChange={e => handleOrgSearch(e)}
                                                           placeholder="search organizational units"
                                                           aria-label="Search" />
                                                </MDBDropdownToggle>
                                                <MDBDropdownMenu className="dropdown-menu myDrop"  basic >
                                                    {orgUnits.map((item, index) => (
                                                        <MDBDropdownItem onClick={()=>{handleOrgUnitClick(item.name)}} key={index}>
                                                            {item.name}
                                                        </MDBDropdownItem>
                                                    ))}
                                                </MDBDropdownMenu>
                                            </MDBDropdown>
                                        </div>
                                    </MDBCol>

                                </MDBRow>


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
                                                    <MDBDropdownItem>Fixed Periods</MDBDropdownItem>
                                                    <MDBDropdownItem>Relative Periods</MDBDropdownItem>
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