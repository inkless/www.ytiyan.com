import express from 'express';
import routes from './routes';

const STATIC_DIR = "public";
const PORT = 3000;

let app = express();

// Serve public folder
app.use(express.static(STATIC_DIR, {
  index: false
}));

// Adding router here
app.use('/', routes);

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// start server
app.listen(PORT, () => {
  console.log('Server started at  http://localhost:%s', PORT);
});
