import React, {Component} from "react";

import PropTypes from "prop-types";

const  SocketConnector = function(WrappedComponent) {
    return class wrapper extends Component {

         proc(warpperComponentInstance) {
             this.child = warpperComponentInstance;
         }

        // connect to WS server and listen event
        componentWillReceiveProps(nextProps) {
            if (nextProps.socket) {
                nextProps.socket.on(this.props.eventName, (message) => {
                    this.child.handleMessage(message)
                })
            }

        }

        // close socket connection
        componentWillUnmount() {
            this.props.socket.off(this.props.eventName, this.child.handleMessage);
        }


        render() {
            const props = Object.assign({}, this.props, {ref: this.proc.bind(this)});
            return <WrappedComponent {...props} />
        }
    };
};



export default SocketConnector;