import React from "react";
import {
    MDBBox,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCardTitle,
    MDBCol,
    MDBContainer, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle,
    MDBRow
} from "mdbreact";

const TimePeriods = (props) => {

    var array3 = [];
    for(var i=0; i<54; i++){
        array3.push(i.toString())
    }
    var weekNumbers = array3;

    var initState = props.indicatorProps;
    var periods = props.periodTypeProps;

    const [showMenu, setShowMenu] = React.useState(true);
    const [searchValue, setSearchValue] = React.useState("");
    const [indicators, setIndicators] = React.useState(initState);
    const [selectedIndicator, setSelectedIndicator] = React.useState({});
    const [periodTypes, setPeriodTypes] = React.useState(periods);
    const [periodNumber, setPeriodNumber] = React.useState([])
    const [numberTitle, setNumberTitle] = React.useState("NaN")
    const [fixPeriodType, setFixPeriodType] = React.useState("period Type");
    const [selectedFixedtime, setSelectedFixedtime] = React.useState("")

    React.useEffect(()=>{
        setIndicators(props.indicatorProps);
        setPeriodTypes(props.periodTypeProps);
    }, [props.indicatorProps, props.periodTypeProps])


    const handleButton = () => {
       props.btnCallback();
    }

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

        } else if (value === "FinancialApril"){
            setSelectedFixedtime("April")
            setNumberTitle("");
            setPeriodNumber([])

        }else if (value === "FinancialJuly"){
            setSelectedFixedtime("July")
            setNumberTitle("");
            setPeriodNumber([])
        }
        else if (value === "FinancialOct"){
            setSelectedFixedtime("Oct")
            setNumberTitle("");
            setPeriodNumber([])
        }
    }

    const handlePeriodNumber = (value) => {
        setNumberTitle(value)
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

    return (
        <div>
            <MDBBtn color="cyan"
                    onClick={handleButton}
                    className="text-white float-lg-right mr-2" type="submit">
                Back
            </MDBBtn>

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
                                    <MDBCol md="12">

                                        <div className="text-left my-3">
                                            <label className="grey-text ml-2">
                                                <strong>Select preferred indicator</strong>
                                            </label>
                                            <MDBDropdown className=" myDropDown">
                                                <MDBDropdownToggle caret color="primary">
                                                    <input className="form-control"
                                                           value={searchValue}
                                                           style={{width:"28rem"}}
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
                                </MDBRow>
                                <MDBRow>
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

                                </MDBRow>
                                <MDBRow>
                                    <MDBCol md="6">
                                    </MDBCol>
                                    <MDBCol md="6">
                                    </MDBCol>
                                </MDBRow>


                            </MDBContainer>

                            <div className="text-center py-4 mt-2">
                                <MDBBtn color="cyan" className="text-white">
                                    Compare with same time last year
                                </MDBBtn>
                            </div>

                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBBox> : null}

        </div>
    )
}

export default React.memo(TimePeriods);