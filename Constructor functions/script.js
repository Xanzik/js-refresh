const Cart = function([...products]) {
    this.products = products;
}

Cart.prototype.addProduct = function(newProduct) {
    if(this.products.find(product => product.id === newProduct.id)) {
        return;
    }
    this.products.push(newProduct);
}

Cart.prototype.changeProductCount = function(id, value) {
    this.products = this.products.map(product => {
        if(product.id == id) {
            product.count += value
            return product;
        }
        return product;
    }).filter(product => product.count > 0);
}

const product = {id:1, name: 'Bread', count: 5};

const newCart = new Cart([product]);

const product2 = {id:2, name: 'Bread', count: 5};

newCart.addProduct(product2);

newCart.changeProductCount(2, -10)
