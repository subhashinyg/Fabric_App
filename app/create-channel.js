var fs = require('fs');
var path = require('path');

var helper = require('./helper.js');
var logger = helper.getLogger('create-Channel');

var createChannel = async function(channelNname, channelConfigPath, userName, orgName){
    logger.debug("creating channel" +channelName + '\n');
    try{
        var client = await helper.getClientForOrg(orgName);
        logger.debug(' creating channel' + channelNname );
    }
}
