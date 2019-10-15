const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const paintRoute = require('./routes/paintMixes');
const bodyRoute = require('./routes/bodyMixes');
const engobRoute = require('./routes/engobMixes');
const mongoose = require('mongoose');
const cors = require('cors');


mongoose.connect('mongodb://localhost/Balquees')
    .then(() => console.log('connected to database..'))
    .catch(error => console.log(error));

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());



app.use('/api/paint', paintRoute);

app.use('/api/body', bodyRoute);

app.use('/api/engob', engobRoute);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));