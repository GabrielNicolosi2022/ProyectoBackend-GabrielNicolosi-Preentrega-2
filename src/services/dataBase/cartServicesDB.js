import cartsModel from '../../models/schemas/CartModel.js';

class CartManager {
  constructor() {}

  async createCart(cartData) {
    try {
      const newCart = new cartsModel(cartData);
      await newCart.save();
      // console.log('Carrito guardado en la base de datos:', newCart);

      return newCart;
    } catch (error) {
      throw new Error('Error al crear el carrito');
    }
  }

  async getAllCarts() {
    try {
      const carts = await cartsModel.find().lean();
      return carts;
    } catch (error) {
      throw new Error('Error al obtener los carritos');
    }
  }

  async getCartById(cartId) {
    try {
      const cart = await cartsModel
        .findById(cartId)
        .populate('products.product')
        .lean();
      // console.log('getCartById: ', cart.products.product);
      return cart;
    } catch (error) {
      throw new Error('Error al obtener el carrito');
    }
  }

  async updateCart(cartId, product) {
    try {
      const cart = await cartsModel.findById(cartId);
      if (!cart) {
        throw new Error('Carrito no encontrado');
      }
      cart.products.push(product);
      await cart.save();
      return cart;
    } catch (error) {
      console.error(error);
      throw new Error('Error al actualizar el carrito');
    }
  }

  async addProductToCart(cartId, product) {
    try {
      // console.log('ID del carrito:', cartId);
      // console.log('Producto a agregar:', product);

      const cart = await cartsModel.findByIdAndUpdate(
        cartId,
        { $push: { products: product } },
        { new: true }
      );

      console.log('Carrito actualizado:', cart);

      return cart;
    } catch (error) {
      throw new Error('Error al agregar el producto al carrito');
    }
  }

  async removeProductFromCart(cartId, productId) {
    try {
      const cart = await cartsModel.findById(cartId);
      const index = cart.products.findIndex(
        (product) => product._id.toString() === productId
      );
      if (index > -1) {
        cart.products.splice(index, 1);
        await cart.save();
      }
      return cart;
    } catch (error) {
      throw new Error('Error al eliminar el producto del carrito');
    }
  }

  async deleteCart(cartId) {
    try {
      await cartsModel.findByIdAndRemove(cartId);
    } catch (error) {
      throw new Error('Error al eliminar el carrito');
    }
  }
}

export default CartManager;
