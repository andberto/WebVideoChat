const app = require('express')();
const server = require('http').createServer(app);
const cors = require('cors'); //usefull in app deployment

const sockio = require('socket.io')(server, {
    cors: {
        origin: '*',
        method: ['GET','POST']
    }
});

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/', function(req, res) {
    res.send("Server is running on port " + PORT);
});

server.listen(PORT, () => console.log('listening on port ' + PORT));
