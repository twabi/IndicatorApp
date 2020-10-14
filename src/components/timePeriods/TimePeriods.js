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
import {TreeSelect} from "antd";
import Grid from "@material-ui/core/Grid";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import NavBar from "../NavBar";

//authentication for the namis api
const basicAuth = "Basic " + btoa("ahmed:@Ahmed20");

const TimePeriods = (props) => {

    //define a non-changing array of relative time periods, this time and last time
    var relativeTime = [{"these":"THIS_WEEK", "last":"LAST_WEEK"}, {"these":"THIS_MONTH", "last":"LAST_MONTH"},
        {"these":"THIS_BIMONTH", "last":"LAST_BIMONTH"}, {"these":"THIS_QUARTER", "last":"LAST_QUARTER"}, {"these":"QUARTERS_THIS_YEAR", "last":"QUARTERS_LAST_YEAR"}
        ,{"these":"MONTHS_THIS_YEAR", "last":"MONTHS_LAST_YEAR"}, {"these":"THIS_SIX_MONTH", "last":"LAST_SIX_MONTH"}
        ,{"these":"THIS_YEAR", "last":"LAST_YEAR"}, {"these":"THIS_FINANCIAL_YEAR", "last":"LAST_FINANCIAL_YEAR"}];


    var initState = props.indicatorProps;
    var orgs = props.orgProps;


    //define some variables to be used throughout the lifetime of the component
    const [showMenu, setShowMenu] = React.useState(true);
    const [searchValue, setSearchValue] = React.useState("");
    const [indicators, setIndicators] = React.useState(initState);
    const [selectedIndicator, setSelectedIndicator] = React.useState({});
    const [orgValue, setOrgValue] = React.useState([]);
    const [orgUnits, setOrgUnits] = React.useState(orgs);
    const [selectedOrgUnit, setSelectedOrgUnit] = React.useState([]);
    const [cols, setCols] = React.useState([]);
    const [showTable, setShowTable] = React.useState(false);
    const [showLoading, setShowLoading] = React.useState(false);
    const [showDownloading, setShowDownloading] = React.useState(false);
    const [showBtn, setShowBtn] = React.useState(false);
    const [thisPeriod, setThisPeriod] = React.useState("select a period this year");
    const [lastPeriod, setLastPeriod] = React.useState("");
    const [years, setYears] = React.useState([]);

    //useEffect has been used to get the data passed from the parent props after it has loaded
    React.useEffect(() => {
        setIndicators(props.indicatorProps);
        setOrgUnits(props.orgProps);
    }, [props.indicatorProps, props.orgProps, props.periodTypeProps]);


    //the back button on the right side of the component
    const handleButton = () => {

        //check if the page is in table view mode or not
        if(showMenu === true){
            //the table is in menu mode
        } else if(showMenu === false){
            //the table is in table view mode, so when the button is pressed, take them back to the timePeriods menu
            setShowMenu(true);
            setShowTable(false);
            setShowBtn(false);
        }
    };

    //the function that gets the analysis variables and makes an analytics api request for data
    const getComparison = (dxID, pe, ouID,  callBack) => {

        return fetch(`https://cors-anywhere.herokuapp.com/https://www.namis.org/namis1/api/29/analytics.json?dimension=pe:${pe}&dimension=ou:${ouID}&filter=dx:${dxID}&displayProperty=NAME&outputIdScheme=NAME`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Authorization" : basicAuth,
                "Content-type": "application/json",

            }

        }).then((response) => response.json())
            .then((result) => {
                //analysis = result.rows;
                callBack(result);

            }).catch((error) => {
                alert("oops an error occurred: " + error + " .Try reloading your page");

            });
    };

    //when an indicator is clicked
    const handleIndicatorClick = (indicator) => {
        setSearchValue(indicator.displayName);
        setSelectedIndicator(indicator);
    };

    //when the periods dropdown is clicked
    const handlePeriodClick = (value) => {
        setThisPeriod(value.these);
        setLastPeriod(value.last);
    };

    //when the compare button is clicked in the component, start the analysis process
    const handleCompare = () => {

        //check if the period dropdowns haven't been toggles i.e. the user has forgot to chose a time period
        if(thisPeriod === "select a period this year"){
            alert("please select a time period to proceed");
        } else {
            //show the compare button to be loading
            setShowLoading(true);

            //add the periods as one string to be passed into analytics, well that's how the api access multiple periods
            var pe = thisPeriod+";"+lastPeriod;

            //do the same thing with the array of org units
            var units = [];
            selectedOrgUnit.map((item) => {
                units.push(item.id);
            });
            //trigger the comparison functions - to the analytics api function below
            makeComparison(thisPeriod, lastPeriod, selectedIndicator, pe, units.join(";"));
        }

    };

    //when an org unit has been clicked
    const handle = (value) => {
        setOrgValue(value)
    };

    //when an orgUnit has been selected
    const onSelect = (value, node) => {
        //setSelectedOrgUnit(node);
        setSelectedOrgUnit(selectedOrgUnit => [...selectedOrgUnit, node]);

    };

    //the function that starts the analysis process
    const makeComparison = (thisPeriod, lastPeriod, indicator, timePeriod, orgUnit ) => {

        const callback = (result) => {
            if(result == null){
                alert("oops, an error occurred! Try reloading your page");

            }else {
                var columns = [];
                var pe1 = result.metaData.dimensions.pe[0];
                var pe2 = result.metaData.dimensions.pe[1];
                var pes = [result.metaData.items[pe1].name, result.metaData.items[pe2].name];
                setYears(pes);

                pes.map((pe) => {
                    selectedOrgUnit.map((unit)=>{
                        columns.push({"year" : pe, "unit": unit.name});
                    })
                });

                //var value = [];

                if(result.rows == null || result.rows.length === 0){
                    //console.log("this year has no data!");
                    //row.indicatorValue = "-";
                    //value.push({"value" : "-"})

                } else {

                    var i;
                    for(i = 0; i<result.rows.length; i++){
                        //value.push(result.rows[i][1] +" : "+ result.rows[i][2]);
                        var year = result.rows[i][0];
                        var uno = result.rows[i][1];
                        //value.push({"year": result.rows[i][1], "value" : result.rows[i][2]});
                        columns.map((item) => {
                            if(item.year.includes(year)  && item.unit.includes(uno)){
                                item.value = result.rows[i][2];
                            }
                        });
                    }
                }
                columns.map((item) => {
                    if(item.value == null || item.value === ""){
                        item.value = "-";
                    }
                });
                setCols(columns);
            }
        };

        //get the comparison from the async fetch function, then switch the screen into table view mode.
        getComparison(indicator.id, timePeriod, orgUnit, callback)
            .then((r) => {
            })
            .then(() => {
                setShowTable(true);
                setShowLoading(false);
                setShowMenu(false);
                setShowBtn(true);
            });
    };

    //a function to download the analysis table as pdf
    const downloadPDF = (title) => {
        setShowDownloading(true);
        const input = document.getElementById("tableDiv");
        html2canvas(input)
            .then((canvas) => {
                const pdf = new jsPDF();
                pdf.setFontSize(25);
                pdf.autoTable({startY: 20, html: "#tableDiv"});
                pdf.text(title, 50, 15);
                pdf.save(title + ".pdf");
            }).then(() => {
            setShowDownloading(false);
        });
    };

    //handle the search of reports...custom functions changed a bit from stack overflow
    function handleSearch({ target: { value } }) {

        // Set captured value to input
        setSearchValue(value);

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
    };


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
                                    <th>

                                    </th>
                                    {years.map((item, key) => (
                                        <th key={key} >
                                            {item}
                                        </th>

                                    ))}
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {selectedOrgUnit.map((unit, key)=>(

                                    <tr key={key}>
                                        <td>{unit.name}</td>
                                        {years.map((year, index)=>(
                                            <td key={index}>
                                                {columns.map((data, keyIndex)=>(
                                                    <>{data.year === year && data.unit === unit.name ? data.value : null}</>
                                            ))}
                                            </td>

                                        ))}

                                    </tr>
                                ))}


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
    );


    return (
        <div>
            <NavBar/>
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
                                                multiple
                                                placeholder="Please select org units"
                                                onChange={handle}
                                                onSelect={onSelect}
                                            />

                                        </div>

                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className="mt-1">
                                    <MDBCol md="10">
                                        <div className="text-left my-3">
                                            <label className="grey-text ml-2">
                                                <strong>Select Time Period Type for This year</strong>
                                            </label>
                                            <MDBDropdown className=" myDropDown">
                                                <MDBDropdownToggle caret color="primary">
                                                    {thisPeriod}
                                                </MDBDropdownToggle>
                                                <MDBDropdownMenu className="dropdown-menu myDrop"  basic >
                                                    {relativeTime.map((item, index) => (
                                                        <MDBDropdownItem onClick={()=>{handlePeriodClick(item)}}
                                                                         key={index}>
                                                            {item.these}
                                                        </MDBDropdownItem>
                                                    ))}
                                                </MDBDropdownMenu>
                                            </MDBDropdown>
                                        </div>
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
    );
}

export default React.memo(TimePeriods);