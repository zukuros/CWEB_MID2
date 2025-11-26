// routes/review-api.js
import express from 'express';
import {createReview, getAllReviews} from "../controllers/review-controller.js";

const router = express.Router();
const apiPath = '/reviews';

/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Get all reviews
 *     tags:
 *       - Reviews
 *     responses:
 *       200:
 *         description: Returns all reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *
 *   post:
 *     summary: Create a new review
 *     tags:
 *       - Reviews
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewReviewInput'
 *     responses:
 *       201:
 *         description: The review that was created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 */
router.get(apiPath, getAllReviews);
router.post(apiPath, createReview);

export default router;