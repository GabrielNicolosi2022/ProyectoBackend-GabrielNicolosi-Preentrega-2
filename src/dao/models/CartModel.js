import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import db from './dbConnection.js';

const cartCollection = 'carts';

const cartProductSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const cartSchema = new mongoose.Schema({
  products: [cartProductSchema],
});
cartSchema.plugin(mongoosePaginate);

const cartsModel = db.model(cartCollection, cartSchema);

export default cartsModel;
