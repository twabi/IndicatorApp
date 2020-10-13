import React from 'react';
import { MDBBtn, MDBCard, MDBContainer, MDBRow,
    MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css'
import NavBar from "./NavBar";

const MainContent = (props) => {

    var isLoaded = props.isLoaded;
    var errorMessage = props.errorMessage;

    const [showPeLoading, setShowPeLoading] = React.useState(false);
    const [showAnLoading, setShowAnLoading] = React.useState(false);



    return (

        <div >
            <NavBar/>

            <MDBContainer className="pl-5" id="myDiv">
                {!isLoaded ? <div className="text-center text-primary">
                    <p>Loading essential data, please wait...</p>
                    <div className="spinner-border fast" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div> : <p className="text-center text-danger">{errorMessage}</p>}
                <MDBRow className="my-5 p-2">
                    <MDBCol md="4" className="mx-5 my-2">
                        <MDBCard style={{ width: "22rem" }}>
                            <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg" waves />
                            <MDBCardBody>
                                <MDBCardTitle>Portal DisplayName</MDBCardTitle>
                                <MDBCardText>
                                    Create and edit the portal display names of Indicators
                                </MDBCardText>
                                <MDBBtn href="/displayName" className="text-white" color="primary">GO</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="4" className="mx-5 my-2">
                        <MDBCard style={{ width: "22rem" }}>
                            <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" waves />
                            <MDBCardBody>
                                <MDBCardTitle>Custom Reports</MDBCardTitle>
                                <MDBCardText>
                                    Create and edit your own custom report templates for Namis Indicators
                                </MDBCardText>
                                <MDBBtn color="primary" href="/customReports">Go</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                </MDBRow>

                <MDBRow className="my-5 p-2">
                    <MDBCol md="4" className="mx-5 my-2">
                        <MDBCard style={{ width: "22rem" }}>
                            <MDBCardImage className="img-fluid" style={{ height: '12rem' }} src="https://mdbootstrap.com/img/Photos/Slides/img%20(70).jpg" waves />
                            <MDBCardBody>
                                <MDBCardTitle>Analysis</MDBCardTitle>
                                <MDBCardText>
                                    Using your own custom made report templates, get the analysis
                                    of the indicators in charts and tables.
                                </MDBCardText>
                                <MDBBtn color="primary" href="/analysis">
                                    Go {showAnLoading ? <div className="spinner-border mx-2 text-white spinner-border-sm" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div> : null}
                                </MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="4" className="mx-5 my-2">
                        <MDBCard style={{ width: "22rem" }}>
                            <MDBCardImage  style={{ height: "13rem" }} className="img-fluid w-100" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%28131%29.jpg" waves />
                            <MDBCardBody>
                                <MDBCardTitle>Time Periods</MDBCardTitle>
                                <MDBCardText>
                                    Compare an indicator across two different time periods
                                </MDBCardText>
                                <MDBBtn href="/timePeriods" color="primary">
                                    Go{showPeLoading ? <div className="spinner-border mx-2 text-white spinner-border-sm" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div> : null}
                                </MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                </MDBRow>

            </MDBContainer>

        </div>




    )
}

export default React.memo(MainContent);