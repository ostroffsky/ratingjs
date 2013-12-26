/**
 * Created by Alexey Ostrovsky.
 * Date: 26.12.13
 * Time: 15:27
 */

var platform = require('platform');

exports.uaData = function(req, res, next) {
    //set user agent info to locals
    var ua = req.headers['user-agent'];
    res.locals.browserInfo = platform.parse(ua);
    if(!res.locals.browserInfo.product) {
        res.locals.browserInfo.product = "";
    }
    // set host to locals
    res.locals.host=req.host;
    next();
};