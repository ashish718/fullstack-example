var jwt = require('jsonwebtoken');

let createMiddlewareToken = async(input)=>{
    const hash = crypto.createHash('sha256').update(input).digest('base64');
    return hash;
}

module.exports.verify = async(req, res, next) => {
    try {
        //verify token
        const bearerHeader = req.headers['authorization']
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ')
            const bearerToken = bearer[1]
            const decoded = jwt.verify(bearerToken, process.env.SECRET_KEY);
            console.log(decoded, "decoded") // bar   
            if (decoded.data.email) {
                req.auth.email = decoded.data.email
                next()
            }
            else{
                return res.status(405).json({message: "Unauthorized access."})
            }
        }else {
            return res.status(400).json({message: "No token found."})
        }
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "token expired", error})
    }
}