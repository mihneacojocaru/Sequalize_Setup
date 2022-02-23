const express = require('express');
const cors = require('cors');
const {sequelize} = require('./models');
const dbRoute = require('./routes/appRoute.js');

const app = express();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

app.use('/db/v1/', dbRoute);

app.listen({port}, async () => {
    console.log(`Server up on http://localhost:${port}`);
    await sequelize.authenticate();
    console.log('Database Connected!');
});