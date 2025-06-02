import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routers from './routes/index'
import { initMysql } from './config/database/mysql'
import { corsOption } from './config/cors/cors'
import cookieParser from 'cookie-parser'

dotenv.config();

const port = process.env.PORT;
const app = express();

// JSONボディをパースできるようにする
app.use(express.json());
// Cookieデータにアクセスできるようにする
app.use(cookieParser());

// CORS対策
app.use(cors(corsOption));

// DB接続
initMysql();

app.use('/api', routers);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  console.log('リクエスト', req.method, req.hostname);
  res.status(200).send('終了');
});

app.listen(port, () => {
  console.log(`サーバ起動 port:${port}`)
})
