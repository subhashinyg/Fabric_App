'use strict';
var util = require('util');
var http = require('http');
var bodyParser = require('body-parser');
var log4js = require('log4js');
var logger = log4js.getLogger('SampleWebPage');
var express = require('express');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var app = express();
var cors = require('cors');
var bearerToken = require('express-bearer-token');

require('./config.js');
var hfc = require('fabric-client');

var helper = require('./app/helper.js');
var host = process.env.HOST || hfc.getConfigSetting('host');
var port = process.env.PORT || hfc.getConfigSetting('port');

//app.option('*',cors());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extented: true}));

app.set('secret','thisismysecret');
app.use(expressJWT({
    secret: 'thisismysecret'
}).unless({
    path: '[/users]'
}));
app.use(bearerToken());
app.use (function(req, res, next){
    logger.debug('new request for %s',req.OriginalUrl);
    if (req.OriginalUrl.indexOf('/users')>= 0 ){
        return next();
    }

var token = req.token;
jwt.verify(token, app.get('secret'), function (err,decoded){
    if (err){
        res.send({
            sucess: false,
            message: 'failed to authenticate token make sure to include the token'+
            'returned from the /user call in autherization header'
        });
        return;
    }else{
        req.username = decoded.username;
        req.orgname = decoded.username;
        logger.debug(util.format('decoded from jwt token: username - %s, orgname',decoded.username , decoded.orgName));
        return next();
        }
    });
});
console.log('Subha');

                //......starting server......//

var server = http.createServer(app).listen(port,function(){});
logger.info('server started');
logger.info('http://%s:%s',host, port);
console.log("server is starting and running on port",port);

function getErrorMessage(field){
    var response = {
        success: false,
        message: field + 'field is missing or Invalid in the request'
    };
    return response;
}
//register and enroll user
app.post('/users', async function(req, res){
    var username = req.body.username;
    var orgName = req.body.orgName;
    logger.debug('End point : /users');
    logger.debug('user name :' + username);
    logger.debug('org name :' + orgName);

    if (!username){
        res.json(getErrorMessage('\'username\''));
        return;
    }

    if (!orgName){
        res.json(getErrorMessage('\'orgName\''));
        return;
    }
    var token = jwt.sign({
        exp: Math.floor(Date.now()/1000) + parseInt(hfc.getConfigSetting('jwt_expiretime')),
        username: username,
        orgName: orgName
    },app.get('secret'));
    let response = await helper.getRegisteredUser(username, orgName, true);
    logger.debug('--returned from registering the username %s for the organization with %s', username, orgName);
    if (response && typeof response !== 'string'){
        logger.debug('successfully registered the username %s for a organization %s', username, orgName);
        response.token = token;
        res.json(response);
    }else{
        logger.debug('failed to register username %s for organization %s with::%s', username , orgName, response);
        res.json({success: false, message:response});
    }
});