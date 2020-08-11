import React, {Component, Fragment, PureComponent} from 'react';
import Api from './api'
import './App.css';
import NavBar from './components/NavBar'
import Sidebar from "./components/SideBar";
import TransferList from "./components/TransferList";
import CustomTransferList from "./components/CustomTransferList";
import BoxComponent from "./components/BoxComponent";


class App extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            dashboards: [],
            isLoaded: false,
            navBarValue: "",
        };


    }



    componentDidMount(){

        Api.getDashboards()
            .then((result) => {

                console.log(result)
                this.setState({
                    isLoaded: true,
                    dashboards: result.indicators
                });
            })
            .catch(error => {
                console.error('Error during data retrieval:', error);
            });
    }

    mainCallBack = (dataFromChild) => {
        console.log(dataFromChild);
        this.setState({
            navBarValue : dataFromChild,
        });
    }


    render() {

        var navigate = this.state.navBarValue

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
                            <TransferList headerProp ={this.state.dashboards}/>
                        </div>

                    </div>
                </Fragment>

            )
        }



    }
}

export default React.memo(App);
