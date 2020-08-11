import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";


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

export default function BoxComponent() {
    const classes = useStyles();


    var report = "<div>\n" +
        "            <div style={{textAlign: \"center\", margin: 10}}>\n" +
        "                <h4>Create New Reports</h4>\n" +
        "            </div>\n" +
        " <InputGroup className=\"mb-3\">\n" +
        "    <FormControl\n" +
        "      placeholder=\"Recipient's username\"\n" +
        "      aria-label=\"Recipient's username\"\n" +
        "      aria-describedby=\"basic-addon2\"\n" +
        "    />\n" +
        "    <InputGroup.Append>\n" +
        "      <Button variant=\"outline-secondary\">Button</Button>\n" +
        "    </InputGroup.Append>\n" +
        "  </InputGroup>"





    const createNewReport = () => {
        console.log("creating the report");
        var div = document.getElementById("myDiv");
        div.innerHTML = "";
        div.innerHTML += report
    }

    return (
        <div className={classes.root}>

            <Paper id="myDiv" className={classes.paper}>
                <Button
                    variant="contained"
                    style={{margin: 10}}
                    onClick={createNewReport}
                    color="primary">
                    new report
                </Button>
                <Button variant="contained" style={{margin: 10}} color="primary">
                    edit report
                </Button>
                <Button variant="contained" style={{margin: 10}} color="primary">
                    Delete report
                </Button>
            </Paper>
        </div>
    );
}