const jwt= require("jsonwebtoken");
const secret= "CourseBookingAPI";

// 		JSON Web Tokens
	// JWT is a way of securely passsing information from the server to the frontend or to other parts of server 

module.exports.createAccessToken= (user)=> {
	const data= {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	};

	return jwt.sign(data, secret, {});
};

// .verify is for checking if token provided is legit

// paste the 'access token' generated from 'authentication of a user(/login)' into  (/details) -Authorization [dropdown]-> bearer token which is the token= request.headers.authorization

module.exports.verify= (request, response, next)=> {
	let token= request.headers.authorization;
	//console.log(token)

	if(typeof token !== "undefined"){
		token= token.slice(7, token.length);
		//console.log(token) // cut off the "Bearer" word in the console so that we only get the raw encrypted access token

		return jwt.verify(token, secret, (error, data)=> {
			if(error){
				return response.send({auth: "failed"});
			} else{
				next() //next() used if no error after our middleware 'auth.verify'from controller file hence we continue with the codeblock where we declared a variable "userData" triggering 'auth.decode'
			}
		})
	} else{
		return response.send({auth: "failed"})
	}
}



module.exports.decode= (token)=> {
	if(typeof token !== "undefined"){
		token= token.slice(7, token.length);

		return jwt.verify(token, secret, (error, data)=> {
			if(error){
				return null;
			} else{
				return jwt.decode(token, {complete: true}).payload;
			}
		})
	} else{
		return null;
	}
}