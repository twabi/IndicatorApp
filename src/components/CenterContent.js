import React, {Fragment, PureComponent} from 'react';
import Api from '../api'

import {MDBCard, MDBCardBody, MDBCardFooter, MDBCardHeader, MDBTable, MDBTableBody, MDBTableHead} from "mdbreact";
import Grid from "@material-ui/core/Grid";
import DropdownGroup from "./DropdownGroup";
import DropdownPage from "./DropdownPage";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ListGroup from "react-bootstrap/ListGroup";
import ListItem from "@material-ui/core/ListItem";


class CenterContent extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            dashboards: [],
            isLoaded: false,
            errorMessage: "",
            cropOptions: [],
            rows: [],
            checked: [],
            showSelected: false,
            left: [],
            right: [],
            searchValue: "",
            optionCrops: [],
            filterList: [],
            filterValues: [],
            dataTables: {
                columns: [
                    {label: 'Indicator Name', field: 'name', width: 400, minimal: 'sm', attributes: {'aria-controls': 'DataTable', 'aria-label': 'Name',},},
                    {label: 'Existing short Name', field: 'existing', minimal: 'lg', width: 350,},
                    {label: 'Edit Short Name', field: 'edit', minimal: 'sm', width: 300,},],
                rows: [],
            }
        };
    }

    componentDidMount(){

        const basicAuth = 'Basic ' + btoa('ahmed:@Ahmed20');

        Api.getDashboards()
            .then(response => response.json())
            .then((result) => {

                console.log(result)
                this.setState({
                    isLoaded: true,
                    dashboards: result.indicators,
                    errorMessage: ""
                });
            })
            .catch(error => {
                console.log('Error during data retrieval:', error);
                this.setState({
                    isLoaded: true,
                    dashboards: [],
                    errorMessage: "oops couldn't load data! poor network Connection!"
                });
            });

        fetch(`https://www.namis.org/namis1/api/optionSets/AsrFCO1n0I3/options.json`, {
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
                var optionArray= [];
                result.options.map((option) => (
                    optionArray.push(option.displayName)));
                this.setState({
                    optionCrops : optionArray
                });
            });

        console.log(this.state.dashboards + "=" + this.dashboards)

        this.setState({
            left: [...this.state.dashboards]
        })

    }

     useStyles = makeStyles((theme) => ({
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

     cols =  [
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

     basicAuth = 'Basic ' + btoa('ahmed:@Ahmed20');
     moment = require('moment')

     postNewName = (jsonString, id) => {


        fetch(`https://www.namis.org/namis1/api/29/indicators/${id}`, {
            method: 'PUT',
            body: JSON.stringify(jsonString),
            headers: {
                'Authorization' : this.basicAuth,
                'Content-type': 'application/json',
            },

            credentials: "include"

        })
            .then(response => {
                console.log(response);
            });

    };

    handleToggle = (value) => () => {
        const currentIndex = this.state.checked.indexOf(value);
        const newChecked = [...this.state.checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked
        });
    };

     customList = (items) => (
        <Paper className={this.classes.paper}>
            <ListGroup dense component="div" className="m-2" role="list">
                {items.map((value) => {

                    return (
                        <ListGroup.Item action className="my-1 border" key={value.id}  onClick={this.handleToggle(value)}>
                            {['checkbox'].map((type) => (
                                <div key={type} className="">

                                    <input type="checkbox" className="mx-2"
                                           checked={this.state.checked.indexOf(value) !== -1} onChange={this.handleChange}/>
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

     now = this.moment();

     date = this.now.format("YYYY-MM-DD");
     time = this.now.format("HH:mm:ss.SSS");

     currentTime = this.date + "T" + this.time;

     not = (a, b) => {
        return a.filter((value) => b.indexOf(value) === -1);
    }

     intersection = (a, b) => {
        return a.filter((value) => b.indexOf(value) !== -1);
    }

     leftChecked = this.intersection(this.checked, this.left);
     rightChecked = this.intersection(this.checked, this.right);

     editName = (indicator) => {
        var newName = prompt("enter new name");
        var tableCell = document.getElementById(indicator.id);

        if (newName == null || newName === "") {

            console.log(this.state.dataTables)

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
                        "lastUpdated": this.currentTime,
                        "created": this.currentTime,
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

            this.postNewName(payload, indicator.id);

        }
    }


     handleSearch({ target: { value } }) {

        // Set captured value to input
         this.setState({
             searchValue: value,
         });

        // Variable to hold the original version of the list
        let currentList = [];
        // Variable to hold the filtered list before putting into state
        let newList = [];

        if(this.state.filterValues.length == 0){
            currentList = this.state.left;

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
                newList = this.state.dashboards;
            }
        } else {
            currentList = this.state.filterValues;

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
                newList = this.state.filterValues;
            }
        }


        // Set the filtered state based on what our rules added to newList
        this.setState({
            left: newList
        })
    }

     handleFilter(value) {

        // Variable to hold the original version of the list
        let currentList = [];
        // Variable to hold the filtered list before putting into state
        let newList = [];

        // If the search bar isn't empty
        if (value !== "") {
            // Assign the original list to currentList
            currentList = this.state.dashboards;

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
            newList = this.state.dashboards;
        }
        // Set the filtered state based on what our rules added to newList
        this.setState({
            left: newList,
            filterValues: newList,
        })
    }


     handleAllRight = () => {
        this.setState({
            right: this.state.right.concat(this.state.left),
            left: []
        })
    };

     handleCheckedRight = () => {
        this.setState({
            right: this.state.right.concat(this.leftChecked),
            left: this.not(this.state.left, this.leftChecked),
            checked: this.not(this.state.checked, this.leftChecked)
        })
    };

     handleCheckedLeft = () => {

        this.setState({
            left: this.state.left.concat(this.rightChecked),
            right: this.not(this.state.right, this.rightChecked),
            checked: this.not(this.state.checked, this.rightChecked)
        })
    };

     handleAllLeft = () => {

        this.setState({
            left: this.state.left.concat(this.state.right),
            right: [],
        })
    };

     reloadPage() {
        window.location.reload(false);
    }

     filterGroups= ["All", "Program", "Indicator Type",  "Crop"]
     indicatorProgram = [ "APES", "SAPP", "T1", "T2", "T3", "MET", "Other"]
     crops = ["Bananas", "Maize", "Amaranthas", "Pineapple", "Rape", "Rice"]
     indicatorType = ["Percentage", "Average Area", "Total Area", "Total Number"]


     getAllRight = () => {

        if(this.state.right.length === 0){
            console.log("is empty");
        }
        else{

            var newRows = [];
            var otherRows = [];
            this.state.right.map((value) => {

                var array = value.attributeValues;

                try{
                    if (array === undefined || array.length == 0) {
                        console.log("its null");
                        otherRows.push({name: value.displayName, existing: "", edit:
                                <Button style={{marginLeft:10}} variant="contained" color="primary" onClick={() => this.editName(value)}>
                                    Edit
                                </Button>,});
                    } else {
                        console.log("its not null");

                        otherRows.push({name: value.displayName, existing: value.attributeValues[0].value, edit:
                                <Button style={{marginLeft:10}} variant="contained" color="primary" onClick={() => this.editName(value)}>
                                    Edit
                                </Button>,});
                    }

                }catch(ex){
                    console.log(ex)
                }


            });

            this.setState({
                rows: [...newRows],
                dataTables: {
                    columns: this.cols,
                    rows: [...otherRows],
                },
                showSelected: true
            });
        }

    };

     handleChange = () => {

    }

     groupCallback = (dataFromChild) => {
        if(dataFromChild === "Program") {
            this.setState({
                filterList: [...this.indicatorProgram],
            });
        } else if (dataFromChild === "Crop"){
            this.setState({
                filterList: [...this.optionCrops],
            });
        } else if (dataFromChild === "Indicator Type"){
            this.setState({
                filterList: [...this.indicatorType],
            });
        } else if (dataFromChild === "All"){
            this.setState({
                left: [...this.state.dashboards.filter(x => !this.state.right.includes(x))]
            })
        }
    }

     groupItemCallback = (data) => {
        this.handleFilter(data);
    }



    render() {





        return (
            <div className={this.classes.root}>

                <MDBCard style={{padding: 10}}>
                    <MDBCardHeader tag="h5" className="text-center font-weight-bold text-uppercase py-4">
                        Choose preferred Indicators
                    </MDBCardHeader>

                    <MDBCardBody style={{padding: 10}}>
                        <Grid container direction="row" justify="center" alignItems="center" className={this.classes.another}>
                            <Grid item style={{marginRight: 20, marginTop:10}}>
                                <input className="form-control" value={this.state.searchValue}
                                       onChange={e => this.handleSearch(e)} type="text" placeholder="Search" aria-label="Search" />
                            </Grid>

                            <Grid item style={{marginRight: 20, marginTop:10}}>
                                <DropdownGroup groupCaller={this.groupCallback} dropdownGroups={this.state.filterGroups}/>
                            </Grid>

                            <Grid item style={{marginRight: 10, marginTop:10}}>
                                <DropdownPage groupItemCaller={this.groupItemCallback} dropdownItems={this.state.filterList}/>
                            </Grid>



                        </Grid>
                        <Grid container direction={"row"} justify="center" alignItems="center">
                            {!this.state.isLoaded ? <Grid item style={{marginRight: 10}}>
                                <div id="loadingProgress" style={{textAlign: "center"}}
                                     className="d-flex justify-content-center align-items-center spinner-border text-info" role="status">
                                    <span style={{textAlign: "center"}} className="sr-only">Loading...</span>
                                </div>
                            </Grid> : <p className="text-danger">{this.state.errorMessage}</p>}
                        </Grid>


                        <Grid container spacing={2} justify="center" alignItems="center" >

                            <MDBCard>
                                <Grid item>
                                    {this.customList(this.state.left)}
                                </Grid>
                            </MDBCard>

                            <Grid item>
                                <Grid container direction="column">
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        className={this.classes.button}
                                        onClick={this.handleAllRight}
                                        disabled={this.state.left.length === 0}
                                        aria-label="move all right">
                                        ≫
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        className={this.classes.button}
                                        onClick={this.handleCheckedRight}
                                        disabled={this.leftChecked.length === 0}
                                        aria-label="move selected right">
                                        &gt;
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        className={this.classes.button}
                                        onClick={this.handleCheckedLeft}
                                        disabled={this.rightChecked.length === 0}
                                        aria-label="move selected left">
                                        &lt;
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        className={this.classes.button}
                                        onClick={this.handleAllLeft}
                                        disabled={this.state.right.length === 0}
                                        aria-label="move all left">
                                        ≪
                                    </Button>
                                </Grid>
                            </Grid>
                            <MDBCard>
                                <Grid item>{this.customList(this.state.right)}</Grid>
                            </MDBCard>


                        </Grid>

                    </MDBCardBody>
                </MDBCard>

                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center">

                    <Grid container justify="center" alignItems="center" className={this.classes.another}>
                        <Button variant="contained" color="primary" onClick={this.getAllRight}>
                            Next
                        </Button>
                    </Grid>

                    <Grid container justify="center" border={1} className={this.classes.selContainer}>



                        { this.state.showSelected ? <MDBCard>
                            <MDBCardHeader tag="h5" className="text-center font-weight-bold text-uppercase py-4">
                                Rename Indicators
                            </MDBCardHeader>

                            <MDBCardBody style={{padding: 10}}>
                                <MDBTable striped bordered responsive>
                                    <MDBTableHead columns={this.state.dataTables.columns} />
                                    <MDBTableBody>
                                        {this.state.rows.map((row, key) =>
                                            <tr id={key}>
                                                <td>{row.indicatorName}</td>
                                                <td id={row.indicatorId}>{row.existingName}</td>
                                                <td>
                                                    <Button variant="contained" color="primary" onClick={() => this.editName(row.indicator)}>
                                                        Edit
                                                    </Button>
                                                </td>
                                            </tr>)
                                        }
                                    </MDBTableBody>
                                </MDBTable>
                            </MDBCardBody>
                            <MDBCardFooter>
                                <Grid container justify="center" alignItems="center" style={{margin: 10}}>
                                    <Button variant="contained" color="primary" onClick={this.reloadPage}>
                                        Done
                                    </Button>
                                </Grid>
                            </MDBCardFooter>

                        </MDBCard> : null }

                    </Grid>

                </Grid>


            </div>


        );


    }
}

export default React.memo(CenterContent);
