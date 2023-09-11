import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import {swaggerSpec} from './config/swaggerConfig';

dotenv.config();

// Setup Express
const app = express();
const port = process.env.PORT || 3001;

// Setup body-parser
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Setup our routes.
import routes from './routes/index.js';
app.use('/', routes);


// Start the local DB running. Then, once it's connected, start the server.
//mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true })

// Start the DB running. Then, once it's connected, start the server.
mongoose.connect( process.env.DB_URL,{ useNewUrlParser: true })
    .then(() => app.listen(port, () => console.log(`App server listening on port ${port}!`)));

// For local test
// mongoose.connect('mongodb://localhost:27017/researchFusion', { useNewUrlParser: true })
//     .then(() => app.listen(port, () => console.log(`App server listening on port ${port}!`)));
