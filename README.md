Project Requirements:
Ensure that Node.js, Mocha, and Express are installed on the targeted system.

Project Name: ecommerce_api

Project Structure:
The project includes directories such as src, app.js, tests, package.json, and readme.md.

Instructions:
Move to the project root directory using the terminal (cd command in Linux; consider using PowerShell in Windows).
To run the project, type npm start. To run tests, type npx mocha tests/productController.test.js.

Default Configuration:
By default, the project will open at port 3000 during execution (npm start).

Endpoints:
GET Products:
Endpoint: http://127.0.0.1:3000/api/products

POST Products:
Endpoint: http://127.0.0.1:3000/api/products
Request Body {
  "name": "New Product",
  "description": "Description of the new product",
  "price": 19.99,
  "variants": [
    {
      "name": "Variant 1",
      "sku": "SKU001",
      "additionalCost": 5.00,
      "stockCount": 100
    },
    {
      "name": "Variant 2",
      "sku": "SKU002",
      "additionalCost": 8.00,
      "stockCount": 50
    }
  ]
}


DELETE Product:
Endpoint: http://127.0.0.1:3000/api/products/<productId>

GET Search Products:
Endpoint: http://127.0.0.1:3000/api/products/search?q=<id>


Drawbacks:

The project uses a JSON file as a database, avoiding the use of an actual database.

I note limited familiarity with Node.js and Laravel, last used in 2022-23, expressing a preference for developing APIs using Django or Flask.

Acknowledgment:
Due to knowledge constraints, not all tasks could be completed.

Closing Remarks:
The project brings back memories of working with Node.js. If given an opportunity, developing the API using Django or Flask would be preferable.