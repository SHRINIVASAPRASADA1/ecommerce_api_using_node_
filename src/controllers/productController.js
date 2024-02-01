const fs = require('fs');
const path = require('path');

const DATABASE_FILE = path.join(__dirname, '../data/database.json');

class ProductController {
  getAllProducts(req, res) {
    const data = loadDatabase();
    res.json(data.products);
  }

  createProduct(req, res) {
    const data = loadDatabase();
    const newProduct = req.body; 
    newProduct.id = generateId(data.products);
    data.products.push(newProduct);
    saveDatabase(data);
    res.json(newProduct);
  }

  updateProduct(req, res) {
    const data = loadDatabase();
    const productId = parseInt(req.params.productId, 10);
    const updatedProduct = req.body; 
    const index = data.products.findIndex(product => product.id === productId);
    if (index !== -1) {
      data.products[index] = { ...data.products[index], ...updatedProduct };
      saveDatabase(data);
      res.json(data.products[index]);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  }

  deleteProduct(req, res) {
    const data = loadDatabase();
    const productId = parseInt(req.params.productId, 10);

    const index = data.products.findIndex(product => product.id === productId);
    if (index !== -1) {
      const deletedProduct = data.products.splice(index, 1)[0];
      saveDatabase(data);
      res.json(deletedProduct);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  }

  searchProducts(req, res) {
    const data = loadDatabase();
    const query = req.query.q;
    const matchingProducts = data.products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    res.json(matchingProducts);
  }
}

function loadDatabase() {
  const rawData = fs.readFileSync(DATABASE_FILE);
  return JSON.parse(rawData);
}

function saveDatabase(data) {
  fs.writeFileSync(DATABASE_FILE, JSON.stringify(data, null, 2));
}

function generateId(products) {
  const maxId = Math.max(...products.map(product => product.id), 0);
  return maxId + 1;
}

module.exports = new ProductController();
