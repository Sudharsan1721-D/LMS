import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import { clerkWebhooks } from './controllers/webhooks.js';




const app = express();

// Capture raw body for webhook verification
// app.use((req, res, next) => {
//     let data = '';
//     req.on('data', chunk => {
//         data += chunk;
//     });
//     req.on('end', () => {
//         req.rawBody = data;
//         next();
//     });
// });
await connectDB();;


app.use(cors());



app.get('/', (req, res) => res.send('Welcome to the server!'));
app.post('/clerk', express.json() , clerkWebhooks)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
