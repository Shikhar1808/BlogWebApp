//Creating a custom middleware for error handling

exports.errorHandler = (err,req,res,next) =>{
    const statusCode = res.statusCode? res.statusCode: 500;
    //agr status code diya hoga to vo jayega vrna 500 use karenge
    switch(statusCode){
        case 400:
            res.json({
                title: "Validation Failed",
                message: err.message, 
                stackTrace: err.stack
            });
            break;
        case 404:
            res.json({
                title: "Not Found",
                message: err.message, 
                stackTrace: err.stack
            });
            break;
        default:
            break;
            
    }
}