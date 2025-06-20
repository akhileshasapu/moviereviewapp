require("dotenv").config();
const jwt = require("jsonwebtoken")
const JWT_SECRET=process.env.JWT_SECRET ;
if (!JWT_SECRET) {
  console.error("❌ JWT_SECRET not loaded from .env");
  process.exit(1);
}

function auth(req,res,next){
 const authHeader = req.headers["authorization"]
 const token = authHeader && authHeader.split(" ")[1];
 console.log("Token recvied:", req.headers["authorization"]);
 console.log("JWT_SECRET IS:",JWT_SECRET)

 if(!token)
 {
    return res.status(401).json({message:"access denied :no token"})
 }
 try{
    const decoded = jwt.verify(token,JWT_SECRET);
    req.user = decoded // { id: "userId123", email: "email@example.com" }
    next();
 }catch(err){
   console.log("the error is:",err)
    return res.status(403).json({ message: "Access Denied: Invalid token" });
 }
}
module.exports = auth