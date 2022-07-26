
class Product {
    id!: number;
    timestamp: string;
    name: string;
    description: string;
    code: string;
    thumbnail: string;
    price: number;
    stock: number;

    constructor(name: string, description: string, code: string, thumbnail: string, price: number, stock: number) {
        this.timestamp = Date.now().toLocaleString();
        this.name = name;
        this.description = description;
        this.code = code;
        this.thumbnail = thumbnail;
        this.price = price;
        this.stock = stock;
    }
}

export default Product