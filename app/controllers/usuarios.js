let usuarios = [
    {_id: 1, nome:'Pereira', email:'pereira@pereira', senha:'qwe'},
    {_id: 2, nome:'Neto', email:'neto@neto', senha:'123'},
    {_id: 3, nome:'Antonio', email:'antonio@antonio', senha:'ant11'}
]

module.exports.getUsuarios = function(req,res){
    if(req.query.min_id){
        let list = usuarios.filter((el)=>(el._id>=req.query.min_id));
        res.json(list);
    }else{
        res.json(usuarios);
    }
}

module.exports.getUsuarioById = function(req, res){
    let id = req.params.id;
    let usuario = usuarios.find((e)=>(e._id==id));
    if(usuario){
        res.json(usuario);
    }else{
        res.status(404).send('Hostage not found');
    }
}

module.exports.insertUsuario = function(req, res){
    usuarios.push(req.body);
    res.status(200).send(req.body);
}

module.exports.updateUsuario = function(req, res){
    
}

module.exports.deleteUsuario = function(req, res){
    
}

module.exports.getAllPostById = function(req, res){
}