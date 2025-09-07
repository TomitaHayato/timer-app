import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routers from './routes/index'
import { initMysql } from './config/database/mysql'
import { corsOption } from './config/cors/cors'
import cookieParser from 'cookie-parser'
import { errorHander } from './middlewares/errorHandler/errorHandler'
import { devLog } from './utils/dev/devLog'
import { verifyEmailConnection } from './config/mailer/transporter'
import helmet from 'helmet'

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(express.json());   // JSONボディをパース
app.use(cookieParser());   // Cookieデータにアクセス
app.use(cors(corsOption)); // CORS対策
app.use(helmet());

initMysql(); // DB接続
verifyEmailConnection(); // メールサーバ接続

app.use('/api', routers);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  devLog('リクエスト', req.method, req.hostname);
  res.status(200).send('終了');
});

app.use(errorHander); // 共通のエラーハンドルMiddlewara

app.listen(port, () => {
  devLog(`サーバ起動 port:${port}`)
})
