const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');

describe('Product Controller Tests', () => {
  it('should get all products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('should create a new product', async () => {
    const newProduct = {
      name: 'Test Product',
      description: 'Test description',
      price: 10.99,
      variants: [{ name: 'Variant 1', sku: 'TEST001', additionalCost: 2.00, stockCount: 50 }]
    };

    const res = await request(app).post('/api/products').send(newProduct);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('id');
  });

  it('should update an existing product', async () => {
    const existingProduct = {
      name: 'Existing Product',
      description: 'Existing description',
      price: 20.99,
      variants: [{ name: 'Existing Variant', sku: 'EXIST001', additionalCost: 3.00, stockCount: 30 }]
    };

    const updatedProduct = { price: 25.99 };

    const createRes = await request(app).post('/api/products').send(existingProduct);
    const updateRes = await request(app).put(`/api/products/${createRes.body.id}`).send(updatedProduct);

    expect(updateRes.status).to.equal(200);
    expect(updateRes.body.price).to.equal(updatedProduct.price);
  });

  it('should delete an existing product', async () => {
    const newProduct = {
      name: 'Product to Delete',
      description: 'Description to Delete',
      price: 15.99,
      variants: [{ name: 'Variant to Delete', sku: 'DELETE001', additionalCost: 4.00, stockCount: 20 }]
    };

    const createRes = await request(app).post('/api/products').send(newProduct);
    const deleteRes = await request(app).delete(`/api/products/${createRes.body.id}`);

    expect(deleteRes.status).to.equal(200);
    expect(deleteRes.body.name).to.equal(newProduct.name);
  });

  it('should search products based on the query parameter', async () => {
    const query = 'Test';

    const res = await request(app).get(`/api/products/search?q=${query}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.every(product => product.name.toLowerCase().includes(query.toLowerCase()))).to.be.true;
  });
});
