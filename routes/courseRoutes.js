const express= require("express");
const router= express.Router();
const courseController= require("../controllers/courseController");



const auth= require("../auth");
router.post("/", auth.verify, (request, response)=> {

	const data= {
		course: request.body,
		isAdmin: auth.decode(request.headers.authorization).isAdmin
	}

	courseController.addCourse(data).then(resultFromController=> response.send(resultFromController))
});

// Route for retrieving all the courses

router.get("/all", (request, response)=> {
	courseController.getAllCourse().then(resultFromController=> response.send(resultFromController));
});



// Route for retrieving all ACTIVE courses (isActive true)

router.get("/active", (request, response)=> {
	courseController.getAllActive().then(resultFromController=> response.send(resultFromController));
});

// Route for retrieving a SPECIFIC course


router.get("/:courseId/details", (request, response) => {

	courseController.getCourse(request.params).then(resultFromController => response.send(resultFromController));
});

// Route for updating a course
router.put("/:id", auth.verify, (request, response)=> {
									//binato vvvvvvvvvvvv papuntang courseController.js
	courseController.updateCourse(request.params, request.body).then(resultFromController=> response.send(resultFromController));
})


// Archive Course

router.put("/:id/archive", auth.verify, (request, response)=> {

	courseController.archiveCourse(request.params).then(resultFromController=> response.send(resultFromController));
})








module.exports= router