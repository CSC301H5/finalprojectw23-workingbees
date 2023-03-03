import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
import expressWs from 'express-ws'; // must be done before routing is loaded as per docs.
expressWs(app);


import testRoutes from './routes/test.js';
import apiV1routes from './routes/apiV1.js';
import {registerWS, unregisterWS} from './utils/wsutils.js'

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/test', testRoutes);
app.use('/api/v1', apiV1routes);

const MONGO_CONNECTION_URL = process.env.MONGO_CONNECTION_URL
const PORT = process.env.PORT || 3030;

mongoose.set('strictQuery', false); // supress warnings

mongoose.connect(MONGO_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Running on p${PORT}`)))
    .catch((err) => console.log(err.message));

// Websocket registration.
app.ws('/initializeWS', async function(ws, req) {

    ws.on('open', function() {
        console.log("Opened WS connection");
    })

    var userID;
    ws.on('message', async function(message) {
        console.log("RECEIVED MESSAGE: " + message)
        var msg;
        try {
            msg = JSON.parse(message); // expect a hiveID and a token
        } catch (e) {
            console.error("Could not parse message to JSON")
            ws.close(); // failed to parse json
            return;
        }
        
        if (msg.event && msg.event == "REGISTER") {
            userID = await registerWS(ws, msg)
            console.log("index.js got userID " + userID)
            if (!userID) { // failed to register.
                console.log("Failed to register.")
                ws.close()
                return;
            } else {
                console.log("Registration success")
                ws.registered = true;
                // successfully registered. unregister when they close the connection.
                ws.on('close', function() {
                    console.log("Closed, unregistering.")
                    unregisterWS(userID, ws);
                })
            }
        } else {
            // if they aren't registered, close the connection.
            console.log("Not a register event.")
            setTimeout(()=>{
                if (!ws.registered) {
                    ws.close()
                    console.log("Socket did not register in 5 seconds. Disconnecting.")
                }
            }, 5000) // if they do not register within 5 seconds of connecting, we disconnect them to prevent holdup.
        }
    })
})