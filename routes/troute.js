var express = require('express');
var Todo = require('../models/todo');

var router = express.Router();

router.get('/todos', (req, res,) => {
    
    Todo.find({})
    .then(todos =>{
        res.json({
            confirmation : 'success',
            data: todos
        })
    })
    .catch(err => {
        res.json({
            confirmation : 'fail',
            message : err.message
        })
    });
  })

  router.post('/todos', function(req, res){
    var todo = req.body

    Todo.create(todo, function(err, todo){
        if(err){
            res.send(err)
        }
        res.json({
            'confirmation': 'success',
            'data': todo
            })
    })
})

router.put('/todo', function(req, res){
    var query = req.body
    queryID = query.id

    Todo.findByOneAndUpdate(query, queryID, function(err, todo){
        if(err){
            res.send(err)
        }
        res.json({
            'confirmation': 'success',
            'data': todo
            })
    })
})

router.delete('/movies/:_id', function(req, res){
    var id = req.params._id

    Todo.findOneAndRemove(id, function(err, todo){
        if(err){
            res.send(err)
        }
        res.json({
            'confirmation': 'success',
            'data': todo
            })
    })
})

router.get('/todos/:id', function(req, res){
    var id = req.params.id
    Todo.findById(id, function(err,todo){
        if(err){
            res.send(err)
        }
        res.json({
            'confirmation': 'success',
            'data': todo
            })
    })
})
module.exports = router;



module.exports = router;