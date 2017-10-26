

import React from 'react'
import io from 'socket.io-client'

import { render, configure } from 'enzyme'
import  Adapter from 'enzyme-adapter-react-16'
import C3Chart from 'react-c3js';

import Timeseries from "../../components/Timeseries";

configure({ adapter: new Adapter() })

describe('With Enzyme', () => {

    const messages = [{"uniqueDeviceId": "1", "time": "2017-10-02 13:10:02", "count": 15} ];
    const socket = io();

    it('App shows "Time Series"', () => {
        const app = render(<Timeseries

            messages={messages}
            eventName={"totalMessagesPerDay"}
            socket={socket}
            xFormat={'%Y-%m-%d %H:%M:%S'}
            format={ '%Y-%m-%d'} x={"time"} y={"count"}
        />);
        expect(app.find('No data').length).toBe(0);
    })
});
