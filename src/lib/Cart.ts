import Product from './Product';

class Cart {
    timestamp: string;
    products: Array<Product>

    constructor() {
        this.timestamp = Date.now().toLocaleString();
        this.products = []
    }

    addToCart(product: Product) {
        this.products.push(product);
    }

    removeFromCart(productId: number) {
        const index = this.products.findIndex(prod => prod.id === productId)
        if (index === -1)
            throw new Error(`No se encontró el objeto.`)

        return this.products.splice(index, 1)[0];
    }

    removeAllProductsFromCart() {
        const aux = this.products;
        this.products = [];

        return aux;
    }
}

export default Cart;