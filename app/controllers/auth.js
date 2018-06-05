let Usuario = require('../models/usuario')
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')

module.exports.signin = function(req, res){
    let promise = Usuario.findOne({email: req.body.email}).exec();
    promise.then(
        function(usuario){
            if(bcrypt.compareSync(req.body.senha, usuario.senha)){
                let token = jwt.sign({id: usuario._id}, 'senha');              
                res.status(200).json({
                    id: usuario._id,
                    token: token,
                    message: 'Logado !'
                });
            }else{
                res.status(401).send('Login inválido !!')
            }
        }
    ).catch(
        function(){
            res.status(401).send('Login inválido !!')            
        }
    )
}


module.exports.verifyToken = function(req, res, next){
    jwt.verify(req.query.token, 'senha', 
        function(err, decoded){
            if(err){
                res.status(401).json({
                    message: "Not authorized"
                })
            }else{
                next()
            }
        }
    )
}