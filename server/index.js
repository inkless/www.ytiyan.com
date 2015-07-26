import express from 'express';

const STATIC_DIR = "public";
const PORT = 3000;

let app = express();

// Serve public folder
app.use(express.static(STATIC_DIR, {
  index: false
}));

// Adding router here
// serve /
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: STATIC_DIR });
});
// serve demo
app.get('/demo', (req, res) => {
  res.sendFile('demo.html', { root: STATIC_DIR });
});

// start server
app.listen(PORT, () => {
  console.log('Server started at  http://localhost:%s', PORT);
});
