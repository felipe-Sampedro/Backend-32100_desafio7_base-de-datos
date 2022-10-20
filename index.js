const express = require("express");
const { Server: HttpServer } = require("http")
const { Server: SocketServer } = require("socket.io") 
// const path = require('path')
// const {engine:handlebars}=require('express-handlebars')
const Products = require('./model/products')
const { formatMessage } = require("./utils/utils");
// const productsRoutes = require('./routes')

const app = express()
const PORT = process.env.PORT || 8080
const httpServer = new HttpServer(app)
const io = new SocketServer(httpServer)
const productos = new Products()

// app.engine('hbs',handlebars({
//     extname:'hbs',
//     defaultLayout:'index.hbs',
//     layoutsDir: path.resolve(__dirname,'./views'),
//     partialsDir:path.resolve(__dirname,'./views/partials')
// }))

// app.set('views','./views');
// app.set('view engine','hbs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// app.get('/',(req,res)=>{
//     res.sendFile(__dirname + '/public/index.html')
// })

// app.use('/productos',productsRoutes)

// app.use((err, req, res, next) => {
// 	console.log(err);
// 	res.status(500).json({ err, message: 'Something went wrong, sorry' });
// });

httpServer.listen(PORT, ()=>console.log("Ready an running on port", PORT))

const messages =[]
const users =[]

// const botName = "Shut bot"

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