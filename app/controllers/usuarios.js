let bcrypt = require('bcrypt');
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
    console.log('entrou');
    let usuario = new Usuario({
        nome: req.body.nome,
        email: req.body.email,
        senha: bcrypt.hashSync(req.body.senha, 10)
    });
    console.log('bcrypt');
    let promise = Usuario.create(usuario);
    promise.then(
        function(usuario){
            console.log('sucesso');
            res.status(201).json(usuario);
        }
    ).catch(
        function(error){
            console.log('erro');
            res.status(404).send('Não Existe');
        }
    )
}

module.exports.updateUsuario = function(req, res){
    let id = req.params.id;
    let usuario = new Usuario({
        nome: req.body.nome,
        email: req.body.email,
        senha: bcrypt.hashSync(req.body.senha, 10)
    });
    let promise = Usuario.findByIdAndUpdate(id, usuario);
    promise.then(
        function(user){ 
            res.json(user);
        }
    ).catch(
        function(error){
            res.status(404).send('Não Encontrado');
        }
    );
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