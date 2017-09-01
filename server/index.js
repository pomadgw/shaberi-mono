import express from 'express';
import routes from './routes';
import socket from './socket';

const app = express();

app.use(express.static('public'));

routes(app);

const server = app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

socket(server);
