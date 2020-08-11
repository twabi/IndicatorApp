import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ListGroup from "react-bootstrap/ListGroup";
import TextField  from "@material-ui/core/TextField";
import DropdownPage from "./DropdownPage";
import DropdownGroup from "./DropdownGroup";



const useStyles = makeStyles((theme) => ({
    root: {
        margin: 30,
        marginLeft: 50,
    },
    paper: {
        width: 500,
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
        borderColor: 'blue',
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
        border: "blue",
        borderWidth: 5,
    },

    listOutline: {
        borderWidth: 1,
        borderColor: 'blue',
        borderStyle: 'solid',
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

const postNewName = (jsonString, id) => {


    fetch(`https://www.namis.org/namis1/api/29/indicators/${id}`, {
        method: 'PUT',
        body: JSON.stringify(jsonString),
        headers: {
            'Authorization' : basicAuth,
            'Content-type': 'application/json',
        },

        credentials: "include"

    })
        .then(response => {
            console.log(response);
        });

};

const basicAuth = 'Basic ' + btoa('ahmed:@Ahmed20');
const moment = require('moment')

let now = moment();

var date = now.format("YYYY-MM-DD");
var time = now.format("HH:mm:ss.SSS");

var currentTime = date + "T" + time;

const editName = (indicator) => {
    var newName = prompt("enter new name");
    var tableCell = document.getElementById(indicator.id);


    if (newName == null || newName === "") {

    } else {
        console.log(indicator.id + "-" + newName);
        tableCell.innerHTML = newName;

        var payload = {
            "publicAccess": indicator.publicAccess,
            "lastUpdated": indicator.lastUpdated,
            "denominatorDescription": indicator.denominatorDescription,
            "id": indicator.id,
            "numeratorDescription": indicator.numeratorDescription,
            "created": indicator.created,
            "attributeValues": [
                {
                    "lastUpdated": currentTime,
                    "created": currentTime,
                    "value": newName,
                    "attribute": {
                        "name": "Portal display name",
                        "id": "NIQlEQgDfUm",
                        "displayName": "Portal display name"
                    }
                }
            ],
            "numerator": indicator.numerator,
            "denominator": indicator.denominator,
            "annualized": false,
            "name": indicator.name,
            "shortName": indicator.shortName,
            "indicatorType": {
                "id": indicator.indicatorType.id
            },
            "lastUpdatedBy": {
                "id": indicator.lastUpdatedBy.id
            },
            "user": {
                "id": indicator.user.id
            },
            "translations": [

            ],
            "userGroupAccesses": [

            ],
            "userAccesses": [

            ],
            "legendSets": [

            ]
        }

        postNewName(payload, indicator.id);

    }
}


function TransferList(props) {

    const classes = useStyles();

    var indicatorArray = props.headerProp;

    const initState = [...indicatorArray];
    function createData(indicator, indicatorName, existingName, indicatorId) {
        return { indicator, indicatorName, existingName, indicatorId};
    }

    const initialRows = [];

    const [filterList, setFilterList] = React.useState([])
    const [filterValues, setFilterValues] = React.useState([])
    const [searchValue, setSearchValue] = React.useState("");
    const [rows, setRows] = React.useState(initialRows)
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState(initState);
    const [right, setRight] = React.useState([]);
    const [showSelected, setShowSelected] = React.useState(false);


    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    useEffect(()=>{
        setLeft( [...indicatorArray.filter(x => !right.includes(x))]);
    }, [indicatorArray, right])


    function handleSearch({ target: { value } }) {

        // Set captured value to input
        setSearchValue(value)

        // Variable to hold the original version of the list
        let currentList = [];
        // Variable to hold the filtered list before putting into state
        let newList = [];

        if(filterValues.length == 0){
            currentList = left;

            // If the search bar isn't empty
            if (value !== "") {
                // Assign the original list to currentList

                // Use .filter() to determine which items should be displayed
                // based on the search terms
                newList = currentList.filter(item => {
                    // change current item to lowercase
                    const lc = item.displayName.toLowerCase();
                    // change search term to lowercase
                    const filter = value.toLowerCase();
                    // check to see if the current list item includes the search term
                    // If it does, it will be added to newList. Using lowercase eliminates
                    // issues with capitalization in search terms and search content
                    return lc.includes(filter);
                });
            } else {
                // If the search bar is empty, set newList to original task list
                newList = initState;
            }
        } else {
            currentList = filterValues;

            // If the search bar isn't empty
            if (value !== "") {
                // Assign the original list to currentList




                // Use .filter() to determine which items should be displayed
                // based on the search terms
                newList = currentList.filter(item => {
                    // change current item to lowercase
                    const lc = item.displayName.toLowerCase();
                    // change search term to lowercase
                    const filter = value.toLowerCase();
                    // check to see if the current list item includes the search term
                    // If it does, it will be added to newList. Using lowercase eliminates
                    // issues with capitalization in search terms and search content
                    return lc.includes(filter);
                });
            } else {
                // If the search bar is empty, set newList to original task list
                newList = filterValues;
            }
        }


        // Set the filtered state based on what our rules added to newList
        setLeft(newList);
    }

    function handleFilter(value) {

        // Variable to hold the original version of the list
        let currentList = [];
        // Variable to hold the filtered list before putting into state
        let newList = [];

        // If the search bar isn't empty
        if (value !== "") {
            // Assign the original list to currentList
            currentList = initState;

            // Use .filter() to determine which items should be displayed
            // based on the search terms
            newList = currentList.filter(item => {
                // change current item to lowercase
                const lc = item.displayName.toLowerCase();
                // change search term to lowercase
                const filter = value.toLowerCase();
                // check to see if the current list item includes the search term
                // If it does, it will be added to newList. Using lowercase eliminates
                // issues with capitalization in search terms and search content
                return lc.includes(filter);
            });
        } else {
            // If the search bar is empty, set newList to original task list
            newList = initState;
        }
        // Set the filtered state based on what our rules added to newList
        setLeft(newList);
        setFilterValues(newList);
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

    function reloadPage() {
        window.location.reload(false);
    }

    var filterGroups= ["All", "Program", "Indicator Type",  "Crop"]
    var indicatorProgram = [ "APES", "SAPP", "T1", "T2", "T3", "MET", "Other"]
    var crops = ["Bananas", "Maize", "Amaranthas", "Pineapple", "Rape", "Rice"]
    var indicatorType = ["Percentage", "Average Area", "Total Area", "Total Number"]
    var allgroups = ["All groups"];


    const getAllRight = () => {
      console.log(right);

      if(right.length === 0){
          console.log("is empty");
      }
      else{

          var newRows = [];
          right.map((value) => {

              var array = value.attributeValues;

              try{
                  if (array === undefined || array.length == 0) {
                      console.log("its null");
                      newRows.push(createData(value, value.displayName, "", value.id));
                  } else {
                      newRows.push(createData(value, value.displayName, value.attributeValues[0].value, value.id));
                      console.log("its not null");
                  }

              }catch(ex){
                  console.log(ex)
              }


          });
          setRows([...newRows]);

          console.log("rows before: " + rows);
          setShowSelected(true);
      }

    };

    const groupCallback = (dataFromChild) => {
        if(dataFromChild === "Program") {
            setFilterList([...indicatorProgram]);
        } else if (dataFromChild === "Crop"){
            setFilterList([...crops])
        } else if (dataFromChild === "Indicator Type"){
            setFilterList([...indicatorType]);
        } else if (dataFromChild === "All"){
            setFilterList([...allgroups]);
            setLeft([...indicatorArray.filter(x => !right.includes(x))]);
        }
    }

    const groupItemCallback = (data) => {
        console.log(data);

        handleFilter(data);
    }


    const Selects = () => (

        <div>
            <div style={{textAlign: "center", margin: 10}}>
                <h4>Rename Indicators</h4>
            </div>
            <TableContainer component={Paper} className={classes.table}  justify="center" alignitems="center">
                <Table style={{ tableLayout: 'auto' }}  aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Indicator Name</b></TableCell>
                            <TableCell align="left"><b>Existing ShortName</b></TableCell>
                            <TableCell align="center"><b>New ShortName</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, i) => (
                            <TableRow key={i}>
                                <TableCell component="th" scope="row">
                                    {row.indicatorName}
                                </TableCell>
                                <TableCell align="left" id={row.indicatorId}>{row.existingName}</TableCell>
                                <TableCell align="center">
                                    <Button variant="contained" color="primary" onClick={() => editName(row.indicator)}>
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </TableContainer>

            <Grid container justify="center" alignItems="center" className={classes.another}>
                <Button variant="contained" color="primary" onClick={reloadPage}>
                    Done
                </Button>
            </Grid>

        </div>

    )

    const customList = (items) => (
        <Paper className={classes.paper}>
            <ListGroup dense component="div" className="m-2" role="list">
                {items.map((value) => {

                    return (
                        <ListGroup.Item action className="my-1 border" key={value.id}  onClick={handleToggle(value)}>
                            {['checkbox'].map((type) => (
                                <div key={type} className="">

                                    <input type="checkbox" className="mx-2"
                                           checked={checked.indexOf(value) !== -1}/>
                                    {value.displayName}

                                </div>
                            ))}

                        </ListGroup.Item>
                    );
                })}
                <ListItem />
            </ListGroup>
        </Paper>
    );

    return (
        <div className={classes.root}>
            <div style={{textAlign: "center", margin: 10}}>
                <h4 className="my-2">Choose preferred Indicators</h4>
                <div className={classes.wrapper}> </div>

            </div>

            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center">
                <Grid container direction="row" justify="center" alignItems="center" className={classes.another}>
                    <Grid item>

                        <TextField id="search-basic" label="Search" variant="outlined"
                                   value={searchValue}
                                   onChange={e => handleSearch(e)}/>
                    </Grid>

                    <Grid item style={{marginTop:5, marginLeft: 20}}>
                        <DropdownGroup groupCaller={groupCallback} dropdownGroups={filterGroups}/>
                    </Grid>

                    <Grid item style={{marginTop:5, marginLeft: 20}}>
                        <DropdownPage groupItemCaller={groupItemCallback} dropdownItems={filterList}/>
                    </Grid>
                </Grid>


                <Grid container spacing={2} className={classes.listOutline} justify="center" alignItems="center" >

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

            </Grid>


        </div>


    );
}

export default React.memo(TransferList)