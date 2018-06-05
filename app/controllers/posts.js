let Usuario = require('../models/usuario');
let Post = require('../models/post');

module.exports.getPosts = function(req,res){
    let promise = Post.find().populate('usuarios').exec();

    let payload = jwt.decode(req.query.token);    
    promise = promise.find({'usuario': payload.id});

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
    let post = new Post({
        texto: req.body.texto,
        likes: req.body.likes,
        uid: req.body.uid
    });
    let promise = Post.findByIdAndUpdate(id, post);
    promise.then(
        function(post1){ 
            res.json(post1);
        }
    ).catch(
        function(error){
            res.status(404).send('Não Encontrado');
        }
    );
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