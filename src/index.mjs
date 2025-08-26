//index.mjs
import express from 'express';
import authRoutes from '../routes/auth/auth.route.js';
import {errorHandler} from './middlewares/errorHandler.js'

const PORT = 3000;

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);

app.post('/login', authRoutes);

app.use(errorHandler);

app.get('/', (req,res)=>{
    res.send('<h1>Express server active</h1>');
});

app.listen(PORT, () =>{
    console.log(`Local server running on: http://localhost:${PORT}`);
})

