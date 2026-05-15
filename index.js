const express = require("express");
const jwt= require("jsonwebtoken");
const bcrypt = require("bcryptjs");

require("dotenv").config();

const app = express();

app.use(express.json());

//simulamos base de datos.
const usuarios = [];

//REGISTRO
app.post("/register",async (req,res) => {
    const {email,password} = req.body;
    //hash password.
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    const usuario = {
        id: Date.now,
        email,
        password: hashedPassword
    };
    usuarios.push(usuario);
    res.json({mensaje: "Usuario registrado"});
});

//Login genera el JWT

app.post("/login",async (req,res) => {
    const {email, password} = req.body;
    const usuario = usuarios.find(u=>u.email === email);

    if (!usuario)
    {
        return res.status(400).json({mensaje: "Uusario no existe"});
    }

    const passwordValida = await bcrypt.compare(password,usuario.password);

    if (!passwordValida){
        return res.status(401).json({mensaje: "Password incorrecta"});
    }

    //generar JWT
    const token = jwt.sign({id:usuario.id,email:usuario.email},process.env.JWT_SECRET,{expiresIn: "1hr"});

    res.json({token});
});

//middleware de seguridad
function authMiddleware(req,res,next){
    const header  = req.headers.authorization;
    if (!header){
        return req.status(401).json({mensaje: "Token requerido"});
    }

    const token = header.split("")[1]; // bearer token

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.usuario = decoded;
        next();
    }catch(error)
    {
        return res.status(401).json({mensaje: "token invalido o expirado"});
    }
}


//ruta protegida

app.get("/perfil",authMiddleware,(req,res) =>{
    res.json({
        mensaje: "acceso permitido",
        usuario: req.usuario
    });
});

//Server:

app.listen(3000,()=>{
    console.log("Servidor en http://localhost:3000");
});
