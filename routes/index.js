const express = require('express');
const router = express.Router();
const Products = require('../store/Products');

router.get('/', function(_, res) {
  Products.get()
    .then(function(products) {      
      res.render('index', {title:'Loja do Hugo', rotina:'Lista de Produtos',  products });
    })
});

module.exports = router;
