let posts = [
    {_id: 1, texto:'Texto 1', likes:10, uid:'1'},
    {_id: 2, texto:'Texto 2', likes:20, uid:'2'},
    {_id: 3, texto:'Texto 3', likes:30, uid:'3'}
]

module.exports.getPosts = function(req,res){
    if(req.query.min_id){
        let list = posts.filter((el)=>(el._id>=req.query.min_id));
        res.json(list);
    }else{
        res.json(posts);
    }
}

module.exports.getPostById = function(req, res){
    let id = req.params.id;
    let post = posts.find((e)=>(e._id==id));
    if(post){
        res.json(post);
    }else{
        res.status(404).send('Hostage not found');
    }
}

module.exports.insertPost = function(req, res){
    posts.push(req.body);
    res.status(200).send(req.body);
}

module.exports.updatePost = function(req, res){
    
}

module.exports.deletePost = function(req, res){
}

module.exports.getUsuarioById = function(req, res){
}