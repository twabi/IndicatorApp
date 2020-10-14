import React from "react";
import {
    MDBBox,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCardTitle,
    MDBRow
} from "mdbreact";
import ShowForm from "./ShowEditForm";
import NavBar from "../../NavBar";



const basicAuth = 'Basic ' + btoa('ahmed:@Ahmed20');

const EditForm = (props) => {

    const [reports, setReports] = React.useState([]);
    const [showEditMenu, setShowEditMenu] = React.useState(true);
    const [showEditForm, setShowEditForm] =React.useState(false);
    const [crops, setCrops] = React.useState([]);
    const [programs, setPrograms] = React.useState([])
    const [reportValue, setReportValue] = React.useState({})

    React.useEffect(() => {

        setReports(props.reportProps)
        setPrograms(props.indicatorProps)
        setCrops(props.arrayProps);


    }, [props.arrayProps, props.indicatorProps, props.reportProps])


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
            .then((result) =>{
            window.location.reload(false);
        }).catch((error) => {
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
        <div>
            <NavBar/>
            <div className="ml-5">

                <hr className='hr-light' />

                {showEditMenu ? <MDBBox className="ml-5 d-flex flex-column" display="flex" justifyContent="center" >
                    <h4 className="text-primary text-center my-3 font-weight-bold">Edit Existing Reports</h4>
                    <MDBRow>

                        {reports.map((report, index) => (


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
        </div>

    )

}

export default EditForm;