import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import config from './config';
import data from './data';
import userRouter from './routes/userRouter';

mongoose
    .connect(config.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => {
        console.log('Connected to mongodb');
    })
    .catch((error) => {
        console.log(error.reason);
    });

const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use('/api/users', userRouter);
app.get('/api/products', (req, res) => {
    res.send(data.products);
});
app.get('/api/products/:id', (req, res) => {
    // eslint-disable-next-line no-underscore-dangle
    const product = data.products.find((x) => x._id === req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found!' });
    }
});

app.use(express.static(path.join(__dirname, '/../frontend')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../frontend/index.html'));
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    const status = err.name && err.name === 'ValidationError' ? 400 : 500;
    res.status(status).send({ message: err.message });
});

app.listen(config.PORT, () => {
    console.log('serve at http://localhost:5000');
});