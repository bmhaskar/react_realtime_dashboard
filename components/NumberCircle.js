import React, {Component} from "react";
import SocketConnector from "./SocketConnector";
import stylesheet from './NumberCircle.scss'


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

        return (
            <div>
                <style dangerouslySetInnerHTML={{__html: stylesheet}}/>
                <div className={"numberCircle"}>{this.state.number}</div>
            </div>
        )
    }

}

export default SocketConnector(NumberCircle);