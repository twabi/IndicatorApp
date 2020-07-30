import React, {Component} from 'react'
import Api from "../api";


class MainContent extends Component {
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



    render(){
        return (
            <div className="mainContent">
                <h2>Indicators shortName</h2>
                <ul>
                    {this.state.dashboards.map(item => (
                        <li key={item.id}>
                            {item.id} {item.displayName}
                        </li>
                    ))}
                </ul>

            </div>


        );
    }

}

export default MainContent