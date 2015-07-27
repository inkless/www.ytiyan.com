import express from 'express';

const STATIC_DIR = "public";
let router = express.Router();

// serve /
router.get('/', (req, res) => {
  res.sendFile('index.html', { root: STATIC_DIR });
});
// serve demo
router.get('/demo', (req, res) => {
  res.sendFile('demo.html', { root: STATIC_DIR });
});

export default router;
