import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
import ReportForm from "./ReportForm";
import {CreateCSSProperties} from "@material-ui/core/styles/withStyles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        marginTop: 50,
        width: 600,
    },

}));

const basicAuth = 'Basic ' + btoa('ahmed:@Ahmed20');

export default function BoxComponent(props) {
    const classes = useStyles();

    var div = document.getElementById("myDiv");
    const [hideMenu, setHideMenu] = React.useState(false);
    const [showCreateForm, setShowCreateForm] = React.useState(false);

    const [crops, setCrops] = React.useState([]);
    const [indicators, setIndicators] = React.useState([])

    React.useEffect(() => {
        console.log(props.headerProps);
        setCrops(props.cropOptions);
        setIndicators(props.headerProps);
    }, [props.cropOptions, props.headerProps])


    const buttonCallback = () => {
        setHideMenu(false);
        setShowCreateForm(false);
    }


    const createNewReport = () => {

        setHideMenu(true);
        setShowCreateForm(true);
    }

    return (
        <div>
            {!hideMenu ? <MDBContainer id="myDiv">
                <MDBRow>
                    <MDBCol md="4">
                        <MDBCard style={{ width: "22rem" }}>
                            <MDBCardBody>
                                <MDBCardTitle>New Report</MDBCardTitle>
                                <MDBCardText>
                                    Create a new custom report template
                                </MDBCardText>
                                <MDBBtn className="text-white" onClick={createNewReport} color="primary">
                                    Go
                                </MDBBtn>
                            </MDBCardBody>
                        </MDBCard></MDBCol>

                    <MDBCol md="4"><MDBCard style={{ width: "22rem" }}>
                        <MDBCardBody>
                            <MDBCardTitle>Edit Report</MDBCardTitle>
                            <MDBCardText>
                                Edit an existing report template
                            </MDBCardText>
                            <MDBBtn color="primary">Go</MDBBtn>
                        </MDBCardBody>
                    </MDBCard></MDBCol>

                    <MDBCol md="4"><MDBCard style={{ width: "22rem" }}>
                        <MDBCardBody>
                            <MDBCardTitle>Delete Report</MDBCardTitle>
                            <MDBCardText>
                                Delete an existing report template
                            </MDBCardText>
                            <MDBBtn color="primary">Go</MDBBtn>
                        </MDBCardBody>
                    </MDBCard></MDBCol>
                </MDBRow>
            </MDBContainer>: null}

            { showCreateForm ? <ReportForm arrayProps={crops}
                                           indicatorProps={indicators}
                                           buttonCallback={buttonCallback}/>: null }

        </div>


    );
}