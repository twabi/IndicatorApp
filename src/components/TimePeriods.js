import React from "react";
import {
    MDBBox,
    MDBBtn,
    MDBCard,
    MDBCardBody, MDBCardHeader,
    MDBCardText,
    MDBCardTitle,
    MDBCol,
    MDBContainer, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle,
    MDBRow, MDBTable, MDBTableBody, MDBTableHead
} from "mdbreact";
import { DatePicker } from 'antd';
import {TreeSelect} from "antd";
import Grid from "@material-ui/core/Grid";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const moment = require('moment')
let now = moment();


var thisYear = now.format("YYYY");
let lastYear = moment().subtract(1, 'years').format("YYYY");

const basicAuth = 'Basic ' + btoa('ahmed:@Ahmed20');


const TimePeriods = (props) => {

    var array3 = [];
    for(var i=0; i<54; i++){
        array3.push(i.toString())
    }
    var weekNumbers = array3;

    var initState = props.indicatorProps;
    var periods = props.periodTypeProps;
    var orgs = props.orgProps;

    const [showMenu, setShowMenu] = React.useState(true);
    const [searchValue, setSearchValue] = React.useState("");
    const [indicators, setIndicators] = React.useState(initState);
    const [selectedIndicator, setSelectedIndicator] = React.useState({});
    const [periodTypes, setPeriodTypes] = React.useState(periods);
    const [periodNumber, setPeriodNumber] = React.useState([])
    const [numberTitle, setNumberTitle] = React.useState("NaN")
    const [fixPeriodType, setFixPeriodType] = React.useState("period Type");
    const [selectedFixedtime, setSelectedFixedtime] = React.useState("")
    const [orgValue, setOrgValue] = React.useState("select ...");
    const [orgUnits, setOrgUnits] = React.useState(orgs)
    const [selectedOrgUnit, setSelectedOrgUnit] = React.useState({});
    const [cols, setCols] = React.useState([])
    const [showTable, setShowTable] = React.useState(false);
    const [showLoading, setShowLoading] = React.useState(false)
    const [showDownloading, setShowDownloading] = React.useState(false);
    const [showBtn, setShowBtn] = React.useState(false);
    const [showDayDiv, setShowDayDiv] = React.useState(false);
    const [showDropdown, setShowDropdown] = React.useState(true);
    const [dateString, setDateString] = React.useState("")

    React.useEffect(()=>{
        setIndicators(props.indicatorProps);
        setPeriodTypes(props.periodTypeProps);
        setOrgUnits(props.orgProps);
    }, [props.indicatorProps, props.orgProps, props.periodTypeProps])


    const handleButton = () => {

        if(showMenu == true){
            //props.btnCallback();
        } else if(showMenu == false){
            setShowMenu(true);
            setShowTable(false);
            setShowBtn(false);
        }
    }

    function onChange(date, dateString) {
        //console.log(date, dateString);
        console.log(dateString.replace(/-/g,""));
        setDateString(dateString.replace(/-/g,""));
    }

    const getComparison = (dxID, pe, ouID,  callBack) => {

        return fetch(`https://cors-anywhere.herokuapp.com/https://www.namis.org/namis1/api/29/analytics.json?dimension=dx:${dxID}&dimension=pe:${pe}&filter=ou:${ouID}&displayProperty=NAME&outputIdScheme=NAME`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization' : basicAuth,
                'Content-type': 'application/json',

            }

        }).then(response => response.json())
            .then((result) =>{
                 console.log(result.rows)
                //analysis = result.rows;
                callBack(result);

            }).catch(error => {
                alert("oops an error occurred: " + error + " .Try reloading your page");

            })
    };

    const handleIndicatorClick = (indicator) => {
        setSearchValue(indicator.displayName);
        setSelectedIndicator(indicator);
    }

    const handlePeriodClick = (value) =>{
        setFixPeriodType(value)

        if(value === "Weekly"){
            setNumberTitle("Week Number");
            setPeriodNumber(weekNumbers)
            setSelectedFixedtime("W")
            setShowDropdown(true);
            setShowDayDiv(false);

        } else if(value === "Daily"){
            setShowDropdown(false);
            setShowDayDiv(true);

        }else if (value === "Monthly"){
            setNumberTitle("Month Number");
            setPeriodNumber(["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"])
            setSelectedFixedtime("")
            setShowDropdown(true);
            setShowDayDiv(false);

        }else if(value === "WeeklyWednesday"){
            setNumberTitle("Week Number");
            setPeriodNumber(weekNumbers)
            setSelectedFixedtime("WedW")
            setShowDropdown(true);
            setShowDayDiv(false);

        }else if(value === "WeeklyThursday"){
            setNumberTitle("Week Number");
            setPeriodNumber(weekNumbers)
            setSelectedFixedtime("ThuW")
            setShowDropdown(true);
            setShowDayDiv(false);

        }else if(value === "WeeklySunday"){
            setNumberTitle("Week Number");
            setPeriodNumber(weekNumbers)
            setSelectedFixedtime("SunW")
            setShowDropdown(true);
            setShowDayDiv(false);
        }
        else if(value === "WeeklySaturday"){
            setNumberTitle("Week Number");
            setPeriodNumber(weekNumbers)
            setSelectedFixedtime("SatW")
            setShowDropdown(true);
            setShowDayDiv(false);

        }else if(value === "BiWeekly"){
            setNumberTitle("Week Number");
            setPeriodNumber(weekNumbers.splice(0, weekNumbers.length/2))
            setSelectedFixedtime("BiW")
            setShowDropdown(true);
            setShowDayDiv(false);

        } else if (value === "BiMonthly"){
            setNumberTitle("Bi-Month Number");
            setPeriodNumber(["01", "02", "03", "04", "05", "06"])
            setSelectedFixedtime("B")
            setShowDropdown(true);
            setShowDayDiv(false);

        } else if(value ===  "SixMonthly"){
            setNumberTitle("Six-Month Number");
            setPeriodNumber(["1", "2"])
            setSelectedFixedtime("S")
            setShowDropdown(true);
            setShowDayDiv(false);

        } else if(value ===  "SixMonthlyApril"){
            setNumberTitle("Six-Month Number");
            setPeriodNumber(["1", "2"])
            setSelectedFixedtime("AprilS")
            setShowDropdown(true);
            setShowDayDiv(false);

        }else if (value === "Yearly") {
            setNumberTitle("");
            setPeriodNumber([])
            setSelectedFixedtime("")
            setShowDropdown(true);

        } else if (value === "Quarterly") {
            setNumberTitle("Quarter Number");
            setPeriodNumber(["1", "2", "3", "4"])
            setSelectedFixedtime("Q")
            setShowDropdown(true);
            setShowDayDiv(false);

        } else if (value === "FinancialApril"){
            setSelectedFixedtime("April")
            setNumberTitle("");
            setPeriodNumber([])
            setShowDropdown(true);
            setShowDayDiv(false);

        }else if (value === "FinancialJuly"){
            setSelectedFixedtime("July")
            setNumberTitle("");
            setPeriodNumber([])
            setShowDropdown(true);
            setShowDayDiv(false);
        }
        else if (value === "FinancialOct"){
            setSelectedFixedtime("Oct")
            setNumberTitle("");
            setPeriodNumber([])
            setShowDropdown(true);
            setShowDayDiv(false);
        }
    }

    const handlePeriodNumber = (value) => {
        setNumberTitle(value)
    }

    const handleCompare = () => {

        setShowLoading(true);

        var thisPeriod;
        var lastPeriod;

        if(selectedFixedtime === "B"){
             thisPeriod = thisYear  + numberTitle + selectedFixedtime;
             lastPeriod = lastYear+ numberTitle  + selectedFixedtime ;
        } else if(dateString !== ""){
            thisPeriod = dateString;
            var year = dateString.slice(0, 4);
            var other = dateString.substring(4)
            var intYear = (parseInt(year)) - 1;
            lastPeriod = intYear + other;
            console.log(lastPeriod);
            console.log(thisPeriod);
        } else {
             thisPeriod = thisYear + selectedFixedtime + numberTitle;
             lastPeriod = lastYear + selectedFixedtime + numberTitle;
        }



        var pe = thisPeriod+";"+lastPeriod;

        console.log(pe)
        console.log(selectedOrgUnit);
        console.log(selectedIndicator);

        makeComparison(thisPeriod, lastPeriod, selectedIndicator, pe, selectedOrgUnit);

    }

    const handle = (value) => {
        setOrgValue(value)
    };

    const onSelect = (value, node) => {
        setSelectedOrgUnit(node)

    }

    const makeComparison = (thisPeriod, lastPeriod, indicator, timePeriod, orgUnit ) => {

        const callback = (result) => {
            if(result == null){
                alert("oops, an error occurred! Try reloading your page");

            }else {
                var columns = [];
                columns.push({"column" : result.metaData.items[thisPeriod].name})
                columns.push({"column": result.metaData.items[lastPeriod].name})

                //var value = [];

                if(result.rows == null || result.rows.length == 0){
                    console.log("this year has no data!");
                    //row.indicatorValue = "-";
                    //value.push({"value" : "-"})

                } else {
                    console.log(result)


                    for(var i = 0; i<result.rows.length; i++){
                        //value.push(result.rows[i][1] +" : "+ result.rows[i][2]);
                        var year = result.rows[i][1]
                        //value.push({"year": result.rows[i][1], "value" : result.rows[i][2]});
                        columns.map((item) => {
                            console.log(item.column)
                            if(item.column.includes(year)){
                                item.value = result.rows[i][2]
                            }
                        })
                    }
                }
                console.log(columns);
                columns.map((item)=>{
                    if(item.value == null || item.value === ""){
                        item.value = "-";
                    }
                });
                setCols(columns);
            }
        }

        getComparison(indicator.id, timePeriod, orgUnit.id, callback)
            .then((r) => {
            })
            .then(()=>{
                setShowTable(true);
                setShowLoading(false);
                setShowMenu(false);
                setShowBtn(true);

            })


    }

    const downloadPDF = (title) => {
        setShowDownloading(true);
        const input = document.getElementById('tableDiv');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                //pdf.addImage(imgData, 'PNG', 10, 10);
                pdf.setFontSize(25);
                pdf.autoTable({startY: 20, html: '#tableDiv'});
                pdf.text(title, 50, 15);
                pdf.save(title + ".pdf");
            }).then(()=>{
            setShowDownloading(false);
        });
    }

    function handleSearch({ target: { value } }) {

        // Set captured value to input
        setSearchValue(value)

        // Variable to hold the original version of the list
        let currentList = [];
        // Variable to hold the filtered list before putting into state
        let newList = [];

        currentList = indicators;

        // If the search bar isn't empty
        if (value !== "") {
            // Assign the original list to currentList

            // Use .filter() to determine which items should be displayed
            // based on the search terms
            newList = currentList.filter(item => {
                // change current item to lowercase
                const lc = item.displayName.toLowerCase();
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
        setIndicators(newList);
    }


    const ComparisonTable = (columns) => (

        <MDBBox  display="flex" justifyContent="center" >
            <MDBCol className="mb-5" md="10">
                <MDBCard >
                    <MDBCardHeader tag="h5" className="text-center font-weight-bold text-uppercase py-4">
                        {selectedIndicator.displayName}
                    </MDBCardHeader>

                    <MDBCardBody  >
                        <MDBTable id="tableDiv" striped bordered responsive className="border-light border">
                            <MDBTableHead color="primary-color" textWhite>
                                <tr>
                                    {columns.map((item, key) => (
                                        <th key={key} >
                                            {item.column}
                                        </th>

                                    ))}
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                <tr>
                                    {columns.map((data, index)=>(
                                            <td key={index}>
                                                {data.value}
                                            </td>
                                        ))}

                                </tr>

                            </MDBTableBody>
                        </MDBTable>
                    </MDBCardBody>

                </MDBCard>
                <Grid container justify="center" alignItems="center" style={{margin: 10}}>

                    <MDBBtn onClick={()=>{downloadPDF(selectedIndicator.displayName)}} color="primary">
                        Print PDF {showDownloading ? <div className="spinner-border mx-2 text-white spinner-border-sm" role="status">
                        <span className="sr-only">Loading...</span>
                    </div> : null}
                    </MDBBtn>

                </Grid>
            </MDBCol></MDBBox>
    )


    return (
        <div>
            {showBtn ? <MDBBtn color="cyan"
                               onClick={handleButton}
                               className="text-white float-lg-right mr-2" type="submit">
                Back
            </MDBBtn> : null}

            <hr className='hr-light' />

            {showMenu ? <MDBBox display="flex" justifyContent="center" >
                <MDBCol className="mb-5" md="10">
                    <MDBCard display="flex" justifyContent="center" className="text-xl-center w-100">
                        <MDBCardBody>
                            <MDBCardTitle >
                                <strong>Time Periods</strong>
                            </MDBCardTitle>

                            <MDBCardText>
                                <strong>Compare an indicator's data for the same time last year</strong>
                            </MDBCardText>
                            <hr/>

                            <MDBContainer className="pl-5 mt-3">
                                <MDBRow>
                                    <MDBCol md="6" className="mx-1">

                                        <div className="text-left my-3">
                                            <label className="grey-text ml-2">
                                                <strong>Select preferred indicator</strong>
                                            </label>
                                            <MDBDropdown className=" myDropDown">
                                                <MDBDropdownToggle caret color="primary">
                                                    <input className="form-control"
                                                           value={searchValue}
                                                           style={{ width: '28rem' }}
                                                           onChange={e => handleSearch(e)} type="text"
                                                           placeholder="search using indicator name"
                                                           aria-label="Search" />
                                                </MDBDropdownToggle>
                                                <MDBDropdownMenu className="dropdown-menu myDrop"  basic >

                                                    {indicators.map((indicator, index) => (

                                                        <MDBDropdownItem onClick={()=>{handleIndicatorClick(indicator)}} key={index}>
                                                            {indicator.displayName}
                                                        </MDBDropdownItem>
                                                    ))}
                                                </MDBDropdownMenu>
                                            </MDBDropdown>
                                        </div>

                                    </MDBCol>
                                    <MDBCol md="6" className="mx-1">

                                        <div className="text-left mt-2 my-3">
                                            <label className="grey-text ml-2">
                                                <strong>select Organization Unit</strong>
                                            </label>

                                            <TreeSelect
                                                style={{ width: '28rem' }}
                                                value={orgValue}
                                                className="mt-2"
                                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                                treeData={orgUnits}
                                                placeholder="Please select org unit"
                                                onChange={handle}
                                                onSelect={onSelect}
                                            />

                                        </div>

                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className="mt-1">
                                    <MDBCol md="6">
                                        <div className="text-left my-3">
                                            <label className="grey-text ml-2">
                                                <strong>Select Time Period Type for This year</strong>
                                            </label>
                                            <MDBDropdown className=" myDropDown">
                                                <MDBDropdownToggle caret color="primary">
                                                    {fixPeriodType}
                                                </MDBDropdownToggle>
                                                <MDBDropdownMenu className="dropdown-menu myDrop"  basic >
                                                    {periodTypes.map((item, index) => (
                                                        <MDBDropdownItem onClick={()=>{handlePeriodClick(item.name)}}
                                                                         key={index}>
                                                            {item.name}
                                                        </MDBDropdownItem>
                                                    ))}
                                                </MDBDropdownMenu>
                                            </MDBDropdown>
                                        </div>
                                    </MDBCol>

                                    <MDBCol md="6">
                                        {showDropdown ?
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

                            </MDBContainer>

                            <div className="text-center py-4 mt-2">
                                <MDBBtn color="cyan" onClick={handleCompare} className="text-white">
                                    Compare with same time last year
                                    {showLoading ? <div className="spinner-border mx-2 text-white spinner-border-sm" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div> : null}
                                </MDBBtn>
                            </div>

                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBBox> : null}


            { showTable ?
                <Grid item>
                    {ComparisonTable(cols)}
                </Grid> : null }

        </div>
    )
}

export default React.memo(TimePeriods);