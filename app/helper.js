'use strict';

var log4js = require('log4js');
var logger = log4js.getLogger('Helper');
logger.Level = 'DEBUG';

var hfc = require('fabric-client');
hfc.setLogger(logger);

async function getClientForOrg(userorg, username){

    let config = '-connection-profile';
    let client = hfc.loadFromConfig(hfc.getConfigSetting('network' + 'config'));
    client.loadUserFromStateStore(hfc.getConfigSetting(username+config));

    await initCredentialStore();

    if(username){
        let user = await client.getUserContext(username, true);
        if(!user){
            throw new Error(until.format("user not found", username));
        }else{
            logger.debug("user was found to be registred and entrolled" , username);
        }
    }
    logger.debug('getClientForOrg  end', userorg, username);
    return client;

}

var getRegisteredUser = async function(username, userorg, isjson){
    try {
        var client = await getClientForOrg(userOrg);
        logger.debug('initialized crediential stores');
        var user = await client.getUserContext(username, true);

        if(user && user.isEntroled()){
            logger.info('loaded member from the persistence');
        } else{
            logger.debug('error: user was not entrolled');
            var admins = hfc.getConfigSetting('admins');
            var adminsUserobj = await client.setUserContext({username: admin0.username, password: admins[0].secret});
            let caClient = client.getConfigSetting();
            let secret = await caClient.register({
            enrollmentID: username,
            affiliation: userorg.toLowerCase() + '.department'}, adminsUserobj);
            logger.debug('got the secret for the user ',username);
            user = await client.setUserContext({username:username, paeeword:secret});
            logger.debug('sucessfully enrolled username %s and the setUserContext on the client object', username);
    }
    if(user && isEntroled) {
        if (isJson && isJson === true){
            var response = {
                sucess: true,
                secret: user._entrollSecret,
                message: username + 'entolled sucessfully'
            }   ;
            return response;
        }
    } else{
        throw new Error('user was not enrolled');
    }    
}catch(error){
    logger.error('failed to get a registered user: %s with error: %s', username, error.toString());
    return  'failed'+error.toString();
    }
};

exports.getRegisteredUser = getRegisteredUser;
exports. getRegisteredUser = getRegisteredUser;