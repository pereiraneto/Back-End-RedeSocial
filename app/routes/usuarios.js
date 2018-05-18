let usuarios_controller = require('../controllers/usuarios')

module.exports = function(app){
    app.get('/api/usuarios', usuarios_controller.getUsuarios);
    app.get('/api/usuarios/:id', usuarios_controller.getUsuarioById);
    app.post('/api/usuarios', usuarios_controller.insertUsuario);
    app.put('/api/usuarios/:id', usuarios_controller.updateUsuario);
    app.delete('/api/usuarios/:id', usuarios_controller.deleteUsuario);
    app.get('/api/usuarios/:id/post', usuarios_controller.getAllPostById);
}