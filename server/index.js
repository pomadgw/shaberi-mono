import express from 'express';
import routes from './routes';
import socket from './socket';

const app = express();

app.use(express.static('public'));

routes(app);

const port = process.env.PORT || 3000;

const server = app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

socket(server);
