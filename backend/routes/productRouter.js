// router for products coming from productModel folder

import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel';

const productRouter = express.Router();
productRouter.get(
    '/',
    expressAsyncHandler(async(req, res) => {
        const searchKeyword = req.query.searchKeyword ? {
            name: {
                $regex: req.query.searchKeyword,
                $options: 'i',
            },
        } : {};
        const products = await Product.find({...searchKeyword });
        res.send(products);
    })
);
productRouter.get(
    '/:id',
    expressAsyncHandler(async(req, res) => {
        const product = await Product.findById(req.params.id);
        res.send(product);
    })
);
export default productRouter;