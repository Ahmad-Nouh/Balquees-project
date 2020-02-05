require('dotenv').config()
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

process.on('uncaughtException', (err, origin) => {
    fs.writeSync(
      process.stderr.fd,
      `Caught exception: ${err}\n` +
      `Exception origin: ${origin}`
    );
  });

const paintRoute = require('./routes/paintMixes');
const bodyRoute = require('./routes/bodyMixes');
const engobRoute = require('./routes/engobMixes');
const materialRoute = require('./routes/materials');
const warehouseRoute = require('./routes/warehouses');
const productCardRoute = require('./routes/productCard');
const mongoose = require('mongoose');
const cors = require('cors');
const STORAGE = process.env.STORAGE;


mongoose.connect('mongodb://localhost/Balquees')
    .then(() => console.log('connected to database..'))
    .catch(error => console.log(error));

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static(STORAGE));

app.use('/api/material', materialRoute);

app.use('/api/warehouse', warehouseRoute);

app.use('/api/paint', paintRoute);

app.use('/api/body', bodyRoute);

app.use('/api/engob', engobRoute);

app.use('/api/productCard', productCardRoute);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

