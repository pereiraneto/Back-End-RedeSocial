let posts_controller = require('../controllers/posts')
let auth_controller = require('../controllers/auth')

module.exports = function(app){
    app.use('/api/posts', auth_controller.verifyToken);
    app.get('/api/posts', posts_controller.getPosts);
    app.get('/api/posts/:id', posts_controller.getPostById);
    app.post('/api/posts', posts_controller.insertPost);
    app.put('/api/posts/:id', posts_controller.updatePost);
    app.delete('/api/posts/:id', posts_controller.deletePost);
    app.get('/api/posts/:id/usuario', posts_controller.getUsuarioById);
}