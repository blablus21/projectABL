const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./openapi/openapi.json');
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'purchasing_db'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Import routes
const vendorRoutes = require('./routes/vendors');
const purchaseRequestsRoutes = require('./routes/purchaseRequests');
const reportRoutes = require('./routes/report');
const purchaseApprovalRoutes = require('./routes/purchaseApproval');

const app = express();
app.use(bodyParser.json());

// Default Route for Root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Purchasing App API!');
});

// Set up routes
app.use('/vendors', vendorRoutes);
app.use('/purchaseRequests', purchaseRequestsRoutes);
app.use('/report', reportRoutes);
app.use('/purchaseApproval', purchaseApprovalRoutes);


// Set up Swagger UI for OpenAPI documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
