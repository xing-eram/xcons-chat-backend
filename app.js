const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
let cors = require('cors')

const AuthRoutes = require('./Routes/AuthRoutes');
const ChatRoutes = require('./Routes/ChatRoutes');
const SocketClass = require('./SocketService/SocketService');

// integrar (express.js) y (socket.io) para la server connection 
let app = express();
let server = require('http').createServer(app);

// inicializar socket.io + ponerlo dentro de la app
// para que se pueda usar las routes con: app.get()
// checar las ChatRoutes.js linea 32 
app.set("socketService", new SocketClass(server)); 
app.use(bodyParser.json());
app.use(cors());

app.use('/Auth', AuthRoutes);
app.use('/Chat', ChatRoutes);

mongoose.connect('mongodb+srv://eram-xing:Eram5278@cluster0.wvhvxo4.mongodb.net/?retryWrites=true&w=majority')
.then((res) => {
    server.listen(8000);
    console.log('Connected')
})
.catch(err => console.log(err))