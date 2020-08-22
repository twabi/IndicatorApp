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
import Analysis from "./Analysis";

const basicAuth = 'Basic ' + btoa('ahmed:@Ahmed20');

const MainContent = (props) => {

    var indicatorArray = props.headerProps;
    var isLoaded = props.isLoaded;
    var errorMessage = props.errorMessage;
    var cropOptions = props.cropOptions;
    var programGroups = props.programs;
    var units = props.organizationalUnits
    var pers = props.periods;

    console.log("units: " + units)

    var container = document.getElementById("myDiv");

    const [indicators, setIndicators] = React.useState([...indicatorArray]);
    const [programs, setPrograms] = React.useState([]);
    const [loaded, setLoaded] = React.useState(isLoaded);
    const [errorText, setErrorText] = React.useState(errorMessage);
    const [crops, setCrops] = React.useState([...cropOptions]);
    const [showDisplayName, setshowDisplayName] = React.useState(false);
    const [showCustom, setCustom] = React.useState(false);
    const [reports, setReports] = React.useState([]);
    const [reportKeys, setReportKeys] = React.useState([]);
    const [showAnalysis, setShowAnalysis] = React.useState(false);
    const [showHome, setShowHome] = React.useState(true);
    const [btnPressed, setBtnPressed] = React.useState(false);
    const [orgUnits, setOrgUnits] = React.useState(units);
    const [periods, setPeriods] = React.useState(pers);

    React.useEffect(() => {


        setLoaded(isLoaded);
        setCrops([...cropOptions]);
        setIndicators([...indicatorArray]);
        setErrorText(errorMessage)
        setPrograms([...programGroups]);
        setOrgUnits([...units])
        setPeriods([...pers])


        fetch(`https://www.namis.org/namis1/api/29/dataStore/customReports/`, {
            method: 'GET',
            headers: {
                'Authorization' : basicAuth,
                'Content-type': 'application/json',
            },
            credentials: "include"

        })
            .then(response => response.json())
            .then((result) => {
                console.log(result);
                var array = []
                result.map((item) => {
                    array.push(item);

                    fetch(`https://www.namis.org/namis1/api/29/dataStore/customReports/${item}`, {
                        method: 'GET',
                        headers: {
                            'Authorization' : basicAuth,
                            'Content-type': 'application/json',
                        },
                        credentials: "include"

                    })
                        .then(response => response.json())
                        .then((result) => {

                            if(reports.includes(result)){
                                console.log("possible duplication")
                            }else{
                                setReports(reports => [...reports, result]);
                            }


                        })
                })
                setReportKeys(array);

            });


    }, [units]);

    const homeCallback = () => {
        setShowHome(true)
        setshowDisplayName(false);
        setCustom(false);
        setShowAnalysis(false);
    }


    const gotoDisplayName = () => {
        setShowHome(false)
        setshowDisplayName(true);
        setCustom(false);
        setShowAnalysis(false);
    }

    const gotoCustomReports = () => {
        setShowHome(false)
        setCustom(true);
        setshowDisplayName(false)
        setShowAnalysis(false);
    }

    const gotoAnalysis = () => {
        setShowHome(false)
        setShowAnalysis(true);
        setshowDisplayName(false);
        setCustom(false)
    }


    return (

        <div >

            { showHome ? <MDBContainer className="pl-5" id="myDiv">
                <MDBRow className="my-5 p-2">
                    <MDBCol md="4" className="mx-5 my-2">
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
                    <MDBCol md="4" className="mx-5 my-2">
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
                    <MDBCol md="4" className="mx-5 my-2">
                        <MDBCard style={{ width: "22rem" }}>
                            <MDBCardImage className="img-fluid" style={{ height: '12rem' }} src="https://mdbootstrap.com/img/Photos/Slides/img%20(70).jpg" waves />
                            <MDBCardBody>
                                <MDBCardTitle>Analysis</MDBCardTitle>
                                <MDBCardText>
                                    Using your own custom made report templates, get the analysis
                                    of the indicators in charts and tables.
                                </MDBCardText>
                                <MDBBtn color="primary" onClick={gotoAnalysis}>Go</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="4" className="mx-5 my-2">
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

            </MDBContainer> : null}

            { showDisplayName ? <TransferList cropOptions={crops} errorMessage={errorText} isLoaded={loaded}
                    headerProps ={indicators}/> : null }
            { showCustom ? <BoxComponent cropOptions={crops}
                                         programs={programs}
                                         reports={reports}
                                         headerProps ={indicators}
                                         errorMessage={errorText} />: null }

            { showAnalysis ? <Analysis reportProps={reports} indicators={indicators}
                                       cropOptions={crops}
                                       periodProps={periods}
                                       organization={orgUnits} buttonCallback={homeCallback}/> : null}

        </div>




    )
}

export default React.memo(MainContent);