import stylesheet from './index.scss'
import io from 'socket.io-client'
import fetch from 'isomorphic-fetch'
import React, {Component} from "react";

import 'c3/c3.css';
import SocketConnector from "../components/SocketConnector";

import Timeseries from "../components/Timeseries";


class App extends Component {

    static async getInitialProps({req}) {
        const response = await fetch('http://localhost:3000/events/totalMessagesPerDay')
        const messages = await response.json();

        return {messages}
    }

    state = {
        socket: null
    };


    // connect to WS server and listen event
    componentDidMount() {
        const socket = io();
        this.setState({...this.state, socket});
    }

    componentWillUnmount() {
        this.state.socket.close();
    }


    render() {
        return (
            <div>
                <style dangerouslySetInnerHTML={{__html: stylesheet}}/>
                <div >Page loaded</div>
                <div>
                    <p> Total battery low events per day</p>
                    <Timeseries messages={this.props.messages}
                                eventName={"totalMessagesPerDay"}
                                socket={this.state.socket}
                                xFormat={'%Y-%m-%d %H:%M:%S'}
                                format={ '%Y-%m-%d'} x={"time"} y={"count"}
                    />
                </div>

                {/*<Timeseries eventName={"averageEventsPerDay"} socket={this.state.socket} />*/}




            </div>
        )
    }
}

export default App;