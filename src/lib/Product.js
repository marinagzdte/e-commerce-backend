
class Product {
    constructor(name, description, code, thumbnail, price, stock) {
        this.timestamp = new Date().toLocaleString();
        this.name = name;
        this.description = description;
        this.code = code;
        this.thumbnail = thumbnail;
        this.price = price;
        this.stock = stock;
    }
}

export default Product