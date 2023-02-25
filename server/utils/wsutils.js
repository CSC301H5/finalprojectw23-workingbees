
import HiveModel from '../models/hiveModel.js';
import jwt from 'jsonwebtoken';

var connections = {} // {hiveID: {userID: wsOfUserID, userID2: wsOfUserID2, ...}, 
                     //  hiveID2: {...}, 
                     //  ...}

var connectedUserIDs = {} // key: userID, value: hiveID that they are connected to.


export async function registerWS(ws, msg) {
    // return userID if successfully registered, false otherwise.

    // make sure they provided a hiveID and a token
    var hiveID = msg.hiveID;
    var token = msg.token;
    var userID;
    if (!hiveID) return false;
    if (!token) return false;
    hiveID = hiveID.toLowerCase();
    
    // check to see token validity.
    try {
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                console.error("Errored when authenticating websocket.");
                return false; // failed to authenticate.
            } else {
                console.log("JWT verification success");
                console.log("USERID ", userID);
                // success
                userID = decoded.userID.toLowerCase();
            }
        });
    } catch (e) {
        console.error('WEBSOCKET AUTH ERROR');
        console.error(e);
        return false; // failed.
    }

    // test that some hive with that hiveID exists.
    let hive;
    try {
        hive = await HiveModel.findById(hiveID);
        if (!hive) return false; 
    } catch (e) {
        console.log("Couldn't find hive")
        return false;
    }
    // checks passed, allow them to connect.

    // if they already are connected via websocket, close their prior connection.
    var currentHiveID = connectedUserIDs[userID];
    if (currentHiveID) {
        // disconnect their previous socket.
        console.log("Disconnecting previous")
        await connections[currentHiveID][userID].close();
        
    }

    // no ongoing connection, valid hive provided, so we can initialize the connection.

    if (!connections[hiveID]) {
        connections[hiveID] = {};
    }
    connections[hiveID][userID] = ws;
    connectedUserIDs[userID] = hiveID;
    setTimeout(()=>{
        console.log("Registered socket user " + userID + " to hive " + hiveID);
        console.log("Connections: " + connections[hiveID][userID]);
        console.log("connectedUserIDs: " + connectedUserIDs[userID]);
    }, 500)
    
    return userID;
}

export function unregisterWS(userID, ws) { // assumes close() was called already.
    try {
        var currentHiveID = connectedUserIDs[userID];
        if (!currentHiveID) return; // not actually connected
        if (connections[currentHiveID][userID] != ws) return; // may have been replaced by another websocket connection for same user to same hive. Had this happen because of async js shenanigans, this is the easiest fix I could figure out.
        delete connectedUserIDs[userID];
        delete connections[currentHiveID][userID];
    } catch (e) {}

}

// helpers 
export function getSocketsInHive(hiveID) { // returns a JSON object of form (userID: websocket) for all userIDs connected to the specified hive.
    if (!connections[hiveID]) {
        return {}
    } else {
        return connections[hiveID];
    }
}

export function getCurrentHiveOfUser(userID) { // returns the hiveID that the specified userID is currently listening to events on. 
    return connectedUserIDs[userID];
}

export function getSocketOfUser(userID) { // returns the websocket of the user with the specified userID, or null if they are not connected.
    var hiveID = getCurrentHiveOfUser(userID)
    if (!hiveID) {
        return null;
    } else {
        return connections[hiveID][userID];
    }
}