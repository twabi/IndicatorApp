import React from "react";
import {
    MDBBox,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardText,
    MDBCardTitle,
    MDBCol, MDBTable, MDBTableBody, MDBTableHead
} from "mdbreact";
import "antd/dist/antd.css";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import jsPDF from "jspdf";
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import { MDBContainer, MDBRow } from "mdbreact";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import "react-dropdown-tree-select/dist/styles.css";
import {DatePicker, TreeSelect} from "antd";
import "jspdf-autotable";
import html2canvas from "html2canvas";
import NavBar from "../NavBar";

//styles for the material ui components
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(0.5),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

//authentication for the namis api
const basicAuth = "Basic " + btoa("ahmed:@Ahmed20");

const ShowAnalysis = (props) => {
    const classes = useStyles();
    var initState = props.organization;
    var initReport = props.reportProps;

    //array for the financial year dropdown
    var financial = [
          "THIS_FINANCIAL_YEAR",
        "LAST_FINANCIAL_YEAR", "LAST_5_FINANCIAL_YEARS"];

    //get the week numbers by simply iterating and adding to the array
    var myArray = [];
    var array3 = [];
    var i;
    for(i=0; i<54; i++){
        array3.push(i.toString())
    }
    var weekNumbers = array3;

    //create an array of years for the years dropdown
    // And simply iterate and add to the array to have the years from smallest to largest.
    var max = new Date().getFullYear();
    var min = max - 100;
    var y;
    for(y=min; y<=max; y++){
        myArray.push(y.toString());
    }
    var allYears = myArray.reverse();

    //some other arrays for the relative periods dropdowns
    var weeks = [ "THIS_WEEK", "LAST_WEEK", "LAST_4_WEEKS", "LAST_12_WEEKS", "LAST_52_WEEKS"];
    var quarters = ["THIS_QUARTER", "LAST_QUARTER", "QUARTERS_THIS_YEAR", "QUARTERS_LAST_YEAR", "LAST_4_QUARTERS"];
    var bimonth = ["THIS_BIMONTH", "LAST_BIMONTH", "LAST_6_BIMONTHS"];
    var month = ["THIS_MONTH", "LAST_MONTH", "LAST_3_MONTHS", "MONTHS_THIS_YEAR",  "MONTHS_LAST_YEAR", "LAST_12_MONTHS"];
    var array2 = ["Weeks", "Months", "Years", "Quarters", "Financial Years", "Bi-Months", "Six-Months"];
    var sixmonth = ["THIS_SIX_MONTH", "LAST_SIX_MONTH", "LAST_2_SIXMONTHS"];
    var year = ["THIS_YEAR", "LAST_YEAR", "LAST_5_YEARS"];

    //hooks variables to be used throughout the component
    const [reports, setReports] = React.useState(initReport);
    const [orgUnits, setOrgUnits] = React.useState(initState);
    const [searchValue, setSearchValue] = React.useState([]);
    const [reportValue, setReportValue] = React.useState("");
    const [periodTypes, setPeriodTypes] = React.useState([]);
    const [key, setKey] = React.useState("home");
    const [relativeTime, setRelativePeriods] = React.useState([]);
    const [relCategories, setRelCategories] = React.useState(array2);
    const [relCategoriesTitle, setRelCategoriesTitle] = React.useState("Period Type");
    const [relTimeTitle, setRelTimeTitle] = React.useState("Actual Period");
    const [fixPeriodType, setFixPeriodType] = React.useState("period Type");
    const [selectedReport, setSelectedReport] =  React.useState({});
    const [selectedFixedtime, setSelectedFixedtime] = React.useState("");
    const [fixedYears, setfixedYears] = React.useState(["2020"]);
    const [showAnalysis, setShowAnalysis] = React.useState(false);
    const [periodNumber, setPeriodNumber] = React.useState([]);
    const [numberTitle, setNumberTitle] = React.useState("NaN");
    const [showMenu, setShowMenu] = React.useState(true);
    const [analytics, setAnalytics] = React.useState([]);
    const [fixedTimeClicked, setFixedTimeClicked] = React.useState(false);
    const [relTimeClicked, setRelTimeClicked] = React.useState(false);
    const [showLoading, setShowLoading] = React.useState(false);
    const [showDownloading, setShowDownloading] = React.useState(false);
    const [showButton, setShowButton] = React.useState(false);
    const [showDayDiv, setShowDayDiv] = React.useState(false);
    const [showYearSelect, setShowYearSelect] = React.useState(true);
    const [dateString, setDateString] = React.useState("");
    const [yearArray, setYearArray] = React.useState([]);
    const [yearArray2, setYearArray2] = React.useState([]);
    const [variable, setVariable] = React.useState([]);

    const handleChange = (event) => {
        setfixedYears(event.target.value);
    };

    function onChange(date, dateString) {
        setDateString(dateString.replace(/-/g,""));
    }

    //the function that runs the analytics api is this one, carrying with it are the parameters orgunits etc
    const getAnalytics = (item, row, pe, ouID,  callBack) => {
        var dxID = row.indicatorID;
        //var analysis = [];

        return fetch(`https://cors-anywhere.herokuapp.com/https://www.namis.org/namis1/api/29/analytics.json?dimension=pe:${pe}&dimension=ou:${ouID}&filter=dx:${dxID}&displayProperty=NAME&outputIdScheme=NAME`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Authorization" : basicAuth,
                "Content-type": "application/json",

            }

        }).then((response) => response.json())
            .then((result) => {
                callBack(item, row, result); //initiate the callback method


        }).catch((error) => {
            alert("oops an error occurred: " + error + " .Try reloading your page");

        });
    };

    //some variables that need use effect for the data that comes in late after the component has already rendered
    React.useEffect(() => {
        setReports(props.reportProps);
        setOrgUnits(props.organization);
        setPeriodTypes(props.periodProps);

    }, [ props.organization, props.periodProps, props.reportProps]);

    //the back button in the analysis layout
    //checks whether the user is in table view mode or not .
    const handleButton = () => {

        if(showMenu === true){
            //props.buttonCallback();
        } else if(showMenu === false){
            setVariable([]);
            setSearchValue([]);
            setShowMenu(true);
            setShowAnalysis(false);
            setShowButton(false);
        }
    }


    //the function that implements the reports filtering
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
        setReportValue(value.title);
        setSelectedReport(value);
    }

    //when a period type is clicked, the adjacent dropdown's values should change based on the value of the category
    // chosen in the first dropdown
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
    };

    //the functions that prints the table to pdf format
    const exportPDF = (title) => {
        setShowDownloading(true);
        const input = document.getElementById('tableDiv');
        html2canvas(input)
            .then((canvas) => {
                //const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                //pdf.addImage(imgData, 'PNG', 10, 10);
                pdf.setFontSize(25);
                pdf.autoTable({startY: 20, html: '#tableDiv'});
                pdf.text(title, 50, 15);
                pdf.save(title + ".pdf");
            }).then(() => {
                setShowDownloading(false);
            });
    }

    const handleRelTime = (value) =>{
        setRelTimeTitle(value)
        setRelTimeClicked(true);
        setFixedTimeClicked(false);
    }

    //same method as above but this one is for fixed periods
    const handleFixedTime = (value) => {
        setFixPeriodType(value)
        setFixedTimeClicked(true);
        setRelTimeClicked(false);

        if(value === "Weekly"){
            setNumberTitle("Week Number");
            setPeriodNumber(weekNumbers)
            setSelectedFixedtime("W")
            setShowDayDiv(false);
            setShowYearSelect(true);

        } else if(value==="Daily"){
            setShowDayDiv(true);
            setShowYearSelect(false);

        }else if (value === "Monthly"){
            setNumberTitle("Month Number");
            setPeriodNumber(["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"])
            setSelectedFixedtime("")
            setShowDayDiv(false);
            setShowYearSelect(true);

        }else if(value === "WeeklyWednesday"){
            setNumberTitle("Week Number");
            setPeriodNumber(weekNumbers)
            setSelectedFixedtime("WedW")
            setShowDayDiv(false);
            setShowYearSelect(true);

        }else if(value === "WeeklyThursday"){
            setNumberTitle("Week Number");
            setPeriodNumber(weekNumbers)
            setSelectedFixedtime("ThuW")
            setShowDayDiv(false);
            setShowYearSelect(true);

        }else if(value === "WeeklySunday"){
            setNumberTitle("Week Number");
            setPeriodNumber(weekNumbers)
            setSelectedFixedtime("SunW")
            setShowDayDiv(false);
            setShowYearSelect(true);
        }
        else if(value === "WeeklySaturday"){
            setNumberTitle("Week Number");
            setPeriodNumber(weekNumbers)
            setSelectedFixedtime("SatW")
            setShowDayDiv(false);
            setShowYearSelect(true);

        }else if(value === "BiWeekly"){
            setNumberTitle("Week Number");
            setPeriodNumber(weekNumbers.splice(0, weekNumbers.length/2))
            setSelectedFixedtime("BiW")
            setShowDayDiv(false);
            setShowYearSelect(true);

        } else if (value === "BiMonthly"){
            setNumberTitle("Bi-Month Number");
            setPeriodNumber(["01", "02", "03", "04", "05", "06"])
            setSelectedFixedtime("B")
            setShowDayDiv(false);
            setShowYearSelect(true);

        } else if(value ===  "SixMonthly"){
            setNumberTitle("Six-Month Number");
            setPeriodNumber(["1", "2"])
            setSelectedFixedtime("S")
            setShowDayDiv(false);
            setShowYearSelect(true);

        } else if(value ===  "SixMonthlyApril"){
            setNumberTitle("Six-Month Number");
            setPeriodNumber(["1", "2"])
            setSelectedFixedtime("AprilS")
            setShowDayDiv(false);
            setShowYearSelect(true);

        }else if (value === "Yearly") {
            setNumberTitle("");
            setPeriodNumber([])
            setSelectedFixedtime("")
            setShowDayDiv(false);
            setShowYearSelect(true);

        } else if (value === "Quarterly") {
            setNumberTitle("Quarter Number");
            setPeriodNumber(["1", "2", "3", "4"])
            setSelectedFixedtime("Q")

        } else if (value === "FinancialApril"){
            setSelectedFixedtime("April")
            setNumberTitle("");
            setPeriodNumber([])
            setShowDayDiv(false);
            setShowYearSelect(true);

        }else if (value === "FinancialJuly"){
            setSelectedFixedtime("July")
            setNumberTitle("");
            setPeriodNumber([])
            setShowDayDiv(false);
            setShowYearSelect(true);
        }
        else if (value === "FinancialOct"){
            setSelectedFixedtime("Oct")
            setNumberTitle("");
            setPeriodNumber([])
            setShowDayDiv(false);
            setShowYearSelect(true);
        }
    }
    const handlePeriodNumber = (value) => {
        setNumberTitle(value)
    }

    //this is the method that handles the callback that is returned from the fetch method above.
    //it handles the analysis results and structures the data into the right format
    const Analysis = (report, timePeriod, orgUnit ) => {

        var analyzed = [];
        const callback = (item, row, result) => {
            if(result == null){
                alert("oops, an error occurred! Try reloading your page");

            }else {

                //get the periods and the orgUnits that have been analysed, these are returned by the fetch request itself
                var periods = result.metaData.dimensions.pe;
                var ou = result.metaData.dimensions.ou;
                var columns = [];
                //place both the periods and orgUnits into an array of columns for easy identification later in the table
                periods.map((pe)=>{
                    ou.map((unit)=>{
                        columns.push({"year" : pe, "unit": result.metaData.items[unit].name});
                    })
                })

                //making sure there's no duplication in the columns array and reverse it in ascending
                var array = columns.slice().reverse().filter((v,i,a)=>a.findIndex(t=>(t.year === v.year))===i).reverse();

                //Now there's a reason i have two of these, the first one is for the year column headers in the table
                //and the second one is for the row data...
                //do I need two of these YearArrays?? yes definitely yes, If you have a better implementation,
                // then be my guest but it was easier to implement the headers and the data separately
                setYearArray(array);
                setYearArray2(columns);

                //now moving on to the actual data, the result rows should not be empty, if they are
                if(result.rows == null || result.rows.length === 0){
                    //console.log("this year has no data!" + columns);
                    //row.indicatorValue = "-";
                    analyzed.push(item);
                    setAnalytics([...analyzed]);
                    var year = result.rows[i][0];
                    columns.map((item)=>{
                        if(item.year.includes(year)){
                            //value.push(result.rows[i][1] +" : "+ result.rows[i][2]);
                            //put a blank value if the result is empty
                            item.value = "-"
                        }
                    });

                } else {
                    //console.log(result)

                    //if it has data on the other hand, place the data in the column where the period and orgUnits both match
                    for(var i =0; i<result.rows.length; i++){

                        var year = result.rows[i][0];
                        var uno = result.rows[i][1]
                        columns.map((item)=>{
                            if(item.year.includes(year) && item.unit.includes(uno)){
                                //value.push(result.rows[i][1] +" : "+ result.rows[i][2]);
                                item.value = result.rows[i][2];
                            }
                        })

                    }

                    //if any empty columns are found, as in columns with year and orgUnit but null dataValue, set the value to
                    //a dash
                    columns.map((item)=>{
                        if(item.value == null || item.value === ""){
                            item.value = "-";
                        }
                    });

                    row.indicatorValue = columns;
                    analyzed.push(item);
                    setAnalytics([...analyzed]);
                }


            }
        }


        //get the data back from the method above and then display the data got into the table
        report.cellData.map((item)=> {
            item.rowData.map((row, index) => {

                getAnalytics(item, row, timePeriod, orgUnit, callback)
                    .then((r) => {
                        setAnalytics([...analyzed]);
                    })
                    .then(() => {
                        setAnalytics([...analyzed]);
                        setShowAnalysis(true)
                        setShowMenu(false);
                        //setYearArray(yearArray.splice(0, analyzed.length));
                        setShowLoading(false);
                        setShowButton(true);

                    })
            })
        });
    }

    const handleAnalyze = () => {
        console.log(variable);

        setShowLoading(true);
        var fixedTime = [];

        fixedYears.map((item)=>(
            fixedTime.push(item + selectedFixedtime + numberTitle)
        ))

        var units = [];
        variable.map((item) => {
            console.log(item);
            units.push(item.id);
        })
        console.log(units);

        if(relTimeClicked === true ){
            console.log(selectedReport);
            console.log(relTimeTitle);
            console.log(units.join(";"));
            console.log("relative time")

            Analysis(selectedReport, relTimeTitle, units.join(";"));

        } else if(fixedTimeClicked === true){

            if(dateString !== ""){
                console.log(dateString);
                Analysis(selectedReport, dateString, units.join(";"));
            }else{
                console.log(selectedReport);
                console.log(units.join(";"));
                console.log(fixedTime);
                console.log("fixed time");

                Analysis(selectedReport, fixedTime.join(";"), units.join(";"));
            }

        }
    }

    const handle = (value, label, extra) => {
        setSearchValue(value)
    };

    const onSelect = (value, node) => {

        setVariable(variable => [...variable, node]);

    };

    const AnalysisTable = (analytics) => {
        var analyzed = analytics.slice().reverse().filter((v,i,a)=>a.findIndex(t=>(t.rowDetails.id === v.rowDetails.id))===i).reverse();
        console.log(yearArray2);
        if(analyzed !== null && analyzed.length !== 0){
            return (

                <MDBBox  display="flex" justifyContent="center" className="mt-5" >
                    <MDBCol className="mb-5" md="11">
                        <MDBCard  className="ml-4">
                            <MDBCardHeader tag="h5" className="text-center font-weight-bold text-uppercase py-4">
                                {selectedReport.title}
                            </MDBCardHeader>

                            <MDBCardBody  >
                                <MDBTable id="tableDiv" striped bordered responsive className="border-dark border">
                                    <MDBTableHead>
                                        <tr>
                                            <th rowSpan="2"> </th><th> </th>
                                            {yearArray.map((year)=>(
                                                <th className="text-center" colSpan={selectedReport.columnHeaders.length-1}>{year.year}</th>
                                            ))}
                                        </tr>
                                        <tr>
                                            <th>
                                                {selectedReport.columnHeaders[0].name}
                                            </th>
                                            {yearArray.map((year, index) => (
                                                selectedReport.columnHeaders.slice(1, selectedReport.columnHeaders.length)
                                                    .map((item, key) => (
                                                        <th key={key} >
                                                            {item.name}
                                                        </th>

                                                    ))
                                            ))}
                                        </tr>

                                    </MDBTableHead>
                                    <MDBTableBody>

                                        {variable.map((unit, ind)=>(

                                            selectedReport.cellData.map((item, key) => (
                                                <tr key={key}>
                                                    { key==0 && <td rowSpan={selectedReport.cellData.length}>{unit.name}</td> }
                                                    <td key={key}>
                                                        {item.rowDetails.name}
                                                    </td>


                                                    {yearArray.map((year, indexie)=>(
                                                        item.rowData.map((data, number) =>(
                                                            <td className="new-line" key={i}>

                                                                {data.indicatorValue && data.indicatorValue.map((val, num)=>(
                                                                    <>{val.year === year.year && val.unit === unit.name ? val.value : null}</>
                                                                ))}
                                                            </td>
                                                        ))


                                                    ))}
                                                </tr>
                                            ))

                                        ))}

                                    </MDBTableBody>
                                </MDBTable>
                            </MDBCardBody>

                        </MDBCard>
                        <Grid container justify="center" alignItems="center" style={{margin: 10}}>

                            <MDBBtn color="primary" onClick={()=>{exportPDF(selectedReport.title)}}>
                                Print PDF {showDownloading ? <div className="spinner-border mx-2 text-white spinner-border-sm" role="status">
                                <span className="sr-only">Loading...</span>
                            </div> : null}
                            </MDBBtn>

                        </Grid>
                    </MDBCol></MDBBox>
            );
        }

    };

    return (

        <div>
            <NavBar/>
            {showButton ? <MDBBtn color="cyan"
                                  onClick={handleButton}
                                  className="text-white float-lg-right mr-2 mb-5" type="submit">
                Back
            </MDBBtn> : null}

            <hr className='hr-light' />

            {showMenu ? <MDBBox display="flex" justifyContent="center" >
                <MDBCol className="mb-5" md="10">
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

                                                    {reports.map((report, index) => (

                                                        <MDBDropdownItem onClick={()=>{handleReportsClick(report)}} key={index}>
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
                                                <strong>select Organization Unit</strong>
                                            </label>

                                            <TreeSelect
                                                style={{ width: '100%' }}
                                                value={searchValue}
                                                className="mt-4"
                                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                                treeData={orgUnits}
                                                allowClear
                                                multiple
                                                placeholder="Please select organizational unit"
                                                onChange={handle}
                                                onSelect={onSelect}
                                            />

                                        </div>
                                    </MDBCol>

                                </MDBRow>



                                <MDBRow>

                                        <MDBCol className="mb-5 width-custom" md="13">
                                            <MDBCard display="flex" justifyContent="center" className="text-xl-center w-100 width-custom">
                                                <MDBCardHeader tag="h6" className="text-center font-weight-bold text-uppercase py-4">
                                                    Select Period Type
                                                </MDBCardHeader>

                                                <MDBCardBody>

                                                    <MDBContainer>

                                                        <Tabs
                                                            id="controlled-tab-example"
                                                            activeKey={key}
                                                            onSelect={(k) => setKey(k)}>

                                                            <Tab eventKey="home" title="Fixed Periods">
                                                                <MDBRow>
                                                                    <MDBCol md="4">
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

                                                                    <MDBCol md="4">
                                                                        <div className="text-left my-3">
                                                                            <label className="grey-text ml-2">
                                                                                <strong>Period Number</strong>
                                                                            </label>
                                                                            <MDBDropdown className=" myDropDown">
                                                                                <MDBDropdownToggle caret color="primary">
                                                                                    {numberTitle}
                                                                                </MDBDropdownToggle>
                                                                                <MDBDropdownMenu className="dropdown-menu myDrop"  basic >
                                                                                    {periodNumber.map((item, index) => (
                                                                                        <MDBDropdownItem onClick={()=>{handlePeriodNumber(item)}}
                                                                                                         key={index}>
                                                                                            {item}
                                                                                        </MDBDropdownItem>
                                                                                    ))}
                                                                                </MDBDropdownMenu>
                                                                            </MDBDropdown>
                                                                        </div>
                                                                    </MDBCol>

                                                                    <MDBCol md="4">
                                                                        {showYearSelect ?
                                                                            <div className="text-left my-3">
                                                                                <label className="grey-text ml-2">
                                                                                    <strong>Select period Year</strong>
                                                                                </label>
                                                                                <FormControl variant="outlined" className={classes.formControl}>
                                                                                    <Select
                                                                                        labelId="demo-mutiple-checkbox-label"
                                                                                        id="demo-mutiple-checkbox"
                                                                                        multiple
                                                                                        value={fixedYears}
                                                                                        onChange={handleChange}
                                                                                        renderValue={(selected) => selected.join(', ')}
                                                                                        MenuProps={MenuProps}
                                                                                    >
                                                                                        {allYears.map((name) => (
                                                                                            <MenuItem key={name} value={name}>
                                                                                                <Checkbox checked={fixedYears.indexOf(name) > -1} />
                                                                                                <ListItemText primary={name} />
                                                                                            </MenuItem>
                                                                                        ))}
                                                                                    </Select>
                                                                                </FormControl>

                                                                            </div>: null}

                                                                        {showDayDiv ?
                                                                            <div className="text-left my-3 d-flex flex-column">
                                                                                <label className="grey-text ml-2">
                                                                                    <strong>Day Number</strong>
                                                                                </label>
                                                                                <DatePicker className="mt-3" onChange={onChange} />
                                                                            </div> : null}
                                                                    </MDBCol>

                                                                </MDBRow>
                                                            </Tab>


                                                            <Tab eventKey="profile" title="Relative Periods">
                                                                <MDBRow>
                                                                    <MDBCol md="6">
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
                                                                    <MDBCol md="6">
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
                                <MDBBtn color="cyan" onClick={handleAnalyze} className="text-white">
                                    Analyze {showLoading ? <div className="spinner-border mx-2 text-white spinner-border-sm" role="status">
                                                                <span className="sr-only">Loading...</span>
                                                            </div> : null}
                                </MDBBtn>
                            </div>

                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBBox> : null}

            { showAnalysis ?
                    <Grid item>
                        {AnalysisTable(analytics)}
                    </Grid> : null }
        </div>
    );

}

export default React.memo(ShowAnalysis);