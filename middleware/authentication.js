const { validateToken } = require("../services/authentication");

function checkForAuthentiacationCookie(cookieName){
    return(req, res, next) => {
        const token = req.cookies[cookieName];
        if(!token){
            return next();
        }
        try{
            const user = validateToken(token);
            req.user = user;
        }
        catch(err){

        }
        return next();
    }
}

module.exports = checkForAuthentiacationCookie;