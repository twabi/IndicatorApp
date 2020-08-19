import React from "react";
import {MDBBox, MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBRow} from "mdbreact";



const basicAuth = 'Basic ' + btoa('ahmed:@Ahmed20');

const EditForm = (props) => {

    console.log(props.reportProps);
    var initArray = [...props.reportProps];

    const [reports, setReports] = React.useState([]);
    //setReports([...initArray]);
    React.useEffect(()=>{

        setReports([...props.reportProps])


    }, [props.reportProps])


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
            <MDBBtn color="cyan" onClick={handleButton}
                    className="text-white float-lg-right mr-5" type="submit">
                Back
            </MDBBtn>

            <hr className='hr-light' />

            <MDBBox className="ml-5" display="flex" justifyContent="center" >
                <MDBRow>

                    {reports.slice(0, (reports.length/4)).map((report, index) => (


                                <MDBCard key={index} className="m-4" style={{ width: "22rem" }}>
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
            </MDBBox>
        </div>
    )

}

export default EditForm;