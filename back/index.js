const express = require('express');
const port = 3000;

const app = express();

app.get('/', (req, res, next) => {
  res.status(200).send('Hello express');
})

app.listen(port, () => {
  console.log(`サーバ起動 port:${port}`)
})
