import express from 'express';
import registerRoute from '../routes/auth/register.route.js'

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/auth', registerRoute);

app.get('/', (req,res)=>{
    res.send('<h1>Express server active</h1>');
});

app.listen(PORT, () =>{
    console.log(`Local server running on: http://localhost:${PORT}`);
})