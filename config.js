var util = require('util');
var path = require('path');
var hfc = require('fabric-client');

var file = 'network-config%s.yaml';

var env = process.env.TARGET_NETWORK;
if (env)
    file = util.format(file, '-'+ env);
else
    file = util.format(file,'');
hfc.setConfigSetting('network-connection-profile-path',path.join(__dirname, 'artifacts',file));
hfc.setConfigSetting('attinad-connection-profile-path',path.join(__dirname,'artifacts','attinad.yaml'));
hfc.setConfigSetting('ibm-connection-profile-path', path.join(__dirname,'artifacts', 'ibm.yaml'));
hfc.addConfigFile(path.join(__dirname, 'config.json'));

