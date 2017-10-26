const {calculateTotalMessagesPerDay} = require( "./lib/messageService");

const app = require('express')()
const bodyParser = require('body-parser')
const EventEmitter = require('events');


const server = require('http').Server(app)
const io = require('socket.io')(server)
// const ioClient  = require('socket.io-client')('http://localhost:3000');
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

// fake DB
const messages = []

// socket.io server
// io.on('connection', socket => {
//     socket.on('message', (data) => {
//         messages.push(data)
//         socket.broadcast.emit('message', data)
//     })
//
//
// })






const messagesEventemitter = new EventEmitter();
messagesEventemitter.on('messageReceived', (events) => {


    const messagesPerDayObj = calculateTotalMessagesPerDay(messages);
    const messagesPerDay = Object.keys(messagesPerDayObj).map((messageTime) =>messagesPerDayObj[messageTime] );

    console.log('messagesPerDay',messagesPerDay,  messagesPerDayObj);
    io.emit('totalMessagesPerDay', messagesPerDay);

});





//Total battery low events received per day
//Average battery level received per day

const   jsonParser = bodyParser.json()
nextApp.prepare().then(() => {
    app.get('/events/totalMessagesPerDay', (req, res) => {
       if(messages.length) {
           const messagesPerDayObj = calculateTotalMessagesPerDay(messages);
           const messagesPerDay = Object.keys(messagesPerDayObj).map((messageTime) =>messagesPerDayObj[messageTime] );
           res.send(messagesPerDay);

       } else {
           res.send(messages);
       }

    })


    app.post('/event', jsonParser,(req, res) => {
        try {
            const {events} = req.body;
            if (events && Array.isArray(events)) {
                events.forEach((event) => {
                    if(!event.hasOwnProperty('time') ||  !event.hasOwnProperty('level') || !event.hasOwnProperty('uniqueDeviceId')) {
                        throw {code: 400, message: 'Event need to have "time" and "level" attributes'}
                    }
                    messages.push(event);



                });
                messagesEventemitter.emit('messageReceived', events);
            } else {
                throw {code: 400, message: 'Please send request with events.'}
            }
        } catch(e) {
            console.log(e);

            res.status(e.code || 500).send(e.message);
        }
        res.status(200).json({"message": "Successfully added events"})


    });

    app.get('*', (req, res) => {
        return nextHandler(req, res)
    })

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})