import React from "react";
import {
    MDBBox,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBTable,
    MDBTableHead, MDBTableBody, MDBCardFooter
} from 'mdbreact';
import { MDBCardImage, MDBCardTitle, MDBCardText, MDBIcon } from 'mdbreact';
import ListTransfer from "./ListTransfer";
import CustomTransferList from "./CustomTransferList";
import {resolveToLocation} from "react-router-dom/modules/utils/locationUtils";
import Grid from "@material-ui/core/Grid";

const moment = require('moment')

const basicAuth = 'Basic ' + btoa('ahmed:@Ahmed20');

let now = moment();


var date = now.format("YYYY-MM-DD");
var time = now.format("HH:mm:ss.SSS");

var currentTime = date + "T" + time;

const FormPage = (props) => {

    const [crops, setCrops] = React.useState([]);
    const [programs, setPrograms] = React.useState([])
    const [cropNumber, setCropNumber] = React.useState(0);
    const [indicatorNumber, setIndicatorNumber] = React.useState(0);
    const [title, setTitle] =  React.useState("");
    const [showTextFields, setShowTextFields] = React.useState(false);
    const [textfields, settextfields] = React.useState([]);
    const [groups, setGroups] = React.useState([]);
    const [selectedCrops, setSelectedCrops] = React.useState([])
    const [description, setDescription] = React.useState("");
    const [showPreview, setShowPreview] = React.useState(false);
    const [groupTitles, setGroupTitles] = React.useState([]);
    const [cropTitle, setCropTitle] = React.useState("Crops");

    React.useEffect(() => {
        setPrograms(props.indicatorProps)
        setCrops(props.arrayProps);

    }, [props.arrayProps, props.indicatorProps])


    const postNewReport = (jsonString, id) => {

        fetch(`https://www.namis.org/namis1/api/29/dataStore/customReports/${id}`, {
            method: 'POST',
            body: JSON.stringify(jsonString),
            headers: {
                'Authorization' : basicAuth,
                'Content-type': 'application/json',
            },

            credentials: "include"

        }).then(response => {
            console.log(response);
            alert("Report created successfully");
        }).then(result =>{
            handleButton()
        }).catch(error => {
            alert("oops an error occurred: " + error)
        })

    };

    const handleButton = () => {
        props.buttonCallback();
    }

    const handleCropNumber = ({ target: { value } }) => {
        setCropNumber(value);
        console.log(value);
        setShowTextFields(true);

        var numbers = []
        for(var i=0; i<value; i++){
            numbers.push(i);
        }

        settextfields(numbers)

    }

    const handleReportName = ({target : {value}}) => {
        setTitle(value);
    }

    const handleIndicatorNumber = ({target : {value}}) => {
        setIndicatorNumber(value);
    }

    const handleReportDesc = ({target : {value}}) => {
        setDescription(value)
    }

    const showPreviewTable = () => {

        setShowPreview(true);

    }


    const getRightCropArray = (data) => {
        setSelectedCrops(data);
    }

    const getRightArray = (data) => {
        setGroups(data);
    }

    function reloadPage() {
        window.location.reload(false);
    }

    const editProgramNames = (program) => {
        var newName = prompt("enter new cell name");
        var tableCell = document.getElementById(program.displayName);

        if (newName == null || newName === "") {
            //console.log(dataTables)

        } else {
            console.log(program.displayName+ "-" + newName);
            tableCell.innerHTML = newName;
            program.displayName = newName;
        }
    }

    const editCropNames = (program) => {
        var newName = prompt("enter new cell name");
        var tableCell = document.getElementById(program);


        if (newName == null || newName === "") {

            //console.log(dataTables)

        } else {
            console.log(program+ "-" + newName);
            tableCell.innerHTML = newName;
            setCropTitle(newName);
        }
    }


    const handleSubmit = () => {


        if((groups.length === 0) || (crops.length === 0) || (title === "") || indicatorNumber === 0){
            alert("some fields have been left empty. Please fill them up")
        } else {

            if (((indicatorNumber > groups.length) || (indicatorNumber < groups.length))) {

                alert("you've selected more or less indicator groups than the columns indicated! \n " +
                    "please make sure your column number equals the number of selected indicator groups")

            } else if (((cropNumber > selectedCrops.length) || (cropNumber < selectedCrops.length))) {

                alert("you've selected more or less crops than the rows indicated! \n " +
                    "please make sure your row number equals the number of selected crops")
            } else {

                var id = title + "-" + currentTime;
                var payload = {
                    "id": id,
                    "title": title,
                    "description": description,
                    "rows": cropNumber,
                    "columns": indicatorNumber,
                    "programGroups": groups,
                    "crops": selectedCrops,
                    "cropTitle" : cropTitle,
                }

                console.log(JSON.stringify(payload));
                postNewReport(payload, id);

            }

        }
    }

    const ReportPreview = (programList, cropList) => (
        <MDBCard >
            <MDBCardHeader tag="h5" className="text-center font-weight-bold text-uppercase py-4">
                Report Preview
            </MDBCardHeader>

            <MDBCardBody style={{padding: 10}}>
                <MDBTable striped bordered responsive>
                    <MDBTableHead>
                        <tr>
                            <th >
                                <div id="cropHeader">
                                    Crops
                                </div>
                                <MDBBtn color="primary" onClick={() => editCropNames("cropHeader")}>
                                    edit
                                </MDBBtn>
                            </th>
                            {programList.map((item, key) => (
                                <th key={key} >
                                    <div id={item.displayName}>
                                        {item.displayName}
                                    </div>
                                    <MDBBtn onClick={() => editProgramNames(item)}
                                            color="primary">edit</MDBBtn>
                                </th>

                            ))}

                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {cropList.map((row, key) => (
                            <tr key={key} id={key}>
                                <td key={key}>
                                    <div id={row}>
                                        {row}
                                    </div>
                                </td>
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
                    <MDBBtn color="cyan"
                            onClick={handleButton}
                            className="text-white float-lg-right mr-5" type="submit">
                        Back
                    </MDBBtn>

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
                                                <p className="text-center">Select crops to be on the report</p>
                                                <CustomTransferList getCrops={getRightCropArray} array={crops}/>
                                            </div>

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
                                    {ReportPreview(groups, selectedCrops)}
                                </Grid>
                            </MDBCard>: null}
                        </MDBCol>
                    </MDBBox>


        </div>


    );
};

export default FormPage;