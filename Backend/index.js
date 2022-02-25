const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
var mongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://TIMongoUser:mpuOyenjXgbAxKKH@cluster0.dirpm.mongodb.net/WebVideoChat?retryWrites=true&w=majority";

app.use(cors());  //setting the CORS policy

/*
    login http GET request handling
    this function handles the request and queries MongoDB
    to check the login
*/
app.get("/login", function(request, response){
    var username = request.query.username;
    var password = request.query.password;

    mongoClient.connect(uri, function(error, db) {
      if(error) res.status(500).send("Something went wrong on the server!");

      var dbo = db.db("WebVideoChat");
      var query = { username: username, password: password };

      dbo.collection("users").find(query).toArray(function(error, result) {
        if(error){
            response.status(500).send("Something went wrong on the server!");
        }else if (result.length == 0 && !error){
            response.status(404).send("Wrong login!");
        }else if(result.length > 0 && !error) {
            console.log(result)
            response.status(200).send("Logged in!");
        }
        db.close();
      });
    });
});


/*
    socket.io (server) initialization
*/
const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});

const PORT = process.env.PORT || 5000;  //setting up the port

/*
    socket.io message handling and Socket id emitting
*/
io.on("connection", (socket) => {
	socket.emit("me", socket.id);

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
