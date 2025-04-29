const Product = require('./Product');

class Cart {
    static #items = [];

    static add(productName) {
        const product = Product.findByName(productName);

        if (!product) {
            throw new Error(`Product "${productName}" does not exist`);
        }

        const item = this.#items.find(i => i.product.name === productName);

        if (item) {
            item.quantity += 1;
        } else {
            this.#items.push({ product, quantity: 1 });
        }
    }

    static getItems() {
        return this.#items;
    }

    static getTotalPrice() {
        return this.#items.reduce((total, item) => {
            return total + item.product.price * item.quantity;
        }, 0);
    }

    static getProductsQuantity() {
        return this.#items.reduce((total, item) => total + item.quantity, 0);
    }
}

module.exports = Cart;