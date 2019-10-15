const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const paintRoute = require('./routes/paintMixes');
<<<<<<< HEAD
const bodyRoute = require('./routes/bodyMixes');
=======
const engobRoute = require('./routes/engobMixes');
>>>>>>> 5f8695b8ed6a5aa0cd47d883e4d04dabedaeced6
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