import express from 'express';
import { createReview, getReviews } from '../controllers/reviewController.js';
import { verifyUser } from '../utils/verifyToken.js';



const router = express.Router()

router.post('/:tourId',verifyUser, createReview )
router.get('/tours/:tourId/reviews', getReviews);

export default router