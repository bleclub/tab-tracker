const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const multer = require('multer');

// Multer middlewares
let storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './public/uploads');
  },
  filename: (req, file, callback) => {
    callback(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
  },
});

let upload = multer({
  storage,
}).single('photo');

router.get('/', postController.fetchAllPost);
router.get('/:id', postController.fetchPostByID);
router.post('/', upload, postController.createPost);
router.patch('/:id', upload, postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;
