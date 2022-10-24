const express = require("express");
const { Server: HttpServer } = require("http")
const { Server: SocketServer } = require("socket.io") 
const SQLClient = require('./db/clients/sql.clients')
const dbConfig = require('./db/config')
const Products = require('./model/products')
const { formatMessage } = require("./utils/utils");

const app = express()
const PORT = process.env.PORT || 8080
const httpServer = new HttpServer(app)
const io = new SocketServer(httpServer)
const mariaDB = new SQLClient(dbConfig.mariaDB)
const sqliteDB = new SQLClient(dbConfig.sqlite);

const productos = new Products()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


httpServer.listen(PORT, ()=>console.log("Ready an running on port", PORT))

// const messages =[]
const users =[]


// Socket Events

io.on('connection',(socket) =>{
    console.log("A New Client Conection");
    console.log(socket.id);

    // socket.emit('products', productos.getAll());
    mariaDB.createTableProducts("productos")
    .then(console.log('table created'));

    mariaDB.getRecords("productos")
        .then((data) =>{socket.emit('products',data)})
    

    socket.on('newProduct', (newProduct) =>{
        mariaDB.insertRecords("productos", newProduct);
        mariaDB.getRecords("productos")
        .then(data =>{            
            socket.emit('products',data)});       
    });       


    // io.emit("message", [...messages]);
    sqliteDB.createTableMessagges("mensajes")
    .then(console.log('table messages created'));;

    sqliteDB.getMessages("mensajes")
        .then((data) => io.emit('message', data));

    socket.on('newUser', (username) =>{
        const newUser = {
            id: socket.id,
            username: username,
        }
        users.push(newUser);
    });

    socket.on("newMessage", (data) =>{
        const user = users.find(user => user.id === socket.id);
        console.log('nombre de usuario' + user.username);
        const newMessage = formatMessage(user.username,data);
        sqliteDB.insertRecords('mensajes', newMessage)
        console.log(user.username);
        io.emit('chatMessage', newMessage);
    });
});




