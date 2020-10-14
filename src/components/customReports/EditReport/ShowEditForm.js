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
    MDBTableHead, MDBTableBody, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBCardFooter
} from "mdbreact";
import ListTransfer from "../ListTransfer";
import Grid from "@material-ui/core/Grid";
import NavBar from "../../NavBar";

const moment = require("moment");

const basicAuth = "Basic " + btoa("ahmed:@Ahmed20");

let now = moment();


var date = now.format("YYYY-MM-DD");
var time = now.format("HH:mm:ss.SSS");

var currentTime = date + "T" + time;

const ShowForm = (props) => {

    const [programs, setPrograms] = React.useState([]);
    const [cropNumber, setCropNumber] = React.useState(0);
    const [indicatorNumber, setIndicatorNumber] = React.useState(0);
    const [title, setTitle] =  React.useState("");
    const [groups, setGroups] = React.useState([]);
    const [report, setReport] = React.useState({});
    const [description, setDescription] = React.useState("");
    const [showPreview, setShowPreview] = React.useState(false);
    const [selectedIndicators, setSelectedIndicators] = React.useState([]);
    const [colHeaders, setColHeaders] = React.useState([]);
    const [cellData, setCellData] = React.useState([]);

    React.useEffect(() => {

        setPrograms(props.indicatorProps);
        setReport(props.reportValue);
        setColHeaders(props.reportValue.columnHeaders);
        setCellData(props.reportValue.cellData);
        setTitle(props.reportValue.title);
        setIndicatorNumber(props.reportValue.columns);
        setCropNumber(props.reportValue.rows);
        setDescription(props.reportValue.description);

    }, [props.indicatorProps, props.reportValue]);

    const handleButton = () => {
        props.buttonCallback();
    }

    const editExistingReport = (jsonString, id) => {

        fetch(`https://www.namis.org/namis1/api/29/dataStore/customReports/${id}`, {
            method: "PUT",
            body: JSON.stringify(jsonString),
            headers: {
                "Authorization" : basicAuth,
                "Content-type": "application/json",
            },

            credentials: "include"

        }).then((response) => {
            alert("Report edited successfully");
        }).then((result) => {
            handleButton()
        }).catch((error) => {
            alert("oops an error occurred: " + error);
        })

    };

    const fetchIndicator = (id) => {

        var array = {"name" : "", "id" : ""};

        fetch(`https://www.namis.org/namis1/api/indicators/${id}.json?paging=false&fields=id&fields=name`, {
            method: "GET",
            headers: {
                "Authorization" : basicAuth,
                "Content-type": "application/json",
            },
            credentials: "include"

        }).then((response) => response.json())
            .then((result) => {
                //array.push(result);
                array.name = result.name;
                array.id = result.id;

            }).catch((error) => {
            //alert("oops an error occurred: " + error)
        });

        return array;

    };

    React.useEffect(() => {
        var indicators = [];
        groups.map((group) => (
            group.indicators.map((item) => (
                indicators.push(fetchIndicator(item.id))
            )))
        );

        if(indicators.length !== 0){
            setSelectedIndicators(indicators);
        }
    }, [groups])


    const handleCropNumber = ({ target: { value } }) => {
        setCropNumber(value);
    };

    const handleReportName = ({target : {value}}) => {
        setTitle(value);
    };

    const handleIndicatorNumber = ({target : {value}}) => {
        setIndicatorNumber(value);
    };

    const handleReportDesc = ({target : {value}}) => {
        setDescription(value);
    };

    const getRightArray = (data) => {
        setGroups(data);
    };

    const handleSubmit = () => {

        if((groups.length === 0) || (title === "") || indicatorNumber === 0){
            alert("some fields have been left empty. Please fill them up");
        } else {

            var id = title + "-" + currentTime;
            var payload = {
                "id": id,
                "title": title,
                "description": description,
                "rows": cropNumber,
                "columns": indicatorNumber,
                "columnHeaders": colHeaders,
                "cellData" : cellData,
            };

            editExistingReport(payload, report.id);

        }

    };

    const editRowNames = (index) => {
        var newName = prompt("enter new cell name");

        if (newName == null || newName === "") {
            //console.log(dataTables)
        } else {
            //tableCell.innerHTML = newName;
            report.cellData[index].rowDetails.name = newName;
        }
    };

    const editColumnNames = (index) => {
        var newName = prompt("enter new cell name");

        if (newName == null || newName === "") {
            //console.log(dataTables)
        } else {
            //tableCell.innerHTML = newName;
            report.columnHeaders[index].name = newName;
        }
    };

    const handleItemClick = (indicator, id, index1, index2) => {
        //console.log(indicator.name)
        report.cellData[index1].rowData[index2].indicatorID = indicator.id;
        report.cellData[index1].rowData[index2].indicatorName = indicator.name;
        //console.log(report);
    };

    const showTable = () => {
        setShowPreview(true);
    };

    const ReportPreview = () => (
        <MDBCard >
            <MDBCardHeader tag="h5" className="text-center font-weight-bold text-uppercase py-4">
                {title}
            </MDBCardHeader>

            <MDBCardBody style={{padding: 10}}>
                <MDBTable id="tableId" striped bordered responsive>
                    <MDBTableHead>
                        <tr>
                            {report.columnHeaders.map((item, key) => (
                                <th key={key} >
                                    <div id={item.id}>
                                        {item.name}
                                    </div>
                                    <MDBBtn color="primary" onClick={()=>{editColumnNames(key)}}>edit</MDBBtn>
                                </th>

                            ))}

                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {report.cellData.map((row, key) => (
                            <tr key={key} >
                                <td key={key}>
                                    <div id={row.id}>
                                        {row.rowDetails.name}
                                    </div>
                                    <MDBBtn color="primary" onClick={()=>{editRowNames(key)}}>edit</MDBBtn>
                                </td>

                                {row.rowData.map((item, int) => (
                                    <td key={int}>

                                        <MDBDropdown key={int} className="myDropDown">
                                            <MDBDropdownToggle  caret color="primary">
                                                <input id={item.id} className="form-control myDropDown"
                                                       type="text"
                                                       placeholder="insert indicator"
                                                       value={item.indicatorName}
                                                       aria-label="Search" />
                                            </MDBDropdownToggle>
                                            <MDBDropdownMenu className="dropdown-menu myDrop"  basic >

                                                {selectedIndicators.map((indicator, index) => (

                                                    <MDBDropdownItem key={index} onClick={()=>{handleItemClick(indicator, item.id, key, int)}}>
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
                            color="primary">Save</MDBBtn>

                </Grid>
            </MDBCardFooter>

        </MDBCard>
    );

    return (
        <div>
            <NavBar/>
            <MDBBtn color="cyan"
                    onClick={handleButton}
                    className="text-white float-lg-right mr-2" type="submit">
                Back
            </MDBBtn>

            <hr className='hr-light' />

            <MDBBox display="flex" justifyContent="center" >
                <MDBCol className="mb-5" md="15">
                    <MDBCard>
                        <MDBCardBody>
                            <form>
                                <p className="h4 text-center py-4">Edit Report</p>
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
                                        type="textarea"
                                        value={description}
                                        validate
                                        onChange={e => handleReportDesc(e)}
                                        error="wrong"
                                        success="right"
                                        background
                                    />

                                    <MDBInput
                                        label="enter number of columns (number of indicators)"
                                        icon="exclamation-triangle"
                                        group
                                        type="number"
                                        value={indicatorNumber}
                                        onChange={e => handleIndicatorNumber(e)}
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
                                        value={cropNumber}
                                        onChange={e => handleCropNumber(e)}
                                        error="wrong"
                                        success="right"
                                    />

                                    <div className="mt-5">
                                        <p className="text-center">Select new indicator groups that you want to include in the report</p>
                                        <ListTransfer getRightArray={getRightArray}  indicatorArray={programs}/>
                                    </div>
                                </div>
                                <div className="text-center py-4 mt-5">
                                    <MDBBtn color="cyan" className="text-white" onClick={showTable}>
                                        Preview
                                    </MDBBtn>

                                    <MDBBtn color="cyan" className="text-white" onClick={handleButton}>
                                        Cancel
                                    </MDBBtn>
                                </div>
                            </form>
                        </MDBCardBody>
                    </MDBCard>

                    {showPreview ? <MDBCard className="mt-2">
                        <Grid item>
                            <ReportPreview/>
                        </Grid>
                    </MDBCard>: null}

                </MDBCol>
            </MDBBox>


        </div>


    );
};

export default ShowForm;