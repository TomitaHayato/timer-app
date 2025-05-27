import express, { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;
const app = express();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  console.log('リクエスト', req.method, req.hostname)
  res.status(200).send('Hello express');
})

app.listen(port, () => {
  console.log(`サーバ起動 port:${port}`)
})
