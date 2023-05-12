// setup dependencies
const mongoose= require("mongoose");
const courseSchema= new mongoose.Schema({
	name: {
		type: String,

		// requires data for this fields/properties to be included when creating a record.

		// the "true" value defines if the field is required or not and the second element in the array is the message that wll be printed out in the terminal when data is not present.
		required: [true, "Course is required"]
	},
	description: {
		type: String,
		required: [true, "Description is required"]
	},

	price: {
		type: Number,
		required: [true, "Price is required"]
	},
	isActive: {
		type: Boolean,
		default: true
	},
	createdOn: {
		type: Date,
		// the "new Date() expression instantiates a new date that stores the current date and time whenever a course is created in our database"
		default: new Date()
	},
	// The "enrollees" property/field will be an array of objects containing the user IDs and the date and time that the user enrolled to the course.
	enrollees: [
			{
				userId: {
					type: String,
					required: [true, "UserId is required"]
				}, 
				enrolledOn: {
					type: Date,
					default: new Date()
				}

			}

		]
});

module.exports= mongoose.model("Course", courseSchema);




/*
	Important Note
		- Make sure to follow the naming convention for model files which should have the following:

			- The first letter of the file should be capitalized to indicate that we accessing the model file
			- Should use the singular form of the collection


*/
