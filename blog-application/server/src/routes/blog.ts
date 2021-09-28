import express, { Router } from 'express';
import controller from '../controllers/blog';

const router = express.Router();

router.post('/create', controller.create);
router.get('/:blogID', controller.read);
router.get('/', controller.readAll);
router.post('/query', controller.query);
router.post('/update/:blogID', controller.update);
router.post('/:blogID', controller.deleteBlog);

export = router;
