module.exports = function(req, res, next){
    const queryStrings = req.query;
    for( const key in queryStrings ){
        const length = queryStrings[key].length;
        // Si el length es menor a 20, es decir no es el _id de mongose, lo pasamos a int
        const isValid = length > 20 ? false: !isNaN(parseInt(queryStrings[key]));

        if(isValid){
            queryStrings[key] = parseInt(queryStrings[key]);
        }
    }

    req.query = queryStrings;
    next();
}