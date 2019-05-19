const express = require('express');
const router = express.Router();
const Comment = require('../store/Comment');

router.get('/', (req, res) => {
    Comment.find(null, function(err, comments){
        if (err){
            throw err;
        }

        res.status(200).json(comments);
    }); 
});

router.post('/', (req, res) => {
    comentario = { author: 'Nome do usuário logado', comment: req.body.comentario, id_produto: req.body.produto };

    Comment.create(comentario, function(err, task){
        if (err){
            throw err;
        }

        res.redirect('/product/' + req.body.produto);
    });
});

module.exports = router;