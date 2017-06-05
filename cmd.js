var fs = require('fs');
var path = require('path');
var log = hexo.log;
var config = require('./config');
var sync = require('./sync');
var package_info = require('./package.json');

var commands = module.exports = function() {
    return commands;
};

var mkcdndir = function (dirpath) {
    fs.exists(dirpath, function(exists){
        if (!exists) {
            fs.mkdirSync(dirpath);
        }
    });
};

var local_dir = config.local_dir ? config.local_dir : 'cdn';
mkcdndir(local_dir);

commands.sync = function(){
    if (config.access_key && config.secret_key && config.bucket) {
        sync.sync(); 
    } else {
        console.log('Qiniu config is not complete.\nCan\'t Sync.'.red);
    }
};

commands.sync2 = function(){
    if (config.access_key && config.secret_key && config.bucket) {
        sync.sync2(); 
    } else {
        console.log('Qiniu config is not complete.\nCan\'t Sync.'.red);
    }
};

commands.info = function(){
    console.log('Plugin name'.bold + ': ' + package_info.name);
    console.log('Version'.bold + ': ' + package_info.version);
    console.log('Author'.bold + ':  ' + package_info.author.name);
    console.log('Github'.bold + ':  ' + package_info.repository.url);
    console.log('Bugs'.bold + ':    ' + package_info.bugs.url);
};

if(config.sync){
    hexo.on('generateAfter', sync.scan);
    hexo.on('ready', sync.scan_end);
    // hexo.on('server', sync.watch);
} else {
    log.w('qiniu sync is off');
}