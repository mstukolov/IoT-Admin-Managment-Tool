/**
 * Created by MAKS on 06.07.2017.
 */
//Зависимости для Bluemix
var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();

// This will be our application entry. We'll setup our server here.
const http = require('http');
const app = require('../app'); // The express app we just created

const server = http.createServer(app);

server.listen(appEnv.port, '0.0.0.0', function() {
    console.log("c2m http-server starting on...." + appEnv.url);
});
