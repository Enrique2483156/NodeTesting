require("dotenv").config(); // Para utilizar variables de entorno.



const express = require("express");
const app = express();


app.use(express.json());


// Datos de prueba.

let videoJuegos = [

    {id:1,titulo: "call of duty 1",precio: 10.30},
    {id:2,titulo: "call of duty 2",precio: 14.30},
    {id:3,titulo: "call of duty 3",precio: 214.30},
    {id:4,titulo: "call of duty 4",precio: 342.30},
    {id:5,titulo: "call of duty 5",precio: 546.30},
    {id:6,titulo: "call of duty 6",precio: 657.30}
];

app.use(express.static("public"));

/*
app.get("/",(req, res) => {
    //return res.json(videoJuegos);
    //return res.send("Hola este es un cambio");

});
*/

app.get("/mygames", (req,res) => {
    
    return res.json([
        videoJuegos[0],
        videoJuegos[1]
    ]);

});


const PORT = process.env.PORT || 3001;



app.listen(PORT, () => {
    console.log("Escuchando desde el server");
});





