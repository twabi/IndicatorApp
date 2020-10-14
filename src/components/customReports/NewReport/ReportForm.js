import React from "react";
import {
    MDBBox,
    MDBCol,
    MDBInput,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBTable,
    MDBTableHead, MDBTableBody, MDBCardFooter, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from 'mdbreact';
import ListTransfer from "../ListTransfer";
import Grid from "@material-ui/core/Grid";
import NavBar from "../../NavBar";

const moment = require('moment')

const basicAuth = 'Basic ' + btoa('ahmed:@Ahmed20');

let now = moment();


var date = now.format("YYYY-MM-DD");
var time = now.format("HH:mm:ss.SSS");

var currentTime = date + "T" + time;

const FormPage = (props) => {

    const [programs, setPrograms] = React.useState([])
    const [rowNumber, setRowNumber] = React.useState(0);
    const [indicatorNumber, setIndicatorNumber] = React.useState(0);
    const [title, setTitle] =  React.useState("");
    const [groups, setGroups] = React.useState([]);
    const [description, setDescription] = React.useState("");
    const [showPreview, setShowPreview] = React.useState(false);
    const [rowHeaders, setRowHeaders] = React.useState([]);
    const [colHeaders, setColHeaders] = React.useState([]);
    const [selectedIndicators, setSelectedIndicators] = React.useState([]);
    const [initIndicators, setInitIndicators] = React.useState([])
    const [cellValues, setCellValues] = React.useState([])

    React.useEffect(() => {
        setPrograms(props.indicatorProps)

    }, [props.arrayProps, props.indicatorProps])


    React.useEffect(()=>{
        var indicators = [];
        groups.map((group) => (
            group.indicators.map((item) => (
                indicators.push(fetchIndicator(item.id))
            )))
        )

        if(!indicators.length == 0){
            setSelectedIndicators(indicators)
            setInitIndicators(indicators)
        }
    }, [groups])


    const postNewReport = (jsonString, id) => {

        fetch(`https://www.namis.org/namis1/api/29/dataStore/customReports/${id}`, {
            method: 'POST',
            body: JSON.stringify(jsonString),
            headers: {
                'Authorization' : basicAuth,
                'Content-type': 'application/json',
            },

            credentials: "include"

        }).then((response) => {
            console.log(response);
            alert("Report created successfully");
        }).then((result) =>{
            handleButton()
        }).catch((error) => {
            alert("oops an error occurred: " + error)
        })


    };


    const fetchIndicator = (id) => {

        var array = {"name" : "", "id" : ""};

        fetch(`https://www.namis.org/namis1/api/indicators/${id}.json?paging=false&fields=id&fields=name`, {
            method: 'GET',
            headers: {
                'Authorization' : basicAuth,
                'Content-type': 'application/json',
            },

            credentials: "include"

        }).then((response) => response.json())
            .then((result) =>{
                array.name = result.name
                array.id = result.id

        }).catch((error) => {
            //alert("oops an error occurred: " + error)
        })

        return array;

    };

    const handleButton = () => {
        window.location.href="/customReports";
    }

    const handleRowNumber = ({ target: { value } }) => {
        setRowNumber(value);

        var numbers = []
        for(var i=0; i<value; i++){
            numbers.push({"name":"row header", "id":"rowheader"+i+"", });
        }

        setRowHeaders(numbers);

    }

    const handleReportName = ({target : {value}}) => {
        setTitle(value);
    }

    const handleIndicatorNumber = ({target : {value}}) => {
        setIndicatorNumber(value);
        var array =[];
        for(var i=0; i<value; i++){
            array.push({"name":"Col Header", "id" : "colheader"+i+"",});
        }

        setColHeaders(array)
    }

    const handleReportDesc = ({target : {value}}) => {
        setDescription(value)
    }

    const showPreviewTable = () => {

        setShowPreview(true);

    }

    const getRightArray = (data) => {
        setGroups(data);
        //console.log(data);

    }

    const editProgramNames = (program) => {
        var newName = prompt("enter new cell name");
        var tableCell = document.getElementById(program.id);

        if (newName == null || newName === "") {
            //console.log(dataTables)

        } else {
            tableCell.innerHTML = newName;
            program.name = newName;
        }
    }

    const editCropNames = (program) => {
        var newName = prompt("enter new cell name");
        var tableCell = document.getElementById(program.id);


        if (newName == null || newName === "") {

            //console.log(dataTables)

        } else {
            tableCell.innerHTML = newName;
            program.name = newName
        }
    }



    function chunkArray(arr,n){
        var chunkLength = Math.max(arr.length/n ,1);
        var chunks = [];
        for (var i = 0; i < n; i++) {
            if(chunkLength*(i+1)<=arr.length)chunks.push(arr.slice(chunkLength*i, chunkLength*(i+1)));
        }
        return chunks;
    }

    var reA = /[^a-zA-Z]/g;
    var reN = /[^0-9]/g;

    function sortAlphaNum(a, b) {
        var aA = a.id.replace(reA, "");
        var bA = b.id.replace(reA, "");
        if (aA === bA) {
            var aN = parseInt(a.id.replace(reN, ""), 10);
            var bN = parseInt(b.id.replace(reN, ""), 10);
            return aN === bN ? 0 : aN > bN ? 1 : -1;
        } else {
            return aA > bA ? 1 : -1;
        }
    }


    const handleSubmit = () => {

        console.log(colHeaders);
        console.log(rowHeaders);
        console.log(cellValues);

        var arrayOfData = []


        var itemsObj = {};
        var itemsList = [];

        for (var i = 0; i < cellValues.length; i++) {
            var item = cellValues[i];
            if (!itemsObj[item.id]) {
                itemsObj[item.id] = item;
                console.log(itemsObj[item.id])
                itemsList.push(item);
            } else{
                var index = itemsList.indexOf(itemsObj[item.id])
                console.log(index);
                //delete itemsList[index]
                itemsList.splice(index, 1);
                //console.log(itemsList.slice(itemsObj[item.id]))
                itemsObj[item.id] = item;
                itemsList.push(item);
                console.log(itemsList)
            }
        }

        itemsList.map((item) => {
            console.log(document.getElementById(item.id).value);
            arrayOfData.push(
                {"id":item.id, "indicatorID":item.indicator.id, "indicatorName":document.getElementById(item.id).value})
        })


        var sortedArray = arrayOfData.sort(sortAlphaNum);
        var rowArrays = chunkArray(sortedArray, rowHeaders.length);

        var rowdata = []
        rowHeaders.map((row, index) =>{
            rowdata.push({"rowDetails" : row, "rowData": rowArrays[index]})
        })

        console.log(rowdata);



        if((groups.length === 0) || (rowNumber === 0) || (title === "") || indicatorNumber === 0){
            alert("some fields have been left empty. Please fill them up")
        } else {

            var id = title + "-" + currentTime;
            var payload = {
                "id": id,
                "title": title,
                "description": description,
                "rows": rowNumber,
                "columns": indicatorNumber,
                "columnHeaders": colHeaders,
                "cellData" : rowdata,
            }

            console.log(JSON.stringify(payload));
            postNewReport(payload, id);

        }


    }

    const handleItemClick = (indicator, id) => {

        var sear = document.getElementById(id);
        sear.value = indicator.name;
        setSelectedIndicators(initIndicators);
        selectedIndicators.splice(selectedIndicators.indexOf(indicator), 1)

        //setSelectedIndicators(newArray);

        var cell = {"id" : id, "indicator" : indicator}
        //console.log(cellValues.includes(x => x.id === id))
        console.log(cellValues.includes(id))

        setCellValues(cellValues => [...cellValues, cell]);


    }

    const handleChange = (id) => {
        var input = document.getElementById(id)
        var searchValue = input.value;
        console.log(searchValue);

        handleSearch(searchValue, id);
    }

    function handleSearch(value, id) {

        var input = document.getElementById(id)
        input.value = value;

        // Set captured value to input
        //setInput(value)

        // Variable to hold the original version of the list
        let currentList = [];
        // Variable to hold the filtered list before putting into state
        let newList = [];

        // If the search bar isn't empty
        if (value !== "") {
            // Assign the original list to currentList
            currentList = initIndicators;

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
            newList = selectedIndicators;
        }


        // Set the filtered state based on what our rules added to newList
        setSelectedIndicators(newList);
    }

    const ReportPreview = (programList, cropList, indicatorList) => (
        <MDBCard >
            <MDBCardHeader tag="h5" className="text-center font-weight-bold text-uppercase py-4">
                Report Preview
            </MDBCardHeader>

            <MDBCardBody style={{padding: 10}}>
                <MDBTable id="tableId" striped bordered responsive>
                    <MDBTableHead>
                        <tr>
                            {programList.map((item, key) => (
                                <th key={key} >
                                    <div id={item.id}>
                                        {item.name}
                                    </div>
                                    <MDBBtn onClick={() => editProgramNames(item)}
                                            color="primary">edit</MDBBtn>
                                </th>

                            ))}

                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {cropList.map((row, key) => (
                            <tr key={key} >
                                <td key={key}>
                                    <div id={row.id}>
                                        {row.name}
                                    </div>
                                    <MDBBtn onClick={() => editCropNames(row)}
                                            color="primary">edit</MDBBtn>
                                </td>

                                {programList.slice(1, programList.length).map((item, int) => (
                                    <td key={int}>

                                        <MDBDropdown key={int} className="myDropDown">
                                            <MDBDropdownToggle  caret color="primary">
                                                <input id={"cell" +key+"-"+int} className="form-control myDropDown"
                                                       type="text"
                                                       placeholder="insert indicator"
                                                       onChange={()=>{handleChange("cell" +key+"-"+int)}}
                                                       aria-label="Search" />
                                            </MDBDropdownToggle>
                                            <MDBDropdownMenu className="dropdown-menu myDrop"  basic >

                                                {indicatorList.map((indicator, index) => (

                                                    <MDBDropdownItem key={index} onClick={()=>handleItemClick(indicator, "cell" +key+"-"+int)}>
                                                        {indicator.name}
                                                    </MDBDropdownItem>
                                                ))}
                                            </MDBDropdownMenu>
                                        </MDBDropdown>


                                    </td>
                                ))}

                            </tr>)
                        )}
                    </MDBTableBody>
                </MDBTable>
            </MDBCardBody>
            <MDBCardFooter>
                <Grid container justify="center" alignItems="center" style={{margin: 10}}>
                    <MDBBtn onClick={handleSubmit}
                            color="primary">Create</MDBBtn>

                </Grid>
            </MDBCardFooter>

        </MDBCard>
    )

    return (
        <div>
            <NavBar/>
                    <hr className='hr-light' />

                    <MDBBox display="flex" justifyContent="center" >
                        <MDBCol className="mb-5" md="10">
                            <MDBCard>
                                <MDBCardBody>
                                    <form>
                                        <p className="h4 text-center py-4">Create Report</p>
                                        <div className="grey-text">
                                            <MDBInput
                                                label="enter report title"
                                                icon="user"
                                                group
                                                type="text"
                                                value={title}
                                                validate
                                                onChange={e => handleReportName(e)}
                                                error="wrong"
                                                success="right"
                                            />

                                            <MDBInput
                                                label="enter report description"
                                                icon="user"
                                                group
                                                type="text"
                                                value={description}
                                                validate
                                                onChange={e => handleReportDesc(e)}
                                                error="wrong"
                                                success="right"
                                            />

                                            <MDBInput
                                                label="enter number of columns (number of indicators)"
                                                icon="exclamation-triangle"
                                                group
                                                type="number"
                                                value={indicatorNumber}
                                                onChange={(e) => handleIndicatorNumber(e)}
                                                validate
                                                error="wrong"
                                                success="right"
                                            />

                                            <MDBInput
                                                label="enter number of rows (number of crops to be on report)"
                                                icon="envelope"
                                                group
                                                type="number"
                                                validate
                                                value={rowNumber}
                                                onChange={(e) => handleRowNumber(e)}
                                                error="wrong"
                                                success="right"
                                            />

                                            <div className="mt-5">
                                                <p className="text-center">Select indicator groups to be on the report</p>
                                                <ListTransfer getRightArray={getRightArray} indicatorArray={programs}/>
                                            </div>
                                        </div>
                                        <div className="text-center py-4 mt-5">
                                            <MDBBtn color="cyan" className="text-white" onClick={showPreviewTable}>
                                                Preview
                                            </MDBBtn>
                                        </div>
                                    </form>
                                </MDBCardBody>
                            </MDBCard>

                            {showPreview ? <MDBCard className="mt-2">
                                <Grid item>
                                    {ReportPreview(colHeaders, rowHeaders, selectedIndicators)}
                                </Grid>
                            </MDBCard>: null}
                        </MDBCol>
                    </MDBBox>


        </div>


    );
};

export default FormPage;