let Usuario = require('../models/usuario');
let Post = require('../models/post');

module.exports.getPosts = function(req,res){
    let promise = Post.find().populate('usuarios').exec();

    promise.then(
        function (posts) {
            res.json(posts);
        }
    ).catch(
        function(){
            res.status(404).send('Nao existe');
        }
    )
}

module.exports.getPostById = function(req, res){
    let id = req.params.id;
    let promise = Post.findById(id);
    promise.then(
        function(post){
            res.json(post);
        }
    ).catch(
        function(error){
            res.status(404).send('Nao existe');
        }
    )
}

module.exports.insertPost = function(req, res){
    let promise = Post.create(req.body);
    promise.then(
        function(post){
            res.status(201).json(post);
        }
    ).catch(
        function(error){
            res.status(404).send('Não Existe');
        }
    )
}

module.exports.updatePost = function(req, res){
    let id = req.params.id;
    let promise = Post.findOne({"_id": id}).exec();
    promise.then(
        function(post){
            let promise1 = Post.findByIdAndUpdate(id, post);
            promise1.then(
                function(post){
                    res.json(post);
                }
            ).catch(error);
        }
    ).catch(error);
}

module.exports.deletePost = function(req, res){
    let id = req.params.id;
    let promise = Post.remove({"_id": id});
    promise.then(
        function(post){
            res.json(post);
        }
    ).catch(
        function(error){
            res.status(404).send('Não Encontrado');
        }
    )
}

module.exports.getUsuarioById = function(req, res){
    let id = req.params.id;
    let promise = Post.findById(id);
    function error(req, res){
        res.status(500).send();
    }
    promise.then(
        function(post){      
            let promise1 = Usuario.find({'id': post.uid});
            promise1.then(
                function(usuario){
                    res.json(usuario);
                }
            ).catch(error);
        }
    ).catch(error);
}