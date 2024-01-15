const express = require('express');
const router = express.Router();
const categoria = require("../controller/CategoriaController.js");
const financa = require('../controller/FinancaController.js');

// padrão Rest
// categoria
router.post('/criar/categoria', categoria.create);
router.get('/listar/categoria/:page', categoria.findAll);
router.put('/atualizar/categoria/:id', categoria.update);
router.delete('/deletar/categoria/:id', categoria.delete)

// Finanças
router.post('/criar/financa', financa.create);
router.get('/listar/financa/:page', financa.findAll);
router.get('/pesquisar/financa/categoria_id/:id', financa.findById);
router.get('/listar/financa/dataInicial/:dataInicial/dataFinal/:dataFinal/page/:page', financa.findAllDate);
router.put('/atualizar/financa/:id', financa.update);
router.delete('/deletar/financa/:id', financa.delete)

module.exports = router;