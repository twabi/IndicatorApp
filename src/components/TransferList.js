import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import ListGroup from "react-bootstrap/ListGroup";
import DropdownPage from "./DropdownPage";
import DropdownGroup from "./DropdownGroup";
import {MDBTable, MDBTableBody, MDBBtn, MDBTableHead, MDBCard, MDBCardHeader, MDBCardBody, MDBCardFooter} from 'mdbreact';



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
        borderWidth: 0.5,
        borderColor: 'grey',
        borderStyle: 'solid',
        padding: 10,

    },

    tableDiv: {
        minWidth: 650,
    },

    another: {
        marginTop: 20,
        marginBottom : 25,
    },

    selContainer: {
        marginTop: 70,
        border: "grey",
        borderWidth: 5,
    },

    listOutline: {
        borderWidth: 0.5,
        borderColor: 'grey',
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

const basicAuth = 'Basic ' + btoa('ahmed:@Ahmed20');
const moment = require('moment')

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



let now = moment();


var date = now.format("YYYY-MM-DD");
var time = now.format("HH:mm:ss.SSS");

var currentTime = date + "T" + time;


function TransferList(props) {

    var cols =  [
        {label: 'Indicator Name',
            field: 'name',
            width: 400,
            minimal: 'sm',
            attributes: {
                'aria-controls': 'DataTable',
                'aria-label': 'Name',
            },
        }, {
            label: 'Existing short Name',
            field: 'existing',
            minimal: 'lg',
            width: 350,
        }, {
            label: 'Edit Short Name',
            field: 'edit',
            minimal: 'sm',
            width: 300,},
    ]

    var indicatorArray = props.headerProps;
    var isLoaded = props.isLoaded;
    var errorMessage = props.errorMessage;
    var cropOptions = props.cropOptions;

    console.log(indicatorArray + "-" + props)

    const initState = [...indicatorArray];
    function createData(indicator, indicatorName, existingName, indicatorId) {
        return { indicator, indicatorName, existingName, indicatorId};
    }

    const classes = useStyles();
    const [filterList, setFilterList] = React.useState([])
    const [filterValues, setFilterValues] = React.useState([])
    const [searchValue, setSearchValue] = React.useState("");
    const [rows, setRows] = React.useState([])
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState(initState);
    const [right, setRight] = React.useState([]);
    const [showSelected, setShowSelected] = React.useState(false);
    const [optionCrops, setOptionsCrops] = React.useState([]);

    const [dataTables, setDataTables] = React.useState({
        columns: cols,
        rows: [],
    });


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

    console.log("loaded: " + isLoaded);


    useEffect(()=>{
        setLeft( [...indicatorArray.filter(x => !right.includes(x))]);
        setOptionsCrops(cropOptions);
    }, [indicatorArray, right]);




    const editName = (indicator) => {
        var newName = prompt("enter new name");
        var tableCell = document.getElementById(indicator.id);

        if (newName == null || newName === "") {

            console.log(dataTables)

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

    var filterGroups= ["All", "Program", "Indicator Type",  " "]
    var indicatorProgram = [ "APES", "SAPP", "T1", "T2", "T3", "MET", "Other"]
    var indicatorType = ["Percentage", "Average Area", "Total Area", "Total Number"]


    const getAllRight = () => {

      if(right.length === 0){
          console.log("is empty");
      }
      else{

          var newRows = [];
          var otherRows = [];
          right.map((value) => {

              var array = value.attributeValues;

              try{
                  if (array === undefined || array.length == 0) {
                      console.log("its null");
                      newRows.push(createData(value, value.displayName, "", value.id));
                      otherRows.push({name: value.displayName, existing: "", edit:
                              <Button style={{marginLeft:10}} variant="contained" color="primary" onClick={() => editName(value)}>
                              Edit
                          </Button>,});
                  } else {
                      newRows.push(createData(value, value.displayName, value.attributeValues[0].value, value.id));
                      console.log("its not null");

                      otherRows.push({name: value.displayName, existing: value.attributeValues[0].value, edit:
                              <Button style={{marginLeft:10}} variant="contained" color="primary" onClick={() => editName(value)}>
                              Edit
                          </Button>,});
                  }

              }catch(ex){
                  console.log(ex)
              }


          });
          setRows([...newRows]);
          setDataTables({
              columns: cols,
              rows: [...otherRows],
          })

          setShowSelected(true);
      }

    };

    const handleChange = () => {

    }

    const groupCallback = (dataFromChild) => {
        if(dataFromChild === "Program") {
            setFilterList([...indicatorProgram]);
        } else if (dataFromChild === "Crop"){
            setFilterList([...optionCrops])
        } else if (dataFromChild === "Indicator Type"){
            setFilterList([...indicatorType]);
        } else if (dataFromChild === "All"){
            setLeft([...indicatorArray.filter(x => !right.includes(x))]);
        }
    }

    const groupItemCallback = (data) => {
        handleFilter(data);
    }

    const customList = (items) => (
        <Paper className={classes.paper}>
            <ListGroup dense component="div" className="m-2" role="list">
                {items.map((value) => {

                    return (
                        <ListGroup.Item action variant="info" className="my-1 border" key={value.id}  onClick={handleToggle(value)}>
                            {['checkbox'].map((type) => (
                                <div key={type} className="">

                                    <input type="checkbox" className="mx-2"
                                           checked={checked.indexOf(value) !== -1} onChange={handleChange}/>
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

            <MDBCard style={{padding: 10}}>
                <MDBCardHeader tag="h5" className="text-center font-weight-bold text-uppercase py-4">
                    Choose preferred Indicators
                </MDBCardHeader>

                <MDBCardBody style={{padding: 10}}>
                    <Grid container direction="row" justify="center" alignItems="center" className={classes.another}>
                        <Grid item style={{marginRight: 20, marginTop:10}}>
                            <input className="form-control" value={searchValue}
                                   onChange={e => handleSearch(e)} type="text" placeholder="Search" aria-label="Search" />
                        </Grid>

                        <Grid item style={{marginRight: 20, marginTop:10}}>
                            <DropdownGroup groupCaller={groupCallback} dropdownGroups={filterGroups}/>
                        </Grid>

                        <Grid item style={{marginRight: 10, marginTop:10}}>
                            <DropdownPage groupItemCaller={groupItemCallback} dropdownItems={filterList}/>
                        </Grid>



                    </Grid>
                    <Grid container direction={"row"} justify="center" alignItems="center">
                        {!isLoaded ? <Grid item style={{marginRight: 10}}>
                            <div id="loadingProgress" style={{textAlign: "center"}}
                                 className="d-flex justify-content-center align-items-center spinner-border text-info" role="status">
                                <span style={{textAlign: "center"}} className="sr-only">Loading...</span>
                            </div>
                        </Grid> : <p className="text-danger">{errorMessage}</p>}
                    </Grid>


                    <Grid container spacing={2} justify="center" alignItems="center" >

                        <MDBCard>
                                <Grid item>
                                    {customList(left)}
                                </Grid>
                        </MDBCard>

                        <Grid item>
                            <Grid container direction="column">

                                <MDBBtn outline
                                        size="sm"
                                        onClick={handleAllRight}
                                        disabled={left.length === 0}
                                        color="primary">
                                    ≫
                                </MDBBtn>

                                <MDBBtn outline
                                        size="sm"
                                        onClick={handleCheckedRight}
                                        disabled={leftChecked.length === 0}
                                        color="primary">
                                    &gt;
                                </MDBBtn>

                                <MDBBtn outline
                                        onClick={handleCheckedLeft}
                                        size="sm"
                                        disabled={rightChecked.length === 0}
                                        color="primary">
                                    &lt;
                                </MDBBtn>

                                <MDBBtn outline
                                        size="sm"
                                        onClick={handleAllLeft}
                                        disabled={right.length === 0}
                                        color="primary">
                                    ≪
                                </MDBBtn>

                            </Grid>
                        </Grid>
                        <MDBCard>
                            <Grid item>{customList(right)}</Grid>
                        </MDBCard>


                    </Grid>

                </MDBCardBody>
            </MDBCard>

            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center">

                <Grid container justify="center" alignItems="center" className={classes.another}>
                    <MDBBtn onClick={getAllRight} color="primary">Next</MDBBtn>
                </Grid>

                <Grid container justify="center" border={1} className={classes.selContainer}>



                    { showSelected ? <MDBCard>
                        <MDBCardHeader tag="h5" className="text-center font-weight-bold text-uppercase py-4">
                            Rename Indicators
                        </MDBCardHeader>

                        <MDBCardBody style={{padding: 10}}>
                            <MDBTable striped bordered responsive>
                                <MDBTableHead columns={dataTables.columns} />
                                <MDBTableBody>
                                    {rows.map((row, key) =>
                                        <tr id={key}>
                                            <td>{row.indicatorName}</td>
                                            <td id={row.indicatorId}>{row.existingName}</td>
                                            <td>
                                                <MDBBtn onClick={() => editName(row.indicator)}
                                                        color="primary">Edit</MDBBtn>
                                            </td>
                                        </tr>)
                                    }
                                </MDBTableBody>
                            </MDBTable>
                        </MDBCardBody>
                        <MDBCardFooter>
                            <Grid container justify="center" alignItems="center" style={{margin: 10}}>
                                <MDBBtn onClick={reloadPage}
                                        color="primary">Done</MDBBtn>

                            </Grid>
                        </MDBCardFooter>

                    </MDBCard> : null }

                </Grid>

            </Grid>


        </div>


    );
}

export default React.memo(TransferList)