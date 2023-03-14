// 1 - Importar o express
const express = require('express');
const path = require('path');
const router = require('./router');


// 2 - Criar o servidor
const servidor = express();
servidor.set('view engine','ejs');

const methodOverride = require('method-override');
const registraReq = require('./middlewares/registraReq');
const session = require('express-session');
// const bloqueiaForaDeHora = require('./middlewares/bloqueiaForaDeHora');


// setup do middleware que lida com as sessions
servidor.use(session({
    secret: 'SEGREDO',
    resave: false,
    saveUninitialized: false
}))

// Define a pasta public como sendo a pasta arquivos estáticos
servidor.use(express.static(path.join(__dirname, 'public')))

servidor.use(express.urlencoded({ extended: false }));

// configurando middlewares
servidor.use(registraReq)
// servidor.use(bloqueiaForaDeHora)

// 3 - Definir roteador a ser utilizado
servidor.use(router);
servidor.use(methodOverride('_method'))

// 4 - Por o servidor no modo "aguardando requisição"
servidor.listen(3000);