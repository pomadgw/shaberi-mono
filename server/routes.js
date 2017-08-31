export default function(app) {
  app.get('/listen', function (req, res) {
    res.send('Hello World!');
  });
}
