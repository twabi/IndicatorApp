import React, {Fragment, PureComponent} from 'react';
import Api from './api'
import './App.css';
import NavBar from './components/NavBar'
import TransferList from "./components/TransferList";
import BoxComponent from "./components/BoxComponent";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import MainContent from "./components/MainContent";
import Sidebar from "./components/SideBar";
import CenterContent from "./components/CenterContent";
import until from "@material-ui/core/test-utils/until";
import JsTreeList from "js-tree-list"
import Analysis from "./components/Analysis";
import TimePeriods from "./components/TimePeriods";
import ReportForm from "./components/ReportForm";
import EditForm from "./components/EditForm";


class App extends PureComponent {
    constructor(props) {
        super(props);

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


        var arrayToTree = require('array-to-tree');

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

                    item.title = item.name;
                    item.value = item.name.replace(/ /g, "") + "-" + index;
                    if(item.parent != null){
                        //console.log(item.parent.id)
                        item.parent = item.parent.id
                    } else {
                        item.parent = undefined
                    }
                });

                var tree = arrayToTree(result.organisationUnits, {
                    parentProperty: 'parent',
                    customID: 'id'
                });

                console.log( tree );

                this.setState({
                    orgUnits : tree
                });

            }).catch(error => {
            alert("oops an error occurred: " + error + " .Try reloading your page");

        });

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

    mainCallBack = (dataFromChild) => {
        console.log(dataFromChild);
        this.setState({
            navBarValue : dataFromChild,
        });
    }

     homeCallback = () => {
        console.log("anything");
    }


    render() {


        return (
            /*
            <Fragment>
                <div >
                    <NavBar callerBack={this.mainCallBack}/>

                    <MainContent cropOptions={this.state.cropOptions}
                                 errorMessage={this.state.errorMessage}
                                 isLoaded={this.state.isLoaded}
                                 organizationalUnits={this.state.orgUnits}
                                 periods={this.state.periodTypes}
                                 navBarValue={this.state.navBarValue}
                                 programs={this.state.programGroups}
                                 headerProps ={this.state.dashboards} className="mt-5"/>
                </div>
            </Fragment>

             */
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
