const PizzasServices = require("../services/PizzaServices")
pizzas = ('./databases/pizzas.json')
const bcrypt = require('bcrypt')
const session = require('express-session')

const fs = require('fs')

const AdmController = {
    listarPizzas: (req, res) => {
        //carregar as pizzas
        const pizzas = PizzasServices.carregarPizzas()
        const msg = req.query.msg

        //renderizar a view lista-de-pizzas, passando as pizzas pra ela
        res.render('lista-de-pizzas', {pizzas, msg})
    },
    criarPizza: (req, res) => {
        res.render('form-add-pizza')
    },
    gravarPizza: (req, res) => {

        // Quando o form é post os dados ficam no req.body
        // console.log(req.body)

        // Quando o form é get os dados ficam no req.query
        // console.log(req.query);

        // As informações podem vir como parâmetro de rota...
        // console.log(req.params)
        
        //renomear o arquivo
        
        console.log(req.file)

        let novoNome = `${Date.now()}-${req.file.originalname}`

        fs.renameSync(req.file.path, `public/img/${novoNome}`)

        let pizza = {
            nome: req.body.nome,
            ingredientes: req.body.ingredientes.split(',').map(e => e.trim()),
            preco: Number(req.body.preco),
            img: `/img/${novoNome}`,
            destaque: false,
            score: 0
        }

        PizzasServices.adicionarPizza(pizza);

        res.redirect('/adm/pizzas')
    },
    showEditPizza: (req, res) => {
        // capiturar o id da pizza a ser editada
        let {id} = req.params

        // buscar a pizza a ser editada
        const pizza = PizzasServices.carregarPizza(id)
        
        // alterar dados da pizza

        // renderizar a view edit pizza form-edit-pizza.ejs
        // passando a pizza para essa view
        res.render('form-edit-pizza', {pizza})

        //redirecionar para /update
    },
    editPizza: (req, res) => {
        let {id} = req.params

        console.log(req.params)

        let pizza = req.body

        PizzasServices.alterarPizza(id, pizza)

        res.redirect('/adm/pizzas')
    },
    showLogin: (req, res) => {
        res.render('login.ejs');
    },
    login: (req, res) => {

        // capturar o e-mail e a senha digitados pelo adm
       let { email, senha } = req.body

        // verificar a existencia do adm
        const administradores = require('../databases/administradores.json')

        let adm = administradores.find(adm => adm.email === email)

        if(adm === undefined){
            return res.send('Falha no login')
        }

        // caso não exista, mandar msg de erro


        // verificar senha
        // caso senha não seja valida, enviar msg de erro

        const senhaOk = bcrypt.compareSync(senha, adm.senha)

        if(!senhaOk){
            return res.send('Falha no login')
        }

        // criar a session/cookie do adm
        req.session.admLogado = true

        // redireciona-lo para /adm/pizzas
        res.redirect('/adm/pizzas')
    },
    delete: (req, res) => {
        // capturar o id da pizza
        const id = req.params.id

        // buscar pizza pelo id
        // deletar a pizza pelo id
        // salvar o array sem a pizza deletada no arquivo
        PizzasServices.removerPizza(id)

        // redirecionar para /adm/pizzas
        res.redirect('/adm/pizzas?msg=PizzaApagada')
    }
}

module.exports = AdmController