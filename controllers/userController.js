// setup dependencies
const User= require("../models/User");
const bcrypt= require("bcrypt");
const auth= require("../auth");

const Course= require("../models/Course")
// functions


module.exports.checkEmailExists= (requestBody)=> {
	return User.find({email: requestBody.email}).then(result =>{
		if (result.length > 0){
			return true;

		} else {
			return false;
		}
	})
};

module.exports.registerUser= (requestBody)=> {
	let newUser= new User({
		firstName: requestBody.firstName,
		lastName: requestBody.lastName,
		email: requestBody.email,
		mobileNo: requestBody.mobileNo,
		password: bcrypt.hashSync(requestBody.password, 10)
	});

	return newUser.save().then((user, error)=> {
		if(error) {
			return false;
		} else{
			return true;
		}
	})
};

module.exports.loginUser= (requestBody)=> {

	// we used the "findOne" instead of "find" which returns all records that match the search criteria

	// the findOne method returns the first record in the collection that matches the search criteria

	return User.findOne({email: requestBody.email}).then(result=> {
		// if user does not exist,
		if(result == null){
			return false;
		// if user exist,
		} else{

			// the "compareSync" method is used to compare a non encrypted password from the login form to the encrypted password retrieved from the database and it returns "true" or "false" value depending on the result

			// a good coding practice for boolean variable/constants is to use the word 'is' at the beginning in the form of 'is+Noun' hence, isPasswordCorrect - 

			const isPasswordCorrect= bcrypt.compareSync(requestBody.password, result.password);

			// generate an access token . Decrypt in jwt.io
			if(isPasswordCorrect){
				return {access: auth.createAccessToken(result)}
			} else {
				return false;
			}
		}
	})
}

//s38 Activity- Get User Details through ID input using POST method

module.exports.getProfile1= (requestBody)=> {
	return User.findById(requestBody.id).then(result=> {
		if(result == null){
			return false;

		} else{

			result.password= "";
			return result;

		}
		
	})
}

// Retrieve a  user profile thru its access Token/authetntication login
module.exports.getProfile= (data)=> {
	return User.findById(data.userId).then(result=> {
		if(result == null){
			return false;

		} else{

			result.password= "";
			return result;

		}
		
	})
}
/* module.exports.getProfile= (data)=> {
	return User.findOne({id: data._id}).then(result=> {
		if(result == null){
			return false;

		} else{

			result.password= "";
			return result;

		}
		
	})
} */



// enroll user to a course

// async await is used in here because we will need to udpate 2 sepaarate documents(enrollees, enrollments) when enrolling a users 

// async is placed here to declare that this is an async expression

// given that it is, "await" keyword shouldb e permitted within the body

// an async expression is an expression that returns a promise

// await tells our code to wait for the promise to resolve, in this case, for our user enrollemnt to be pushed in our database.

// we then put the "if" to check if the two awaits are satisfied, if it is, then it will continue with the function, in this case, return a message ' user enrolled successfully'

module.exports.enroll= async(data)=> {

	let isUserUpdated= await User.findById(data.userId).then(user=> {

		user.enrollments.push({courseId: data.courseId});

		return user.save().then((user, error)=> {

			if(error){
				return false
			} else{
				return true
			};
		});
	});

	let isCourseUpdated= await Course.findById(data.courseId).then(course=> {

		course.enrollees.push({userId: data.userId})
		return course.save().then((course, error)=> {
			if(error){
				return false
			} else{
				return true
			};
		});
	});

	if(isUserUpdated && isCourseUpdated){
		return true;
	} else{
		return false
	};
};