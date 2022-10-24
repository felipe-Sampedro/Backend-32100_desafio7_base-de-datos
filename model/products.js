const products = [
    {
      id: 1,
      nombre: 'Escuadra',
      precio: 323.45,
      imagen: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Squadra_45.jpg'
    },
    {
      id: 2,
      nombre: 'Calculadora',
      precio: 234.56,
      imagen: 'https://exitocol.vtexassets.com/arquivos/ids/257195/Calculadora-Cientifica-Graficadora-Texas-Ti-nspire-cxcas-3d.jpg?v=637002371419830000'
    }
  ]
  
  class Products {
    static lastProductId = products[products.length - 1].id;
    
    constructor() {
      this.list = products;
    }
  
    getAll() {
      return this.list;
    }
  
    getById(productId) {
      return this.list.find(product => product.id === +productId);
    }
  
    save(product) {
      const { nombre, precio, imagen } = product;
      if ( !nombre || !precio || !imagen) {
        return null;
      }
      Products.lastProductId++;
      const newProduct = {
        id: Products.lastProductId,
        nombre,
        precio,
        imagen
      };
      console.log(newProduct);
      this.list.push(newProduct);
      return newProduct;
    };


    updateById(productId, product) {
      const productIndex = this.list.findIndex((producto) => producto.id === +productId);
      if (productIndex < 0) return null;
      const {
        nombre,
        precio,
        imagen
      } = product;
      const updatedProduct = {
        id: this.list[productIndex].id,
        nombre,
        precio,
        imagen
      };
      this.list[productIndex] = updatedProduct;
      return updatedProduct;
    }
  
    deleteById(productId) {
      const productIndex = this.list.findIndex((producto) => producto.id === +productId);
      if (productIndex < 0) return null;
      return this.list.splice(productIndex, 1);
    }
  }
  
  module.exports = Products;