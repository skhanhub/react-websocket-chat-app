import * as express from 'express';
import * as httpServer from 'http';
import * as socketIO from 'socket.io';
import socketManager from './socketManager'
const app = express();
const http = httpServer.createServer(app);
export const io = socketIO(http);

const PORT = process.env.PORT || 5000;

io.on('connection', socketManager);

http.listen(PORT, function(){
    console.log(`listening on PORT ${PORT}`);
});