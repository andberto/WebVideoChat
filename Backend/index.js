const app = require("express")();
const bodyParser = require('body-parser');
const server = require("http").createServer(app);
const cors = require("cors");
var mongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://TIMongoUser:mpuOyenjXgbAxKKH@cluster0.dirpm.mongodb.net/WebVideoChat?retryWrites=true&w=majority";

var connected_sock_users = {};

app.use(cors());  //setting the CORS policy
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.status(200).send("Server is running!");
});

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
            response.status(200).send("Logged in!");
        }
        db.close();
      });
    });
});

app.get("/signup", function(request, response){
    var username = request.query.username;
    var password = request.query.password;

    mongoClient.connect(uri, function(error, db) {
      if(error) response.status(500).send("Something went wrong on the server!");

      var dbo = db.db("WebVideoChat");
      var query = { username: username };

      dbo.collection("users").find(query).toArray(function(error, result) {
        if(error){
            console.log(error);
            response.status(500).send("Something went wrong on the server!");
            db.close();
        }else if (result.length == 0 && !error){
            var newUser = { username: username, password: password };
            dbo.collection("users").insertOne(newUser, function(err, res) {
                console.log(err);
                if(err) response.status(500).send("Something went wrong on the server! During account creation");
                else response.status(200).send("New account created successfully!");
                db.close();
            });
        }else if(result.length > 0 && !error) {
            console.log(result)
            response.status(404).send("Username already exists!");
            db.close();
        }
      });
    });
});

app.post('/sockuser', function(req, res){
    var username = req.body.username;
    var sock_id = req.body.sock_id;
    if(sock_id != ''){
        console.log(username + " " + sock_id);
        connected_sock_users[username] = sock_id;
        res.status(200).send("ok");
    }
});

app.get('/sockuser', function(req, res){
    var username = req.query.username;
    if(username in connected_sock_users)
        res.status(200).send(connected_sock_users[username]);
    else
        res.status(404).send(username + " is offline!");
});

app.get('/allusers', function(req, response){
    mongoClient.connect(uri, function(error, db) {
      if(error) res.status(500).send("Something went wrong on the server!");

      var dbo = db.db("WebVideoChat");
      dbo.collection("users").find().toArray(function(error, result) {
        if(error){
            response.status(500).send("Something went wrong on the server!");
        }else if (result.length == 0 && !error){
            response.status(404).send("Wrong login!");
        }else if(result.length > 0 && !error) {
            response.status(200).send(result);
        }
        db.close();
      });
    });
});

app.get('/onlineusers', function(req, response){
    result = []
    for (const [key, value] of Object.entries(connected_sock_users)) {
      result.push({
         "username": key,
         "sockid": value
      });
    }
    response.status(200).send(JSON.stringify(result));
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
    console.log("New socket connection!")
	socket.emit("me", socket.id);

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
        console.log(socket.id + " disconnected!")

        for (const [key, value] of Object.entries(connected_sock_users)) {
            if(value == socket.id)
                delete connected_sock_users[key];
        }
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
