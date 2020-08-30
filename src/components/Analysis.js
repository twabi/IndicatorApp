import React from "react";
import {
    MDBBox,
    MDBBtn,
    MDBCard,
    MDBCardBody, MDBCardFooter,
    MDBCardHeader,
    MDBCardText,
    MDBCardTitle,
    MDBCol,
    MDBInput, MDBTable, MDBTableBody, MDBTableHead
} from "mdbreact";
import 'antd/dist/antd.css'
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { MDBDropdown, MDBDropdownToggle, MDBBtnGroup, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import { MDBContainer, MDBRow } from "mdbreact";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import 'react-dropdown-tree-select/dist/styles.css'
import 'react-dropdown-tree-select/dist/styles.css'
import { TreeSelect } from 'antd';


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


const basicAuth = 'Basic ' + btoa('ahmed:@Ahmed20');

const ShowAnalysis = (props) => {
    const classes = useStyles();
    var initState = props.organization;
    var initReport = props.reportProps;
    var initCrops = props.cropOptions;
    var financial = [
          "THIS_FINANCIAL_YEAR",
        "LAST_FINANCIAL_YEAR", "LAST_5_FINANCIAL_YEARS"]

    var max = new Date().getFullYear();
    var min = max - 100;

    var myArray = [];
    var array3 = [];
    for(var i=0; i<54; i++){
        array3.push(i.toString())
    }
    var weekNumbers = array3;

    for(var i=min; i<=max; i++){
        myArray.push(i.toString());
    }

    var allYears = myArray.reverse();

    var weeks = [ "THIS_WEEK", "LAST_WEEK", "LAST_4_WEEKS", "LAST_12_WEEKS", "LAST_52_WEEKS"]
    var quarters = ["THIS_QUARTER", "LAST_QUARTER", "QUARTERS_THIS_YEAR", "QUARTERS_LAST_YEAR", "LAST_4_QUARTERS",]
    var bimonth = ["THIS_BIMONTH", "LAST_BIMONTH", "LAST_6_BIMONTHS"]
    var month = ["THIS_MONTH", "LAST_MONTH", "LAST_3_MONTHS", "MONTHS_THIS_YEAR",  "MONTHS_LAST_YEAR", "LAST_12_MONTHS"]
    var array2 = ["Weeks", "Months", "Years", "Quarters", "Financial Years", "Bi-Months", "Six-Months"]
    var sixmonth = ["THIS_SIX_MONTH", "LAST_SIX_MONTH", "LAST_2_SIXMONTHS"]
    var year = ["THIS_YEAR", "LAST_YEAR", "LAST_5_YEARS"]

    const [reports, setReports] = React.useState(initReport);
    const [orgUnits, setOrgUnits] = React.useState(initState);
    const [searchValue, setSearchValue] = React.useState("select ...");
    const [reportValue, setReportValue] = React.useState("")
    const [periodTypes, setPeriodTypes] = React.useState([])
    const [key, setKey] = React.useState('home');
    const [relativeTime, setRelativePeriods] = React.useState([]);
    const [relCategories, setRelCategories] = React.useState(array2);
    const [relCategoriesTitle, setRelCategoriesTitle] = React.useState("Period Type");
    const [relTimeTitle, setRelTimeTitle] = React.useState("Actual Period");
    const [relYear, setRelYear] = React.useState("Year");
    const [fixYear, setFixYear] = React.useState("Year");
    const [fixPeriodType, setFixPeriodType] = React.useState("period Type");
    const [selectedReport, setSelectedReport] =  React.useState({})
    const [selectedFixedtime, setSelectedFixedtime] = React.useState("")
    const [selectedReltime, setSelectedReltime] = React.useState("")
    const [selectedRelYear, setSelectedRelYear] = React.useState("");
    const [selectedFixedYear, setSelectedFixedYear] = React.useState("");
    const [allCrops, setAllCrops] = React.useState(initCrops)
    const [fixedYears, setfixedYears] = React.useState(["2020"]);
    const [showAnalysis, setShowAnalysis] = React.useState(false);
    const [periodNumber, setPeriodNumber] = React.useState([])
    const [numberTitle, setNumberTitle] = React.useState("NaN")
    const [showMenu, setShowMenu] = React.useState(true);
    const [selectedOrgUnits, setSelectedOrgUnits] = React.useState([]);
    const [analytics, setAnalytics] = React.useState([]);

    const handleChange = (event) => {
        setfixedYears(event.target.value);
        console.log(event.target.value);
    };

    const handleChangeMultiple = (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setfixedYears(value);
    };

    const getAnalytics = (ouID, dxID, pe, id, callBack) => {

        //var analysis = [];

        return fetch(`https://cors-anywhere.herokuapp.com/https://www.namis.org/namis1/api/29/analytics.json?dimension=dx:${dxID}&dimension=pe:${pe}&filter=ou:${ouID}&displayProperty=NAME&outputIdScheme=NAME`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization' : basicAuth,
                'Content-type': 'application/json',

            }

        }).then(response => response.json())
            .then((result) =>{
               // console.log(result.rows)
                //analysis = result.rows;
                callBack(result, id);

        }).catch(error => {
            alert("oops an error occurred: " + error)
        })



    };


    React.useEffect(()=>{
        console.log(props.organization);
        setReports(props.reportProps);
        setOrgUnits(props.organization)
        setPeriodTypes(props.periodProps)
        setAllCrops(props.cropOptions);

    } )



    console.log(reports.length);

    const handleButton = () => {

        if(showMenu == true){
            props.buttonCallback();
        } else if(showMenu == false){
            setShowMenu(true);
            setShowAnalysis(false);
        }
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
        setReportValue(value.title);
        setSelectedReport(value);
    }

    const handleOrgUnitClick = (value) => {
        setSearchValue(value.name);
        //setSelectedOrgUnit(value)
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
        setSelectedReltime(value);
    }

    const handleFixedTime = (value) => {
        setFixPeriodType(value)

        if(value === "Weekly"){
            setNumberTitle("Week Number");
            setPeriodNumber(weekNumbers)
            setSelectedFixedtime("W")

        } else if (value === "Monthly"){
            setNumberTitle("Month Number");
            setPeriodNumber(["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"])
            setSelectedFixedtime("")

        }else if(value === "WeeklyWednesday"){
            setNumberTitle("Week Number");
            setPeriodNumber(weekNumbers)
            setSelectedFixedtime("WedW")

        }else if(value === "WeeklyThursday"){
            setNumberTitle("Week Number");
            setPeriodNumber(weekNumbers)
            setSelectedFixedtime("ThuW")

        }else if(value === "WeeklySunday"){
            setNumberTitle("Week Number");
            setPeriodNumber(weekNumbers)
            setSelectedFixedtime("SunW")
        }
        else if(value === "WeeklySaturday"){
            setNumberTitle("Week Number");
            setPeriodNumber(weekNumbers)
            setSelectedFixedtime("SatW")

        }else if(value === "BiWeekly"){
            setNumberTitle("Week Number");
            setPeriodNumber(weekNumbers.splice(0, weekNumbers.length/2))
            setSelectedFixedtime("BiW")

        } else if (value === "BiMonthly"){
            setNumberTitle("Bi-Month Number");
            setPeriodNumber(["01", "02", "03", "04", "05", "06"])
            setSelectedFixedtime("B")

        } else if(value ===  "SixMonthly"){
            setNumberTitle("Six-Month Number");
            setPeriodNumber(["1", "2"])
            setSelectedFixedtime("S")

        } else if(value ===  "SixMonthlyApril"){
            setNumberTitle("Six-Month Number");
            setPeriodNumber(["1", "2"])
            setSelectedFixedtime("AprilS")

        }else if (value === "Yearly") {
            setNumberTitle("");
            setPeriodNumber([])
            setSelectedFixedtime("")
        } else if (value === "Quarterly") {
            setNumberTitle("Quarter Number");
            setPeriodNumber(["1", "2", "3", "4"])
            setSelectedFixedtime("Q")
        } else if (value === "FinancialYearApril"){
            setSelectedFixedtime("April")
        }else if (value === "FinancialYearJuly"){
            setSelectedFixedtime("July")
        }
        else if (value === "FinancialYearOct"){
            setSelectedFixedtime("Oct")
        }
    }
    const handlePeriodNumber = (value) => {
        setNumberTitle(value)
    }

    const handleAnalyze = () =>{

        var fixedTime = [];


        fixedYears.map((item)=>(
            fixedTime.push(item+selectedFixedtime+numberTitle)
        ))

        var analyzed = [];
        const callback = (result, id) => {
            console.log(id +"-"+result)
            analyzed.push({"id": id, "analysis" : result.rows});
            setAnalytics([...analyzed]);
        }


        selectedReport.cellData.map((item)=>{
            item.rowData.map((row, index) =>{
                /*
                getAnalytics(variable.id, row.indicatorID, fixedTime[0], row.id, callback)
                    .then((r) => {
                        setAnalytics([...analyzed]);
                    })
                    .then(()=>{
                        console.log(analyzed)
                        console.log(analytics)

                    })

                 */

                fetch(`https://cors-anywhere.herokuapp.com/https://www.namis.org/namis1/api/29/analytics.json?dimension=dx:${row.indicatorID}&dimension=pe:${fixedTime[0]}&filter=ou:${variable.id}&displayProperty=NAME&outputIdScheme=NAME`, {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Authorization' : basicAuth,
                        'Content-type': 'application/json',

                    }

                }).then(response => response.json())
                    .then((result) =>{
                        console.log(result.rows[0])
                        //setAnalytics(result.rows);
                        //analyzed.push({"id":item.id, "analysisRow" : result.rows})
                        console.log(result.rows)
                        row.indicatorValue = result.rows;

                    }).then(()=>{
                        console.log(selectedReport)
                }).catch(error => {
                    alert("oops an error occurred: " + error)
                });
            })


            /*



             */

        });


        setShowAnalysis(true)
        setShowMenu(false);
        console.log(variable);
        console.log(selectedReport);
        console.log(fixedYears)
        console.log(selectedFixedtime);
        //console.log(relTimeTitle);
        console.log(fixedTime)
        //console.log(analyzed)



        //console.log(getAnalytics())

        /*
        var cropIndicators = []
        for(var i=0; i<indicators.length; i++){
            for(var j=0; j<selectedReport.programGroups.length; j++){
                for(var m=0; m<selectedReport.programGroups[j].indicators.length; m++){
                    if(indicators[i].id === selectedReport.programGroups[j].indicators[m].id){
                        for(var y=0; y<selectedReport.crops.length; y++){
                            if(indicators[i].name.includes(selectedReport.crops[y])){
                                console.log("this is the crop: " + selectedReport.crops[y])
                                console.log("this is the indicator: " + indicators[i].name)
                                cropIndicators.push(indicators[i]);
                            } else {
                                console.log("found no matching indicators")
                            }
                        }
                    }
                }

            }
        }

        console.log(cropIndicators)

                if(selectedFixedtime.length === 0 || false){
                    console.log(selectedReport);
                    console.log(selectedOrgUnit);
                    console.log(selectedRelYear);
                    console.log(selectedReltime)
                } else if(selectedReltime.length === 0 || false){
                    console.log(selectedReport);
                    console.log(selectedOrgUnit);
                    console.log(selectedFixedYear);
                    console.log(selectedFixedtime);
                }

                 */

    }

    const [variable, setVariable] = React.useState({});

    const handle = (value, label, extra) => {
        setSearchValue(value)
    };

    const onSelect = (value, node) => {

        console.log(node.id)
        setVariable(node)

    }

    const AnalysisTable = () => (

        <MDBBox display="flex" justifyContent="center" >
            <MDBCol className="mb-5" md="9">
        <MDBCard>
            <MDBCardHeader tag="h5" className="text-center font-weight-bold text-uppercase py-4">
                {selectedReport.title}
            </MDBCardHeader>

            <MDBCardBody >
                <MDBTable striped bordered responsive>
                    <MDBTableHead>
                        <tr>
                            {selectedReport.columnHeaders.map((item, key) => (
                                <th key={key} >
                                    {item.name}
                                </th>

                            ))}
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {selectedReport.cellData.map((item, key) => (
                            <tr key={key} >
                                <td key={key}>
                                    {item.rowDetails.name}
                                </td>
                                {selectedReport.columnHeaders
                                    .slice(0,selectedReport.columns-1).map((dat, index)=>(
                                    <td key={i}>
                                        {item.rowData[index].indicatorValue}
                                    </td>
                                ))}

                            </tr>
                        ))}



                    </MDBTableBody>
                </MDBTable>
            </MDBCardBody>
            <MDBCardFooter>
                <Grid container justify="center" alignItems="center" style={{margin: 10}}>

                    <MDBBtn color="primary">Print PDF </MDBBtn>

                </Grid>
            </MDBCardFooter>

        </MDBCard></MDBCol></MDBBox>
    )

    return (

        <div>
            <MDBBtn color="cyan"
                    onClick={handleButton}
                    className="text-white float-lg-right mr-2" type="submit">
                Back
            </MDBBtn>

            <hr className='hr-light' />

            {showMenu ? <MDBBox display="flex" justifyContent="center" >
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
                                                <strong>select Organization Units</strong>
                                            </label>

                                            <TreeSelect
                                                style={{ width: '100%' }}
                                                value={searchValue}
                                                className="mt-4"
                                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                                treeData={orgUnits}
                                                placeholder="Please select org unit"
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

                                                                        </div>
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
                                    Analyze
                                </MDBBtn>
                            </div>

                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBBox> : null}

            { showAnalysis ? <AnalysisTable/> : null }

        </div>
    )

}

export default React.memo(ShowAnalysis);