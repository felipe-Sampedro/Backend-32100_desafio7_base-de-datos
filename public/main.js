const socket = io()
const prod = document.getElementById("productos");
const prodForm = document.getElementById("productsForm")
const nameInput = document.getElementById("nombre");
const priceInput = document.getElementById("precio");
const imageInput = document.getElementById("imagen");
const mens = document.getElementById('mens');
const messagesForm = document.getElementById('formMessages');
const emailImput = document.getElementById('email');
const messageImput = document.getElementById('message');


prodForm.addEventListener("submit", (event) =>{
    event.preventDefault();
    const nombre = nameInput.value
    const precio = priceInput.value
    const imagen = imageInput.value
    const newProduct = {
        nombre,
        precio,
        imagen
    }   
    socket.emit("newProduct", newProduct)
    nameInput.value ="";
    priceInput.value ="";
    imageInput.value ="";    
})


socket.on('products', (products) => {
    console.log(products);
     fetch('list.hbs').then((data) =>data.text())
        .then((s_Template) =>{
            const template = Handlebars.compile(s_Template);
            const html = template({products});
            prod.innerHTML = html;
        })  
});

messagesForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = emailImput.value.toUpperCase();
    const message = messageImput.value;

    socket.emit('newUser', username); 
    socket.emit('newMessage', message);
});

socket.on("message", (data) => {
    const html = data.map((user) => {
        let renderMessage = ` <p style="padding-top: 0.5rem"><b>
                                <span style="color: blue">${user.username}</b></span> 
                                <span style="color: brown">[${user.time}]:</span> 
                                <span style="color: green"><i>${user.text}</i></span></p>
                                `;        
        return renderMessage;
      })
      .join("\n");
    document.getElementById("mens").innerHTML = html;
    
  });

socket.on('chatMessage', (data) =>{
    const user = data.username;
    const message = data.text;
    let renderChat = ` <p style="padding-top: 0.3rem"><b>
                        <span style="color: blue">${user}</b></span> 
                        <span style="color: brown">[${data.time}]:</span> 
                        <span style="color:green"><i>${message}</i></span></p>`;

    document.getElementById("mens").innerHTML += renderChat    
});
