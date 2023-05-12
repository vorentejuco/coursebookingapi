// setup dependencies
const express= require("express");
const router= express.Router();
const userController= require("../controllers/userController")
const auth= require("../auth")

// routes

// check email
router.post("/checkEmail", (request, response)=> {
	userController.checkEmailExists(request.body).then(
		resultFromController=> response.send(resultFromController));
});


// register user
router.post("/register", (request, response)=> {
	userController.registerUser(request.body).then(resultFromController=> response.send(resultFromController));
});

// user authentication
router.post("/login", (request, response)=> {
	userController.loginUser(request.body).then(resultFromController=> response.send(resultFromController));
})


//Get User Details through ID input using POST method


router.post("/details1", (request, response)=> {

userController.getProfile1(request.body).then(resultFromController=> response.send(resultFromController));
})

// Retrieve a  user profile thru its access Token/authetntication login
// added auth.verify -middleware
router.get("/details", auth.verify, (request, response)=> {

	const userData= auth.decode(request.headers.authorization);
	// console.log(userData) will log same with jwt.io ---- details of users-- id email- isadmin -time authenticated-


userController.getProfile({userId: userData.id}).then(resultFromController=> response.send(resultFromController));
})

/* userController.getProfile(userData).then(resultFromController=> response.send(resultFromController));
})
 */


//Enroll  User to a course thru Token + Course ID
router.post("/enroll", auth.verify, (request, response)=> {
	let data= {
		userId: /*request.body.userId,*/auth.decode(request.headers.authorization).id,
		courseId: request.body.courseId
	}

	userController.enroll(data).then(resultFromController=> response.send(resultFromController));
});

// allows us to export the "router" object that will be accessed in our index.js file
module.exports= router;
