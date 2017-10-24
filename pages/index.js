import stylesheet from './index.scss'

import React, {Component} from "react";

import C3Chart from 'react-c3js';
import 'c3/c3.css';

const data = {
    data: {
        x: 'x',
        columns: [
            ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
            ['Battery',0 ,10, 20, 15,30],

        ]
    },
    axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%Y-%m-%d'
            }
        }
    },
    size: {
        width: 640,
        height:480

    },
    zoom: {
        enabled: true
    }
};
console.log(stylesheet);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <div>
                <style dangerouslySetInnerHTML={{ __html: stylesheet }} />

                <C3Chart  {...data} />
            </div>
        )
    }
}
export default App;