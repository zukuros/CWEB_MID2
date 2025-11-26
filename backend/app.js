//app.js
import express from 'express';
import path from 'path';

// API ROUTER IMPORTS
import recipeRoutes from './routes/recipe-api.js';
import reviewRoutes from './routes/review-api.js';

// DATA STORE IMPORTS
import { db } from './db.js';
import loadDB from './fixtures/load-db.js';

// CORS IMPORT AND CONFIG
import cors from 'cors';
const corsOptions = {
    origin: /localhost:\d{4,5}$/i, // allow any localhost:#### port
    credentials: true,
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
    methods: 'GET,PUT,POST,DELETE,OPTIONS',
    maxAge: 1000 * 60 * 60 * 12 // 12h
};

// SWAGGER IMPORTS AND CONFIG
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const PORT = 4000;

// compute normalized absolute globs for swagger-jsdoc
const apiGlobs = [
    path.join(process.cwd(), 'models', '*.js'),
    path.join(process.cwd(), 'routes', '*.js')
].map(p => p.replace(/\\/g, '/'));

// Build the OpenAPI spec object
const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Recipe Review API',
            version: '1.0.0',
            description: 'API for recipes and reviews',
        },
        components: {
            schemas: {
                Recipe: {
                    type: 'object',
                    properties: {
                        recipeID: { type: 'integer' },
                        recipeTitle: { type: 'string' },
                        ingredients: { type: 'string' },
                        prepTimeMins: { type: 'integer' },
                        cookTimeMins: { type: 'integer' },
                        instructions: { type: 'string' },
                        photoURL_Path: { type: 'string' }
                    }
                },
                NewRecipeInput: {
                    type: 'object',
                    required: ['recipeTitle', 'ingredients', 'instructions'],
                    properties: {
                        recipeTitle: { type: 'string' },
                        ingredients: { type: 'string' },
                        prepTimeMins: { type: 'integer' },
                        cookTimeMins: { type: 'integer' },
                        instructions: { type: 'string' },
                        photoURL_Path: { type: 'string' }
                    }
                },
                Review: {
                    type: 'object',
                    properties: {
                        reviewID: { type: 'integer' },
                        recipeID: { type: 'integer' },
                        authorName: { type: 'string' },
                        reviewTitle: { type: 'string' },
                        reviewText: { type: 'string' },
                        reviewRating: { type: 'integer' }
                    }
                },
                NewReviewInput: {
                    type: 'object',
                    required: ['recipeID', 'reviewTitle', 'reviewText', 'reviewRating'],
                    properties: {
                        recipeID: { type: 'integer' },
                        authorName: { type: 'string' },
                        reviewTitle: { type: 'string' },
                        reviewText: { type: 'string' },
                        reviewRating: { type: 'integer', minimum: 1, maximum: 10 }
                    }
                }
            }
        }
    },
    apis: apiGlobs
});

const app = express();

// Parse JSON request bodies
app.use(express.json());

// CORS for all routes (API + docs)
app.use('*', cors(corsOptions));
app.options('*', cors(corsOptions));

// Static file serving (only matters if you plan to serve uploaded images or public assets)
app.use(express.static(path.join(process.cwd(), 'static-files')));

// API ENDPOINTS
// ex: GET /api/recipes, POST /api/recipes, etc.
app.use('/api', recipeRoutes);
app.use('/api', reviewRoutes);

// Swagger UI (must come AFTER swaggerSpec is defined and app is created)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Default JSON error handler (must be after routes & after Swagger)
const defaultErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    console.error('Error Stack:', err.stack);
    res.status(statusCode).json({ error: message });
};

// SELF-CALLING ASYNC FUNCTION TO START SERVER AFTER DB IS READY
(async () => {
    try {
        // Sync all defined Sequelize models to the database
        await db.sync({ force: false });
        console.log('Database synchronized successfully.');

        // Seed fixtures
        await loadDB();

        // Attach error handler middleware AFTER routes but BEFORE listen
        app.use(defaultErrorHandler);

        // Start server
        app.listen(PORT, () => {
            console.log(`API is running at http://localhost:${PORT}`);
            console.log(`Swagger docs available at http://localhost:${PORT}/docs`);
        });
    } catch (error) {
        console.error('Unable to connect to the database or synchronize models:', error);
        process.exit(1);
    }
})();
