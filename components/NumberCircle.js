import React, {Component} from "react";
import SocketConnector from "./SocketConnector";

class NumberCircle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            number: props.number || 0
        }
    }

    // add events from server to the state
    handleMessage = (value) => {
        this.setState({...this.state, ...{number: value}});
    }

    render() {

        return <div className={"numberCircle"}>{this.state.number}</div>
    }

}

export default SocketConnector(NumberCircle);