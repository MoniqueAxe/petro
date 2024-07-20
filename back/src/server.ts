import express from 'express';
import helmet from 'helmet';
import cors from 'cors'
import addressRoutes from './routes/addresses'
import pumpRoutes from './routes/pumps'

const app = express();
app.use(cors());
app.use(helmet())
app.use(express.json());

const PORT = process.env.PORT;

app.use('/addresses', addressRoutes)
app.use('/pumps', pumpRoutes)

app.get('/', (_req, res) => {
    console.log('[GET ROUTE]');
    res.send('HELLO FROM HOMEPAGE');
})

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));