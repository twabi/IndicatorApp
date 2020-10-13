import React, {Fragment, PureComponent} from 'react';
import Api from './api'
import './App.css';
import TransferList from "./components/DisplayName";
import BoxComponent from "./components/CustomReports";
import {
    Switch,
    Route
} from "react-router-dom";
import MainContent from "./components/MainContent";
import Analysis from "./components/Analysis";
import TimePeriods from "./components/TimePeriods";
import ReportForm from "./components/ReportForm";
import EditForm from "./components/EditForm";


class App extends PureComponent {
    constructor(props) {
        super(props);

        //basically all of the variables to be used throughout the app
        this.state = {
            dashboards: [],
            isLoaded: false,
            errorMessage: "",
            navBarValue: "",
            cropOptions: [],
            programGroups: [],
            boxValue: "",
            orgUnits: [],
            periodTypes: [],
            reports: [],
        };
    }

    componentDidMount(){

        //authentication for the namis api
        const basicAuth = 'Basic ' + btoa('ahmed:@Ahmed20');

        //its been badly named but dashboards are the indicators, and this fetch just queried them
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

        //this is a fetch request to get the crop names from the datastore, these crops are displayed in a dropdown in later components
        fetch(`https://www.namis.org/namis1/api/29/dataStore/crops/crops`, {
            method: 'GET',
            headers: {
                'Authorization' : basicAuth,
                'Content-type': 'application/json',
            },
            credentials: "include"

        })
            .then(response => response.json())
            .then((result) => {
                var optionArray= ["Apples", "Amaranthas", "Avocado", "Banana"];
                result.map((option) => (
                    optionArray.push(option.name)));
                this.setState({
                    cropOptions : optionArray
                });
            }).catch(error => {
            alert("oops an error occurred: " + error + " .Try reloading your page");

        });


        //initializing an array-to-tree library that will turn an array of org units into a tree form
        var arrayToTree = require('array-to-tree');

        //fetch org units with three fields, name, id and parent(for the array-to-tree to work)
        fetch(`https://www.namis.org/namis1/api/29/organisationUnits.json?paging=false&fields=name&fields=id&fields=parent`, {
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

                result.organisationUnits.map((item, index) => {
                    //

                    //making sure every org unit has a parent node, if not set it to undefined
                    item.title = item.name;
                    item.value = item.name.replace(/ /g, "") + "-" + index;
                    if(item.parent != null){
                        //console.log(item.parent.id)
                        item.parent = item.parent.id
                    } else {
                        item.parent = undefined
                    }
                });

                //do the array-to-tree thing using the parent and id fields in each org unit
                var tree = arrayToTree(result.organisationUnits, {
                    parentProperty: 'parent',
                    customID: 'id'
                });

                //console.log( tree );

                this.setState({
                    orgUnits : tree
                });

            }).catch(error => {
            alert("oops an error occurred: " + error + " .Try reloading your page");

        });


        //fetch custom-reports, now these are the reports that the app itself is creating each time a report is created, and is saved in the datastore
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

                    // i dont remember what this second fetch inside here does, but it is essential---- do not touch!
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

                            try{
                                console.log(this.state.reports)
                                if(this.state.reports.includes(result)){
                                    console.log("possible duplication")
                                }else{
                                    //setReports(reports => [...reports, result]);
                                    this.setState({ reports: [...this.state.reports, result] })
                                }
                            }catch (e){
                                console.log(e)
                            }



                        })
                })
                //setReportKeys(array);

            });


        //query the indicator groups, will be used in the customReports section
        fetch(`https://www.namis.org/namis1/api/indicatorGroups.json?paging=false&fields=*`, {
            method: 'GET',
            headers: {
                'Authorization' : basicAuth,
                'Content-type': 'application/json',
            },
            credentials: "include"

        })
            .then(response => response.json())
            .then((result) => {
                console.log(result.indicatorGroups);
                this.setState({
                    programGroups : result.indicatorGroups
                })
            }).catch(error => {
            alert("oops an error occurred: " + error + " .Try reloading your page");

        });

        //get the period types for the period dropdowns in analysis and timeperiods
        fetch(`https://www.namis.org/namis1/api/periodTypes.json?paging=false&fields=*`, {
            method: 'GET',
            headers: {
                'Authorization' : basicAuth,
                'Content-type': 'application/json',
            },
            credentials: "include"

        })
            .then(response => response.json())
            .then((result) => {
                console.log(result.periodTypes);
                this.setState({
                    periodTypes : result.periodTypes
                })
            }).catch(error => {
            alert("oops an error occurred: " + error + " .Try reloading your page");

        });

    }

    //when the home button is pressed in the components, not a functional button, can be removed later
     homeCallback = () => {
        console.log("anything");
    }


    render() {


        //the return basically defines the routes to be used in the whole app, each route is carrying props to the components,
        // the props are basically just the variables and arrays we fetched from NAMIS above.
        return (
        <Fragment>
            <Switch>
                <Route path="/"  render={(props) => (
                    <MainContent {...props} cropOptions={this.state.cropOptions}
                                 errorMessage={this.state.errorMessage}
                                 isLoaded={this.state.isLoaded}
                                 organizationalUnits={this.state.orgUnits}
                                 periods={this.state.periodTypes}
                                 navBarValue={this.state.navBarValue}
                                 programs={this.state.programGroups}
                                 headerProps ={this.state.dashboards} />
                )} exact/>

                <Route path="/displayName" render={(props) => (
                    <TransferList {...props} cropOptions={this.state.cropOptions}
                                 errorMessage={this.state.errorMessage}
                                 isLoaded={this.state.isLoaded}
                                 headerProps ={this.state.dashboards} />
                )} exact/>

                <Route path="/analysis" render={(props) => (
                    <Analysis {...props} reportProps={this.state.reports}
                              indicators={this.state.dashboards}
                              cropOptions={this.state.cropOptions}
                              periodProps={this.state.periodTypes}
                              organization={this.state.orgUnits}
                              buttonCallback={this.homeCallback} />
                )} exact/>

                <Route path="/timePeriods" render={(props) => (
                    <TimePeriods {...props} indicatorProps={this.state.dashboards}
                              periodTypeProps={this.state.periodTypes}
                              orgProps={this.state.orgUnits}
                              btnCallback={this.homeCallback} />
                )} exact/>

                <Route path="/customReports" render={(props) => (
                    <BoxComponent {...props} cropOptions={this.state.cropOptions}
                              programs={this.state.programGroups}
                              reports={this.state.reports}
                              btnCallback={this.homeCallback}
                              headerProps ={this.state.dashboards}
                              errorMessage={this.state.errorMessage} />
                )} exact/>

                <Route path="/customReports/newReport" render={(props) => (
                    <ReportForm {...props} arrayProps={this.state.cropOptions}
                                 indicatorProps={this.state.programGroups}
                                 buttonCallback={this.homeCallback} />
                )} exact/>

                <Route path="/customReports/editReport" render={(props) => (
                    <EditForm {...props} reportProps={this.state.reports}
                              arrayProps={this.state.cropOptions}
                              indicatorProps={this.state.dashboards}
                              buttonCallback={this.homeCallback} />
                )} exact/>

            </Switch>
        </Fragment>
        )

    }
}

export default React.memo(App);
