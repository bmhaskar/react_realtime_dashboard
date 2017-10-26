

import React from 'react'
import renderer from 'react-test-renderer'
import { shallow, configure } from 'enzyme'
import  Adapter from 'enzyme-adapter-react-16'

import App from '../../pages/index.js'
import Timeseries from "../../components/Timeseries";

configure({ adapter: new Adapter() })

describe('With Enzyme', () => {
    it('App shows up correctly ', () => {
        const app = shallow(<App />);
        expect(app.find(Timeseries).length).toBe(1);
    })
});


// describe('With Snapshot Testing', () => {
//     it('App shows "Hello world!"', () => {
//         const component = renderer.create('<App />')
//         const tree = component.toJSON()
//         expect(tree).toMatchSnapshot()
//     })
// })