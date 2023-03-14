const path = require('path');
const idu = 2;

const PaginasController = {

    showIndex: (req, res)=>{
        // return res.sendFile(path.resolve("views/index.html"));
        return res.render('index.ejs');
    },

    showCarrinho: (req, res)=>{
        let carrinho = [
            {
                "id": 1,
                "nome": "Calabresa",
                "ingredientes": [
                    "mussarela",
                    "calabresa",
                    "cebola"
                ],
                "preco": 38.5,
                "img": "/img/calabresa.jpg",
                "destaque": true,
                "score": 27
            },
            {
                "id": 2,
                "nome": "Jaca",
                "ingredientes": [
                    "mussarela",
                    "calabresa",
                    "cebola"
                ],
                "preco": 38.5,
                "img": "/img/calabresa.jpg",
                "destaque": true,
                "score": 27
            },
            {
                "id": 3,
                "nome": "Cogumelo",
                "ingredientes": [
                    "mussarela",
                    "calabresa",
                    "cebola"
                ],
                "preco": 38.5,
                "img": "/img/calabresa.jpg",
                "destaque": true,
                "score": 27
            }
        ]
        let nomeDoUsuario = "Ligia Pretel";
        return res.render('carrinho.ejs', {carrinho, nomeDoUsuario});
    },

    showPerfil: (req, res)=>{
        const usuarios = require('../databases/usuarios.json');
        const usuario = usuarios.find(u => u.id == idu);

        if(usuario !== undefined){
            return res.render('perfil.ejs', {usuario});
        } else {
            return res.render('erro-404.ejs');
        }
        
    },

    showCadastro: (req, res)=>{
        return res.sendFile(path.resolve("views/cadastro.html"));
    },

    showPizza: (req, res) => {
        let id = req.params.idDaPizza;
        const pizzas = require('../databases/pizzas.json');
        const pizza = pizzas.find( p => p.id == id);
        return res.render('pizza.ejs', {pizza})
    }

}



module.exports = PaginasController;