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
import EditForm from "./EditForm";

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



export default function BoxComponent(props) {
    const classes = useStyles();

    var div = document.getElementById("myDiv");
    const [hideMenu, setHideMenu] = React.useState(false);
    const [showCreateForm, setShowCreateForm] = React.useState(false);
    const [showEditForm, setShowEditForm] = React.useState(false);

    const [crops, setCrops] = React.useState([]);
    const [programs, setPrograms] = React.useState([])
    const [reports, setReports] = React.useState([]);


    React.useEffect(() => {
        setCrops(props.cropOptions);
        setPrograms(props.programs);
        setReports(props.reports)

    }, [props.cropOptions, props.programs, props.reports])



    const buttonCallback = () => {
        setHideMenu(false);
        setShowCreateForm(false);
        setShowEditForm(false);
    }


    const createNewReport = () => {

        setHideMenu(true);
        setShowCreateForm(true);
    }

    const editExistingReport = () => {
        setHideMenu(true);
        setShowEditForm(true);

        console.log(reports)

    }

    return (
        <div>
            {!hideMenu ? <MDBContainer id="myDiv" className="d-flex justify-content-center">
                <MDBRow>
                    <MDBCol md="6">
                        <MDBCard style={{ width: "23rem" }}>
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

                    <MDBCol md="6"><MDBCard style={{ width: "23rem" }}>
                        <MDBCardBody>
                            <MDBCardTitle>Edit Report</MDBCardTitle>
                            <MDBCardText>
                                Edit or delete an existing report template
                            </MDBCardText>
                            <MDBBtn color="primary" onClick={editExistingReport}>Go</MDBBtn>
                        </MDBCardBody>
                    </MDBCard></MDBCol>

                </MDBRow>
            </MDBContainer>: null}

            { showCreateForm ? <ReportForm arrayProps={crops}
                                           indicatorProps={programs}
                                           buttonCallback={buttonCallback}/>: null }

            { showEditForm ? <EditForm reportProps={reports} buttonCallback={buttonCallback} /> : null}

        </div>


    );
}