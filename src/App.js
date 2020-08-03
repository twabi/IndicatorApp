import React, {Component, Fragment, PureComponent} from 'react';
import Api from './api'
import './App.css';
import NavBar from './components/NavBar'
import Sidebar from "./components/SideBar";
import TransferList from "./components/TransferList";
import CustomTransferList from "./components/CustomTransferList";


class App extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            dashboards: [],
            isLoaded: false
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

    render() {

        return (
            <Fragment>
                <div >
                    <NavBar named ="Indicator App for NAMIS"/>
                    <div className="rowC">
                        <Sidebar/>
                        <TransferList headerProp ={this.state.dashboards}/>
                    </div>

                </div>
            </Fragment>

        )

    }
}

export default React.memo(App);
