// controllers/review-controller.js
import { Review } from "../db.js";



export async function getAllReviews(req, res, next) {
    try {
        const reviews = await Review.findAll();
        res.json(reviews);
    } catch (err) {
        next(err);
    }
}

//post
export async function createReview(req, res, next) {
    try {
        const {
            recipeID,
            authorName,
            reviewTitle,
            reviewText,
            reviewRating
        } = req.body;

        // basic required validation
        if (!recipeID || !reviewTitle || !reviewText || !reviewRating) {
            return res.status(400).json({
                error: 'Missing required fields: recipeID, reviewTitle, reviewText, reviewRating'
            });
        }

        const created = await Review.create({
            recipeID,
            authorName: authorName || null,
            reviewTitle,
            reviewText,
            reviewRating
        });

        res.status(201).json(created);
    } catch (err) {
        next(err);
    }
}