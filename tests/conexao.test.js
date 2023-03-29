//importando o sequelize

const sequelize = require('sequelize')

// importar configurações

const config = require('../databases/config').development

// criar a conexão com o banco de dados

const conexao = new sequelize(config)

// executando uma consulta

const sql = (`SELECT
                p.id,
                p.nome,
                ifnull(SUM(pp.quantidade), 0) as quantidade
            FROM
                pizzas as p
                LEFT JOIN pedido_pizza as pp ON p.id = pp.pizza_id
                group by p.id, p.nome;`)

const promessa = conexao.query(sql)

promessa.then(
    dados => {
        console.log(dados)
    })
