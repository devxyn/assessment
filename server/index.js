import express from 'express';
import bodyParser from 'body-parser';
import authRoute from './routes/authRoute.js';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/', authRoute);

try {
  await mongoose.connect(
    'mongodb+srv://admin:cWHfm2s487M5G4FX@cluster3.v5ibs78.mongodb.net/?retryWrites=true&w=majority&appName=Cluster3',
  );
  console.log('Pinged your deployment. You successfully connected to MongoDB!');
} catch (e) {
  app.use((_, res) => {
    res.status(500).json({
      message: 'Database connection error',
      error: e.message,
    });
  });
}

app.get('/api/ip', (req, res) => {
  const clientIpAddress = req.ip;
  res.json({ ip: clientIpAddress });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
