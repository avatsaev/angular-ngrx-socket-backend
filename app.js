
const express = require('express');
const socketio = require('socket.io');
const _ = require('lodash');
const actions = require('./actions');


const port = process.env.PORT || 3003;
const env = process.env.NODE_ENV || "development";

const app = express();

app.set('port', port);
app.set('env', env);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



const router = express.Router();              // get an instance of the express Router


router.get('/', (req, res) => {
    res.json({ health: 'OK' });
});


app.use('/', router);

const server = app.listen(app.get('port'), () => {
    console.log('SocketIO server listening on port ' + app.get('port'));
});

const io = socketio(server, {'origins': '*:*'} );


const db = {
    posts: {},
    notes: {}
};

createNote = (newNote) => {};


io.on('connection', (client) =>{

    console.log("client connected...");

    client.on("join", (data) => {
        console.log(data);
        console.log(`user ${data.username} tries to join ${data.room}`);
        if(['notes', 'posts'].includes(data.room)){
            console.log(`client joined ${data.room}`)
            client.join(data.room);
        }else{
            console.warn('unknown channel')
        }
    });



    client.on("addNote", (note) => {

        console.log('add note', note);
        db[note.id] = note;
        client.to('notes').emit(actions.NOTE_ADDED, note);

    });


    client.on('disconnect', () => {
        console.log('client disconnected')

    });

});

