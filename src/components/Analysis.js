import React from "react";
import {MDBBox, MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBInput} from "mdbreact";
import CustomTransferList from "./CustomTransferList";
import ListTransfer from "./ListTransfer";
import { MDBDropdown, MDBDropdownToggle, MDBBtnGroup, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import { MDBContainer, MDBRow } from "mdbreact";
import PeriodTabs from "./PeriodTabs";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";




const ShowAnalysis = (props) => {

    var initState = props.organization;
    var initReport = props.reportProps;
    var financial = [
          "THIS_FINANCIAL_YEAR",
        "LAST_FINANCIAL_YEAR", "LAST_5_FINANCIAL_YEARS"]

    var max = new Date().getFullYear();
    var min = max - 100;

    var allYears = [];

    for(var i=min; i<=max; i++){
        allYears.push(i.toString());
    }
    console.log(allYears);

    console.log(max);

    var weeks = [ "THIS_WEEK", "LAST_WEEK", "LAST_4_WEEKS", "LAST_12_WEEKS", "LAST_52_WEEKS"]
    var quarters = ["THIS_QUARTER", "LAST_QUARTER", "QUARTERS_THIS_YEAR", "QUARTERS_LAST_YEAR", "LAST_4_QUARTERS",]
    var bimonth = ["THIS_BIMONTH", "LAST_BIMONTH", "LAST_6_BIMONTHS"]
    var month = ["THIS_MONTH", "LAST_MONTH", "LAST_3_MONTHS", "MONTHS_THIS_YEAR",  "MONTHS_LAST_YEAR", "LAST_12_MONTHS"]
    var array2 = ["Weeks", "Months", "Years", "Quarters", "Financial Years", "Bi-Months", "Six-Months"]
    var sixmonth = ["THIS_SIX_MONTH", "LAST_SIX_MONTH", "LAST_2_SIXMONTHS"]
    var year = ["THIS_YEAR", "LAST_YEAR", "LAST_5_YEARS"]

    const [reports, setReports] = React.useState(initReport);
    const [orgUnits, setOrgUnits] = React.useState(initState);
    const [searchValue, setSearchValue] = React.useState("");
    const [reportValue, setReportValue] =React.useState("")
    const [periodTypes, setPeriodTypes] =React.useState([])
    const [key, setKey] = React.useState('home');
    const [relativeTime, setRelativePeriods] = React.useState([]);
    const [relCategories, setRelCategories] = React.useState(array2);
    const [relCategoriesTitle, setRelCategoriesTitle] = React.useState("Period Type");
    const [relTimeTitle, setRelTimeTitle] = React.useState("Actual Period");
    const [relYear, setRelYear] = React.useState("Year");
    const [fixYear, setFixYear] = React.useState("Year");
    const [fixPeriodType, setFixPeriodType] = React.useState("period Type");

    console.log(props.organization);

    React.useEffect(()=>{
        console.log(props.organization);
        setReports(props.reportProps);
        setOrgUnits(props.organization)
        setPeriodTypes(props.periodProps)
    }, [props.organization, props.periodProps, props.reportProps])

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


    const periodTypeClick =(value)=>{
        setRelCategoriesTitle(value)
        if(value === "Weeks"){
            setRelativePeriods(weeks)
        } else if (value === "Months"){
            setRelativePeriods(month)
        } else if (value === "Bi-Months"){
            setRelativePeriods(bimonth)
        } else if(value ===  "Six-Months"){
            setRelativePeriods(sixmonth)
        } else if (value === "Years") {
            setRelativePeriods(year)
        } else if (value === "Quarters") {
            setRelativePeriods(quarters)
        } else if (value === "Financial Years"){
            setRelativePeriods(financial)
        }
    }

    const handleRelTime = (value) =>{
        setRelTimeTitle(value)
    }

    const handleRelYear = (value) => {
        setRelYear(value)
    }

    const handleFixedYear = (value) => {
        setFixYear(value);
    }

    const handleFixedTime = (value) => {
        setFixPeriodType(value)
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

                                        <MDBCol className="mb-5 width-custom" md="13">
                                            <MDBCard display="flex" justifyContent="center" className="text-xl-center w-100 width-custom">

                                                <MDBCardBody>

                                                    <MDBContainer>

                                                        <Tabs
                                                            id="controlled-tab-example"
                                                            activeKey={key}
                                                            onSelect={(k) => setKey(k)}>

                                                            <Tab eventKey="home" title="Fixed Periods">
                                                                <MDBRow>
                                                                    <MDBCol md="6">
                                                                        <div className="text-left my-3">
                                                                            <label className="grey-text ml-2">
                                                                                <strong>Select Time Period Type</strong>
                                                                            </label>
                                                                            <MDBDropdown className=" myDropDown">
                                                                                <MDBDropdownToggle caret color="primary">
                                                                                    {fixPeriodType}
                                                                                </MDBDropdownToggle>
                                                                                <MDBDropdownMenu className="dropdown-menu myDrop"  basic >
                                                                                    {periodTypes.map((item, index) => (
                                                                                        <MDBDropdownItem onClick={()=>{handleFixedTime(item.name)}}
                                                                                            key={index}>
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
                                                                                    {fixYear}
                                                                                </MDBDropdownToggle>
                                                                                <MDBDropdownMenu className="dropdown-menu myDrop"  basic >
                                                                                    {allYears.map((item, index) => (
                                                                                        <MDBDropdownItem
                                                                                            onClick={()=>{handleFixedYear(item)}} key={index}>
                                                                                            {item}
                                                                                        </MDBDropdownItem>
                                                                                    ))}
                                                                                </MDBDropdownMenu>
                                                                            </MDBDropdown>
                                                                        </div>
                                                                    </MDBCol>

                                                                </MDBRow>
                                                            </Tab>


                                                            <Tab eventKey="profile" title="Relative Periods">
                                                                <MDBRow>
                                                                    <MDBCol md="4">
                                                                        <div className="text-left my-3">
                                                                            <label className="grey-text ml-2">
                                                                                <strong>Select Time Period Type</strong>
                                                                            </label>
                                                                            <MDBDropdown className=" myDropDown">
                                                                                <MDBDropdownToggle caret color="primary">
                                                                                    {relCategoriesTitle}
                                                                                </MDBDropdownToggle>
                                                                                <MDBDropdownMenu className="dropdown-menu myDrop"  basic >
                                                                                    {relCategories.map((item, index) => (
                                                                                        <MDBDropdownItem onClick={()=>periodTypeClick(item)} key={index}>
                                                                                            {item}
                                                                                        </MDBDropdownItem>
                                                                                    ))}
                                                                                </MDBDropdownMenu>
                                                                            </MDBDropdown>
                                                                        </div>
                                                                    </MDBCol>
                                                                    <MDBCol md="4">
                                                                        <div className="text-left my-3">
                                                                            <label className="grey-text ml-2">
                                                                                <strong>Select Actual period</strong>
                                                                            </label>
                                                                            <MDBDropdown className=" myDropDown">
                                                                                <MDBDropdownToggle caret color="primary">
                                                                                    {relTimeTitle}
                                                                                </MDBDropdownToggle>
                                                                                <MDBDropdownMenu className="dropdown-menu myDrop"  basic >
                                                                                    {relativeTime.map((item, index) => (
                                                                                        <MDBDropdownItem
                                                                                            onClick={()=>{handleRelTime(item)}} key={index}>
                                                                                            {item}
                                                                                        </MDBDropdownItem>
                                                                                    ))}
                                                                                </MDBDropdownMenu>
                                                                            </MDBDropdown>
                                                                        </div>
                                                                    </MDBCol>
                                                                    <MDBCol md="4">
                                                                        <div className="text-left my-3">
                                                                            <label className="grey-text ml-2">
                                                                                <strong>Select Year</strong>
                                                                            </label>
                                                                            <MDBDropdown className=" myDropDown">
                                                                                <MDBDropdownToggle caret color="primary">
                                                                                    {relYear}
                                                                                </MDBDropdownToggle>
                                                                                <MDBDropdownMenu className="dropdown-menu myDrop"  basic >
                                                                                    {allYears.map((item, index) => (
                                                                                        <MDBDropdownItem
                                                                                            onClick={()=>{handleRelYear(item)}} key={index}>
                                                                                            {item}
                                                                                        </MDBDropdownItem>
                                                                                    ))}
                                                                                </MDBDropdownMenu>
                                                                            </MDBDropdown>
                                                                        </div>
                                                                    </MDBCol>

                                                                </MDBRow>
                                                            </Tab>
                                                        </Tabs>

                                                    </MDBContainer>

                                                </MDBCardBody>
                                            </MDBCard>
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