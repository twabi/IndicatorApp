import React from "react";
import {MDBBox, MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBInput, MDBRow} from "mdbreact";
import CustomTransferList from "./CustomTransferList";
import ListTransfer from "./ListTransfer";
import ShowForm from "./showForm";
import ReportForm from "./ReportForm";



const basicAuth = 'Basic ' + btoa('ahmed:@Ahmed20');

const EditForm = (props) => {

    console.log(props.reportProps);

    const [reports, setReports] = React.useState([]);
    const [showEditMenu, setShowEditMenu] = React.useState(true);
    const [showEditForm, setShowEditForm] =React.useState(false);
    const [crops, setCrops] = React.useState([]);
    const [programs, setPrograms] = React.useState([])
    const [reportValue, setReportValue] = React.useState({})

    //setReports([...initArray]);
    React.useEffect(()=>{

        setReports(props.reportProps)
        setPrograms(props.indicatorProps)
        setCrops(props.arrayProps);


    }, [props.arrayProps, props.indicatorProps, props.reportProps])


    const handleButton = () => {
        props.buttonCallback();
    }

    const deleteReport = (key) => {

        fetch(`https://www.namis.org/namis1/api/29/dataStore/customReports/${key}`, {
            method: 'DELETE',
            headers: {
                'Authorization' : basicAuth,
                'Content-type': 'application/json',
            },
            credentials: "include"

        })
            .then(response => response.json())
            .then((result) => {
                console.log(result);
                alert("Report was deleted successfully");
            })
            .then(result =>{
            window.location.reload(false);
        }).catch(error => {
            alert("oops an error occurred: " + error)
        })
    }

    const handleEdit = (value) => {
        setReportValue(value)

        setShowEditMenu(false);
        setShowEditForm(true);

    }

    const handleCallback = () => {
        setShowEditMenu(true);
        setShowEditForm(false);
    }

    const handleDelete = (value) => {

        if (window.confirm("Are you sure you want to delete the report?")) {
            deleteReport(value.id);
        } else {
            console.log("cancelled");
        }
    }


    return (
        <div className="ml-5">

            <MDBBtn color="cyan" onClick={handleButton}
                    className="text-white float-lg-right mr-2" type="submit">
                Back to Menu
            </MDBBtn>

            <hr className='hr-light' />

        {showEditMenu ?<MDBBox className="ml-5" display="flex" justifyContent="center" >
                <MDBRow>

                    {reports.slice(0, (reports.length/2)).map((report, index) => (


                                <MDBCard key={index} className="m-4" style={{ width: "19rem" }}>
                                    <MDBCardBody>
                                        <MDBCardTitle>{report.title}</MDBCardTitle>
                                        <MDBCardText>
                                            {report.description}
                                        </MDBCardText>
                                        <MDBBtn className="text-white" onClick={()=>{handleEdit(report)}} color="primary">
                                            edit
                                        </MDBBtn>
                                        <MDBBtn className="text-white" onClick={()=>{handleDelete(report)}} color="primary">
                                            delete
                                        </MDBBtn>
                                    </MDBCardBody>
                                </MDBCard>

                    ))}

                </MDBRow>
            </MDBBox> : null}

            { showEditForm ? <ShowForm arrayProps={crops}
                                       reportValue={reportValue}
                                       buttonCallback={handleCallback}
                                       indicatorProps={programs}/> : null}
        </div>
    )

}

export default EditForm;