import express, { Router } from 'express';
import controller from '../controllers/blog';

const router = express.Router();

router.post('/create', controller.create);
router.get('/read/:blogID', controller.read);
router.get('/', controller.readAll);
router.post('/query', controller.query);
router.patch('/update/:blogID', controller.update);
router.delete('/:blogID', controller.deleteBlog);

export = router;
