import React from 'react';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCardTitle,
    MDBCol,
    MDBContainer,
    MDBRow
} from "mdbreact";
import 'mdbreact/dist/css/mdb.css'
import NavBar from "../NavBar";


function BoxComponent() {

    return (
        <div>
            <NavBar/>
             <MDBContainer id="myDiv" className="d-flex flex-column mt-5 justify-content-center">
                <h4 className="text-primary text-center my-3 mb-5 font-weight-bold">Custom Reports</h4>
                <MDBRow className="mt-3">
                    <MDBCol md="6">
                        <MDBCard style={{ width: "23rem" }}>
                            <MDBCardBody>
                                <MDBCardTitle>New Report</MDBCardTitle>
                                <MDBCardText>
                                    Create a new custom report template
                                </MDBCardText>
                                <MDBBtn className="text-white" href="/customReports/newReport" color="primary">
                                    Go
                                </MDBBtn>
                            </MDBCardBody>
                        </MDBCard></MDBCol>

                    <MDBCol md="6"><MDBCard style={{ width: "23rem" }}>
                        <MDBCardBody>
                            <MDBCardTitle>Edit Report</MDBCardTitle>
                            <MDBCardText>
                                Edit or delete an existing report template
                            </MDBCardText>
                            <MDBBtn color="primary" href="/customReports/editReport">Go</MDBBtn>
                        </MDBCardBody>
                    </MDBCard></MDBCol>

                </MDBRow>
            </MDBContainer>

        </div>


    );
}

export default React.memo(BoxComponent);