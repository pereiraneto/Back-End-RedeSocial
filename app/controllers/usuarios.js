let Usuario = require('../models/usuario');
let Post = require('../models/post');

module.exports.getUsuarios = function(req,res){
    let promise = Usuario.find().populate('posts').exec();

    if(req.query.nome){
        let nome = req.query.nome;
        promise = promise.find({nome : {'$eq':nome}});
    }

    if(req.query.email){
        let email = req.query.email;
        promise = promise.find({email : {'$eq':email}});
    }

    promise.then(
        function (users) {
            res.json(users);
        }
    ).catch(
        function(){
            res.status(404).send('Nao existe');
        }
    )
}

module.exports.getUsuarioById = function(req, res){
    let id = req.params.id;
    let promise = Usuario.findById(id);
    promise.then(
        function(user){
            res.json(user);
        }
    ).catch(
        function(error){
            res.status(404).send('Nao existe');
        }
    )
}

module.exports.insertUsuario = function(req, res){
    let promise = Usuario.create(req.body);
    promise.then(
        function(usuario){
            res.status(201).json(usuario);
        }
    ).catch(
        function(error){
            res.status(404).send('Não Existe');
        }
    )
}

module.exports.updateUsuario = function(req, res){
    let id = req.params.id;
    let promise = Usuario.findOne({"_id": id}).exec();
    promise.then(
        function(user){
            let promise1 = Usuario.findByIdAndUpdate(id, user);
            promise1.then(
                function(usuario){
                    res.json(usuario);
                }
            ).catch(error);
        }
    ).catch(error);
}

module.exports.deleteUsuario = function(req, res){
    let id = req.params.id;
    let promise = Usuario.remove({"_id": id});
    promise.then(
        function(users){
            res.json(users);
        }
    ).catch(
        function(error){
            res.status(404).send('Não Encontrado');
        }
    )
}

module.exports.getAllPostById = function(req, res){
    let id = req.params.id;
    let promise = Usuario.findById(id);
    function error(req, res){
        res.status(500).send();
    }
    promise.then(
        function(usuario){      
            let promise1 = Post.find({'uid': usuario._id});
            promise1.then(
                function(posts){
                    res.json(posts);
                }
            ).catch(error);
        }
    ).catch(error);
}