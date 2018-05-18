let posts_controller = require('../controllers/posts')

module.exports = function(app){
    app.get('/api/posts', posts_controller.getPosts);
    app.get('/api/posts/:id', posts_controller.getPostById);
    app.post('/api/posts', posts_controller.insertPost);
    app.put('/api/posts/:id', posts_controller.updatePost);
    app.delete('/api/posts/:id', posts_controller.deletePost);
    app.get('/api/posts/:id/usuario', posts_controller.getUsuarioById);
}