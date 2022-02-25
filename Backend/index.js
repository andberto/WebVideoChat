const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://TIMongoUser:mpuOyenjXgbAxKKH@cluster0.dirpm.mongodb.net/WebVideoChat?retryWrites=true&w=majority";
const client = new MongoClient(uri);
var database = null;

async function run() {
  try {
    	await client.connect();
    	database = client.db('WebVideoChat');
	}catch(e){
		console.log(e.message);
	}
}run().catch(console.dir);

const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
	database.collection('users').find().toArray(function(err, docs) {
    	res.send(JSON.stringify(docs));
	});
});

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
