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
            });


        fetch(`https://www.namis.org/namis1/api/29/organisationUnits.json?paging=false&fields=name&fields=id&fields=level`, {
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
                this.setState({
                    orgUnits : result.organisationUnits
                });

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
            });

    }

    mainCallBack = (dataFromChild) => {
        console.log(dataFromChild);
        this.setState({
            navBarValue : dataFromChild,
        });
    }

    render() {


        /*
        * <MainContent cropOptions={this.state.cropOptions}
                                 errorMessage={this.state.errorMessage}
                                 isLoaded={this.state.isLoaded}
                                 headerProps ={this.state.dashboards} className="mt-5"/>*/

        return (
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
        )

/*

        if(navigate==="Time periods"){

            return (
                <Fragment>
                    <div >
                        <NavBar callerBack={this.mainCallBack}/>

                        <h3>Time periods</h3>

                    </div>
                </Fragment>

            )
        }
        else if(navigate==="Custom Reports"){

            return (
                <Fragment>
                    <div className="bg-grey">
                        <NavBar callerBack={this.mainCallBack}/>
                        <BoxComponent className="mt-4"/>
                    </div>
                </Fragment>

            )
        }
        else if(navigate==="Analysis"){

            return (
                <Fragment>
                    <div >
                        <NavBar callerBack={this.mainCallBack}/>

                        <h3>Analysis</h3>
                    </div>
                </Fragment>
            )
        }
        else {
            return (
                <Fragment>
                    <div >
                        <NavBar callerBack={this.mainCallBack}/>
                        <div className="rowC">
                            <TransferList
                                cropOptions={this.state.cropOptions}
                                errorMessage={this.state.errorMessage}
                                isLoaded={this.state.isLoaded}
                                          headerProps ={this.state.dashboards}/>
                        </div>

                    </div>
                </Fragment>

            )
        }

 */



    }
}

export default React.memo(App);
