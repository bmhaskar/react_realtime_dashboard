const { createServer } = require('http');
const url = require('url');

const express = require('express');
const WebSocket = require('ws');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const app = express();

        // app.get('/a', (req, res) => {
        // return app.render(req, res, '/b', req.query)
        // })

        // app.get('/b', (req, res) => {
        //     return app.render(req, res, '/a', req.query)
        // })
        //
        app.get('*', (req, res) => {
            return handle(req, res)
        })



        const server = createServer(app);
        const wss = new WebSocket.Server({ server });

        wss.on('connection', function connection(ws, req) {
            const location = url.parse(req.url, true);
            // You might use location.query.access_token to authenticate or share sessions
            // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

            ws.on('message', function incoming(message) {
                console.log('received: %s', message);
            });

            ws.send('something');
        });

        server.listen(port, (err) => {
            if (err) throw err
            console.log(`> Ready on http://localhost:${port}`)
        })


    });