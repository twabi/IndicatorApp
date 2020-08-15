import React from 'react';
import { MDBBtn, MDBCard, MDBContainer, MDBRow,
    MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css'
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import TransferList from "./TransferList";
import Sidebar from "./SideBar";
import CenterContent from "./CenterContent";
import BoxComponent from "./BoxComponent";
import App from "../App";

const MainContent = (props) => {

    var indicatorArray = props.headerProps;
    var isLoaded = props.isLoaded;
    var errorMessage = props.errorMessage;
    var cropOptions = props.cropOptions;

    var container = document.getElementById("myDiv");

    const [indicators, setIndicators] = React.useState([...indicatorArray]);
    const [loaded, setLoaded] = React.useState(isLoaded);
    const [errorText, setErrorText] = React.useState(errorMessage);
    const [crops, setCrops] = React.useState([...cropOptions]);
    const [showDisplayName, setshowDisplayName] = React.useState(false);
    const [showCustom, setCustom] = React.useState(false);

    React.useEffect(() => {
        setLoaded(isLoaded);
        setCrops([...cropOptions]);
        setIndicators([...indicatorArray]);
        setErrorText(errorMessage)
    }, [isLoaded, cropOptions, indicatorArray, errorMessage]);


    const gotoDisplayName = () => {
        container.innerHTML = "";
        setshowDisplayName(true);
    }

    const gotoCustomReports = () => {
        container.innerHTML = "";
        setCustom(true);
    }


    return (

        <div >

            <MDBContainer className="pl-5" id="myDiv">
                <MDBRow className="my-5 p-2">
                    <MDBCol md="4" className="mx-5">
                        <MDBCard style={{ width: "22rem" }}>
                            <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg" waves />
                            <MDBCardBody>
                                <MDBCardTitle>Portal DisplayName</MDBCardTitle>
                                <MDBCardText>
                                    Create and edit the portal display names of Indicators
                                </MDBCardText>
                                <MDBBtn onClick={gotoDisplayName} className="text-white" color="primary">GO</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="4" className="mx-5">
                        <MDBCard style={{ width: "22rem" }}>
                            <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" waves />
                            <MDBCardBody>
                                <MDBCardTitle>Custom Reports</MDBCardTitle>
                                <MDBCardText>
                                    Create and edit your own custom report templates for Namis Indicators
                                </MDBCardText>
                                <MDBBtn color="primary" onClick={gotoCustomReports}>Go</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                </MDBRow>

                <MDBRow className="my-5 p-2">
                    <MDBCol md="4" className="mx-5">
                        <MDBCard style={{ width: "22rem" }}>
                            <MDBCardImage className="img-fluid" style={{ height: '12rem' }} src="https://mdbootstrap.com/img/Photos/Slides/img%20(70).jpg" waves />
                            <MDBCardBody>
                                <MDBCardTitle>Analysis</MDBCardTitle>
                                <MDBCardText>
                                    Using your own custom made report templates, get the analysis and visualisations
                                    of the indicators in charts and tables.
                                </MDBCardText>
                                <MDBBtn color="primary">Go</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="4" className="mx-5">
                        <MDBCard style={{ width: "22rem" }}>
                            <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%28131%29.jpg" waves />
                            <MDBCardBody>
                                <MDBCardTitle>Time Periods</MDBCardTitle>
                                <MDBCardText>
                                    Relative and comparative time periods of indicators
                                </MDBCardText>
                                <MDBBtn color="primary">Go</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                </MDBRow>

            </MDBContainer>

            { showDisplayName ? <TransferList cropOptions={crops} errorMessage={errorText} isLoaded={loaded}
                    headerProps ={indicators}/> : null }
            { showCustom ? <BoxComponent cropOptions={crops}
                                         headerProps ={indicators}
                                         errorMessage={errorText} />: null }

        </div>




    )
}

export default MainContent;