import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import { clerkWebhooks } from './controllers/webhooks.js';

const app = express();

await connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Welcome to the server!'));
app.post('/clerk', clerkWebhooks);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});