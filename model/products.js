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
    },
    // {
    //   id: 3,
    //   nombre: 'Globo Terráqueo',
    //   precio: 45.67,
    //   imagen: 'https://panamericana.vteximg.com.br/arquivos/ids/256800-600-690/globo-terraqueo-politico-40-cm-7701016736787.jpg?v=636381897120030000'
    // },
    // {
    //   id: 4,
    //   nombre: 'Paleta Pintura',
    //   precio: 456.78,
    //   imagen: 'https://image.shutterstock.com/image-photo/artists-palette-multiple-colors-isolated-260nw-39510775.jpg'
    // },
    // {
    //   id: 5,
    //   nombre: 'Reloj',
    //   precio: 67.89,
    //   imagen: 'https://us.123rf.com/450wm/monticello/monticello1911/monticello191100379/135078958-reloj-de-pared-aislado-sobre-fondo-blanco-nueve-.jpg?ver=6'
    // },
    // {
    //   id: 6,
    //   nombre: 'Agenda',
    //   precio: 78.90,
    //   imagen: 'https://cloudfront-eu-central-1.images.arcpublishing.com/prisa/AGYRBXKZQH6C4KYQU6IGD2BDIE.jpg'
    // },
    // {
    //   id: 7,
    //   nombre: 'Escudo caballero templario',
    //   precio: 456.78,
    //   imagen: 'https://www.tienda-medieval.com/blog/wp-content/uploads/2010/09/escudo_templario1.jpg'
    // },
    // {
    //   id: 8,
    //   nombre: 'Escorpión de juguete',
    //   precio: 1000.87,
    //   imagen: 'https://sc04.alicdn.com/kf/H5794a667d8844b0592a7a76e8724842bt.jpg'
    // },
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