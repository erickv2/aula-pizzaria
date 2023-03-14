// Importar o express
const express = require('express');
const AdmController = require('./controllers/AdmController');
const PaginasController = require('./controllers/PaginasController');
const PizzasController = require('./controllers/PizzasController')
const multer = require('multer')
const fabricaDeMiddleware = multer({dest:'public/img'})
const verificaSeLogado = require('./middlewares/verificaSeLogado')

// Criar o roteador
const router = express.Router();

// Definir as rotas para o roteador
router.get('/', PaginasController.showIndex)
router.get('/carrinho', PaginasController.showCarrinho)
router.get('/perfil', PaginasController.showPerfil);
router.get('/cadastro', PaginasController.showCadastro);
router.get('/pizzas/:idDaPizza', PaginasController.showPizza);
router.get('/api/pizzas', PizzasController.index);

router.get('/adm/login', AdmController.showLogin)
router.post('/adm/login', AdmController.login)  

router.use('/adm', verificaSeLogado)

router.get('/adm/pizzas', AdmController.listarPizzas) // mostrar lista de pizzas cadastradas
router.get('/adm/pizzas/create', AdmController.criarPizza) //mostrar form pra add a pizza
router.get('/adm/pizzas/:id/edit', AdmController.showEditPizza) //form para editar pizza
router.post('/adm/pizzas/store', fabricaDeMiddleware.single('img'), AdmController.gravarPizza) //receber informações digitadas pelo usuário para criação de uma pizza
router.post('/adm/pizzas/update', AdmController.editPizza) //receber info digitada para edição de uma pizza
router.get('/adm/pizzas/:id/delete', AdmController.delete) //remover id da pizza a ser removida



// Exportar o roteador
module.exports = router;