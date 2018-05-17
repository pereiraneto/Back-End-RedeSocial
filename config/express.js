let express = require('express');
let body_parser = require('body-parser')
let path = require('path');

// let hostage_routes = require('../app/routes/hostages')
// let bandit_routes = require('../app/routes/bandits')

module.exports = function(){
    let app = express();
    app.set('port', 3000);
    app.use(express.static('./public'));
    app.use(body_parser.json());
    app.use(body_parser.urlencoded({extended: false}));
    // hostage_routes(app);
    // bandit_routes(app);

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    return app;
}