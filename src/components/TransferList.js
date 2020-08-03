import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from "@material-ui/core/CircularProgress";
import * as axios from "axios";



const useStyles = makeStyles((theme) => ({
    root: {
        margin: 30,
        marginLeft: 50,
    },
    paper: {
        width: 400,
        height: 400,
        overflow: 'auto',
        verticalAlign: "top",
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },

    table: {
        minWidth: 650,
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',

    },

    tableDiv: {
        minWidth: 650,
    },

    another: {
        marginTop: 30,
        marginBottom : 20,
    },

    selContainer: {
        marginTop: 70,
        border: "black",
        borderWidth: 5,
    },


    myBtn: {
      margin: 15,
    },
}));


function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

const basicAuth = 'Basic ' + btoa('ahmed:@Ahmed20');
const headers = new Headers({
    'Authorization' : basicAuth,
    'Content-type': 'application/json',
});

const moment = require('moment')

let now = moment();


export default React.memo(function TransferList(props) {
    const classes = useStyles();
    var indicatorArray = props.headerProp;

    const initState = [...indicatorArray];
    function createData(indicatorName, existingName, indicatorId) {
        return { indicatorName, existingName, indicatorId};
    }

    const initialRows = [];

    const [postId, setPostId] = React.useState(null);
    const [showLoading, setShowLoading] = React.useState(false);
    const [rows, setRows] = React.useState(initialRows)
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState(initState);
    const [right, setRight] = React.useState([]);
    const [showSelected, setShowSelected] = React.useState(false);

    const saveNewIndicatorNames = () => {
        console.log(rows);
    }

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value) => () => {
        console.log(value);
        const currentIndex = checked.indexOf(value.displayName);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const loadIndi = () => {
        setLeft( [...indicatorArray.filter(x => !right.includes(x))]);
        //console.log(date + "T"+ time);

        console.log(currentTime);
    }

    var date = now.format("YYYY-MM-DD");
    var time = now.format("HH:mm:ss.SSS");

    var currentTime = date + "T" + time;

    const postNewName = (jsonString, id) => {


        fetch(`https://www.namis.org/namis1/api/indicators/${id}/attributeValues`, {
            body: JSON.stringify(jsonString),
                headers: {
                    'Authorization' : basicAuth,
                    'Content-type': 'application/json',
                },
            method: 'POST'

        })
            .then(response => response.json());

        /*
        axios.post(`https://www.namis.org/namis1/api/indicators/${id}/attributeValues/${currentTime}`,
            jsonString,
            {headers: {
                "Access-Control-Allow-Origin" : "*",
                    "Content-type": "Application/json",
                    "Authorization": basicAuth,
            }
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })


         */

    }

    const editName = (indicatorID) => {
        var newName = prompt("enter new name");
        var tableCell = document.getElementById(indicatorID);


        if (newName == null || newName === "") {

        } else {
            console.log(indicatorID + "-" + newName);
            tableCell.innerHTML = newName;


            let dataToSend ={
                lastUpdated: currentTime,
                created: currentTime,
                value: newName,
                attribute: {
                    id : indicatorID
                }
                };

            postNewName(dataToSend, indicatorID);

        }
    }

    const handleAllRight = () => {
        setRight(right.concat(left));
        setLeft([]);
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
    };



    const getAllRight = () => {
      console.log(right);

      if(right.length === 0){
          console.log("is empty");
      }
      else{

          var newRows = [];
          right.map((value) => {

              if(value.attributeValues.length === 0){
                  console.log("has no portal display name");
                  newRows.push(createData(value.displayName, "", value.id));

              }else {
                  console.log(value.attributeValues[0].value);
                  var attribute = value.attributeValues[0].value;

                  newRows.push(createData(value.displayName, attribute, value.id));
              }

          });
          setRows([...newRows]);

          console.log("rows before: " + rows);
          setShowSelected(true);
      }

    };



    const LoadingProgress = () => (
        <CircularProgress size={20} />
    )


    const Selects = () => (

        <div>
            <div style={{textAlign: "center", margin: 10}}>
                <h4>Rename Indicators</h4>
            </div>
            <TableContainer component={Paper} className={classes.table}  justify="center" alignItems="center">
                <Table  aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Indicator Name</b></TableCell>
                            <TableCell align="center"><b>Existing ShortName</b></TableCell>
                            <TableCell align="center"><b>New ShortName</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.existingName}>
                                <TableCell component="th" scope="row">
                                    {row.indicatorName}
                                </TableCell>
                                <TableCell align="center" id={row.indicatorId}>{row.existingName}</TableCell>
                                <TableCell align="center">
                                    <Button variant="contained" color="primary" onClick={() => editName(row.indicatorId)}>
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </TableContainer>

            <Grid container justify="center" alignItems="center" className={classes.another}>
                <Button variant="contained" color="primary" onClick={saveNewIndicatorNames}>
                    Done
                </Button>
            </Grid>

        </div>

    )

    const customList = (items) => (
        <Paper className={classes.paper}>
            <List dense component="div" role="list">
                {items.map((value) => {
                    const labelId = `transfer-list-item-${value.displayName}-label`;

                    return (
                        <ListItem key={value.id} role="listitem" button onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${value.displayName}`} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Paper>
    );

    return (
        <div className={classes.root}>
            <div style={{textAlign: "center", margin: 10}}>
                <h4>Choose preferred Indicators</h4>
                <div className={classes.wrapper}>
                    <Button style={{margin: 10}}
                        variant="contained"
                            id="loadBtn"
                            color="primary"
                            onClick={loadIndi}>
                        load indicators
                        { showLoading ? <LoadingProgress/> : null }
                    </Button>

                </div>

            </div>
            <Grid container spacing={2} justify="center" alignItems="center" >
                <Grid item>{customList(left)}</Grid>
                <Grid item>
                    <Grid container direction="column">
                        <Button
                            variant="outlined"
                            size="small"
                            className={classes.button}
                            onClick={handleAllRight}
                            disabled={left.length === 0}
                            aria-label="move all right">
                            ≫
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            className={classes.button}
                            onClick={handleCheckedRight}
                            disabled={leftChecked.length === 0}
                            aria-label="move selected right">
                            &gt;
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            className={classes.button}
                            onClick={handleCheckedLeft}
                            disabled={rightChecked.length === 0}
                            aria-label="move selected left">
                            &lt;
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            className={classes.button}
                            onClick={handleAllLeft}
                            disabled={right.length === 0}
                            aria-label="move all left">
                            ≪
                        </Button>
                    </Grid>
                </Grid>
                <Grid item>{customList(right)}</Grid>

            </Grid>
            <Grid container justify="center" alignItems="center" className={classes.another}>
                <Button variant="contained" color="primary" onClick={getAllRight}>
                    Next
                </Button>
            </Grid>

            <Grid container justify="center" border={1} className={classes.selContainer}>
                { showSelected ? <Selects /> : null }

            </Grid>

        </div>


    );
})