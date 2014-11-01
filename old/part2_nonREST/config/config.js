var path = require('path');
var rootPath = path.normalize(__dirname + '/..'),
    appPath = 'app/',
    uploadPath = 'public/upload/',
    configPath = 'config/',
    publicPath = 'public/',
    testPath = 'test/';

module.exports = {
    dbName : 'MyWay',
    // setup paths
    app_path : path.join(rootPath , appPath),
    models_path : path.join(rootPath , appPath , 'model/'),
    views_path : path.join(rootPath , appPath , 'view/'),
    controllers_path : path.join(rootPath , appPath , 'controller/'),
    public_path : path.join(rootPath , publicPath ),
    config_path : path.join(rootPath , configPath ),
    upload_path : path.join(rootPath , uploadPath ),
    test_path: path.join(rootPath, testPath),
    expSession : {
        secret: 'cookiesforeveryone',
        maxAge: 3600 * 1000
    }
};
