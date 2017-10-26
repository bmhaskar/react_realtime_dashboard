import React, {Component} from "react";
import C3Chart from 'react-c3js';
import PropTypes from "prop-types";
import SocketConnector from "./SocketConnector";

class Timeseries extends Component {


    constructor(props) {

        super(props);
        this.state = {
            chartOptions: {
                padding:{
                  right:40,
                    left:40
                },
                data: {
                    x: 'x',
                    xFormat: props.xFormat || '%H:%M:%S',
                    columns: [
                        ['x'],
                        ['Battery']

                    ]
                },
                axis: {
                    x: {
                        type: 'timeseries',
                        tick: {
                            format: props.format || '%H:%M:%S',
                            rotate: 75,
                            multiline: false
                        }
                    }
                },
                size: {
                    width: 640,
                    height: 480

                },
                zoom: {
                    enabled: true
                }
            }
        };

        if(props.messages) {
            const chartOptions = this.mapEventsToColumns(props.messages);
            this.state = {chartOptions};
        }

    }

    // add events from server to the state
    handleMessage = (message) => {
        const chartOptions = this.mapEventsToColumns([message]);
        this.setState({...this.state, ...{chartOptions}});
    }


    mapEventsToColumns(events) {

        let chartOptions = {...this.state.chartOptions};

        const {x, y} = this.props;

        const mapEvent = eve => {
            const xEntry = eve[x] || eve.time;
            const xEntryIndex =  chartOptions.data.columns[0].indexOf(xEntry);
            if(xEntryIndex != -1) {
                chartOptions.data.columns[1][xEntryIndex] = eve[y] || eve.level;
            } else {
                chartOptions.data.columns[0] = chartOptions.data.columns[0].concat(eve[x] || eve.time);
                chartOptions.data.columns[1] = chartOptions.data.columns[1].concat(eve[y] || eve.level);
            }
        }
        events.map((event) => {
            if(Array.isArray(event)) {
               event.forEach(mapEvent)
            } else {
                mapEvent(event)


            }
        });


        return chartOptions;
    }


    render() {


        if (this.state.chartOptions.data.columns[0].length > 1) {
            return (
                <C3Chart {...this.state.chartOptions} />
            )
        } else {
            return (<p>No data</p>);
        }
    }

}

export default SocketConnector(Timeseries);