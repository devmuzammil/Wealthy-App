const express = require('express');
const rootRouter = require('./routes/index.js');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY;
app.use(cors());
app.use(express.json());
app.use('/api/v1', rootRouter);



app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

app.listen(port, () => console.log(`Server Runing at Port : ${port}`));