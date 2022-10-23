const express = require("express");
const { Server: HttpServer } = require("http")
const { Server: SocketServer } = require("socket.io") 
const SQLClients = require('./db/clients/sql.clients')
const dbConfig = require('./db/config')
const Products = require('./model/products')
const { formatMessage } = require("./utils/utils");

const app = express()
const PORT = process.env.PORT || 8080
const httpServer = new HttpServer(app)
const io = new SocketServer(httpServer)
const db = new SQLClients(dbConfig)
const productos = new Products()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


httpServer.listen(PORT, ()=>console.log("Ready an running on port", PORT))

const messages =[]
const users =[]


// Socket Events

io.on('connection',(socket) =>{
    console.log("A New Client Conection");

    console.log(socket.id);
    console.log(socket.username);

    socket.emit('products', productos.getAll());

    socket.on('newProduct', (newProduct) =>{
        productos.save(newProduct);
        io.sockets.emit('products', productos.getAll());        
    });       

    io.emit("message", [...messages]);

    socket.on('newUser', (username) =>{
        const newUser = {
            id: socket.id,
            username: username,
        }
        users.push(newUser);
    });

    socket.on("newMessage", (data) =>{
        const user = users.find(user => user.id === socket.id);
        const newMessage = formatMessage(socket.id, user.username, data);
        messages.push(newMessage);
        console.log(user.username);
        io.emit('chatMessage', newMessage);
    });
});