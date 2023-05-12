const Course= require("../models/Course");



//Admin authentication for add course
module.exports.addCourse= (data)=> {

	if(data.isAdmin){

		let newCourse= new Course({
			name: data.course.name,
			description: data.course.description,
			price: data.course.price
		});

		return newCourse.save().then((course, error)=> { //.save() save to database
			if(error){
				return false;
			} else{
				return {
					message: "New course successfully created"
				}
			}
		})

	}

	let message= Promise.resolve({
		message: "User must be an Admin to access this!"
	})

	return message.then((value)=> {
		return value;
	})
};


module.exports.getAllCourse= ()=> {
	return Course.find({}).then(result=> {
		return result
	})
};

module.exports.getAllActive= ()=> {
	return Course.find({isActive: true}).then(result=> {
		return result
	});
};

module.exports.getCourse = (requestParams) => {

	return Course.findById(requestParams.courseId).then(result => {
		return result
	});
};
						// binato   vvvvvvvvvvvvvv  from courseRoutes.js  sinalo dito sa controller.js
module.exports.updateCourse= (requestParams, requestBody)=> {

	let updatedCourse= {
		name: requestBody.name,
		description: requestBody.description,
		price: requestBody.price
	};

	return Course.findByIdAndUpdate(requestParams.id, updatedCourse).then((course, error)=> {

		if(error){
			return false
		} else{
			let message= `Successfuly updated course Id- "${requestParams.id}"`

			return message
		};
	});
};


//Archive Course

module.exports.archiveCourse =(requestParams)=> {
	let updateActiveField= {
		isActive: false
	};

	return Course.findByIdAndUpdate(requestParams.id, updateActiveField).then((course, error)=> {
		if(error){
			return false
		} else{
			return 'Course successfully archived.'
		};
	});
};

