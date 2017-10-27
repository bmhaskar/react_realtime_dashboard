# react_realtime_dashboard
React SSR and realtime dashboard with socket.io.

[![Build Status](https://travis-ci.org/bmhaskar/react_realtime_dashboard.svg?branch=master)](https://travis-ci.org/bmhaskar/react_realtime_dashboard)

It is an example to demonstrate implementation for realtime dashboard building.


### Demo 
[Demo](https://reactrealtimedashboard-goqltamcsv.now.sh )
 
#### Libraries 
1. React - For frontend rendering
2. Next.js - For server side rendering
3. C3.js - For visualisation / chart
4. Socket.io - For real-time behaviour
5. Express - For server request processing 
6. Jest - For testing

### Dir Structure
 1. lib/ - contains server side code 
 2. components/ - contains the internal reusable components 
 3. pages/ - contans tha containers which get data from server in SSR with the help of _getInitialProps_
 4. \__tests\__/ - contains the tests  

#### How to run tests 
<code>
 yarn run test
</code>

#### How to run tests and collect coverage 
<code>
 yarn run test-coverage
</code>

#### How to start development server 
<code >
 yarn run dev
</code>

#### How to export a build 
<code >
 yarn run build 
</code>

#### How to start production server  
<code >
 yarn run start  
</code>


#### How to send a request to update dashboard 
<code>
curl -X POST \
  https://reactrealtimedashboard-xxjtdcbakd.now.sh/event \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: d5c0c816-26c8-3866-ae49-7fbe394c743a' \
  -d '{"events": [{"uniqueDeviceId": "1", "time": "2017-10-23 18:10:02", "level": 15}] }'
</code>


 
 
