// npm init -y
// npm install express@4.18.2
// npm install mongoose@7.0.0
// npm install cors@2.8.5
// npm install bcrypt@5.1.0
// npm install jsonwebtoken@9.0.0

// setup dependencies initializing
const express= require("express");
const mongoose= require("mongoose");
const cors= require("cors");
const app= express();
app.use(cors(/*{origin: "url" or " * "} - also see methods / credentials*/)); //CORS = Cross-Origin Resources Sharing
app.use(express.json());
app.use(express.urlencoded({extended: true}))

const dotenv= require("dotenv").config();
const port= process.env.PORT || 4000





// connect to our database MongoDB
const connectDB = async () => {
	try{
		const conn = await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		
		console.log(`MongoDB Connected: ${conn.connection.host}`)
	} catch(error){
		console.log(error);
		process.exit(1);
	}
}

// setup main routes
const userRoutes= require("./routes/userRoutes")
app.use("/users", userRoutes)

const courseRoutes= require("./routes/courseRoutes")
app.use("/courses", courseRoutes)



// listen port localhost
connectDB().then(() => {
    app.listen(port, () => {
        console.log("listening for requests");
    })
})