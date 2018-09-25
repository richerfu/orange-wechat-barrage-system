module.exports = function(app){
    const login = require('./index');
    app.use('/',login);

    const barrage = require('./barrage');
    app.use('/barrage',barrage);

    const user =require('./users');
    app.use('/user',user);

    const wxlogin = require('./login');
    app.use('/login',wxlogin);
};