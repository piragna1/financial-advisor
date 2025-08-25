import express from 'express';
import authRoutes from '../routes/auth/auth.route.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/auth', authRoutes);

app.get('/', (req,res)=>{
    res.send('<h1>Express server active</h1>');
});

app.listen(PORT, () =>{
    console.log(`Local server running on: http://localhost:${PORT}`);
})