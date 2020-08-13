import React, {Fragment, PureComponent} from 'react';
import Api from './api'
import './App.css';
import NavBar from './components/NavBar'
import TransferList from "./components/TransferList";
import BoxComponent from "./components/BoxComponent";


class App extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            dashboards: [],
            isLoaded: false,
            errorMessage: "",
            navBarValue: "",
            cropOptions: [],
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
                    cropOptions : optionArray
                });
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
                            <TransferList
                                cropOptions={this.state.cropOptions}
                                errorMessage={this.state.errorMessage}
                                isLoaded={this.state.isLoaded}
                                          headerProp ={this.state.dashboards}/>
                        </div>

                    </div>
                </Fragment>

            )
        }



    }
}

export default React.memo(App);
