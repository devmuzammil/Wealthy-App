const express = require('express');
const rootRouter = require('./routes/index.js');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
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

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => console.log(`Server Running at Port : ${port}`));
}

module.exports = app;