import express from 'express';

const router = express.Router();



router.use('/users', );
// router.use('/admin', );
router.get('/', (req, res) => {
res.send("Test service providers")
})
export {router};