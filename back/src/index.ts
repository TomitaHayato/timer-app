import express, { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv';
import routers from './routes/index'

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use('/api', routers);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  console.log('リクエスト', req.method, req.hostname);
  res.status(200).send('終了');
});

app.listen(port, () => {
  console.log(`サーバ起動 port:${port}`)
})
