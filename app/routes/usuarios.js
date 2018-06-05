let usuarios_controller = require('../controllers/usuarios')
let auth_controller = require('../controllers/auth')

module.exports = function(app){
    app.post('/api/usuarios/signin', auth_controller.signin);
    app.post('/api/usuarios', usuarios_controller.insertUsuario);    
    app.use('/api/usuarios', auth_controller.verifyToken);
    app.put('/api/usuarios/:id', usuarios_controller.updateUsuario);
    app.get('/api/usuarios', usuarios_controller.getUsuarios);
    app.delete('/api/usuarios/:id', usuarios_controller.deleteUsuario);
    app.get('/api/usuarios/:id', usuarios_controller.getUsuarioById);
    app.get('/api/usuarios/:id/post', usuarios_controller.getAllPostById);
}