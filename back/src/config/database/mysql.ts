import mysql from "mysql2/promise"
import dotenv from 'dotenv';

dotenv.config();

type ConnectionOrNull = mysql.Connection | null;

// 接続のキャッシュ
let cachedConnection: ConnectionOrNull = null;

export const initMysql = async() => {
  if (cachedConnection) return; // 重複して呼び出されても、DBとの接続が重複しないようにする

  try {
    const connection = await mysql.createConnection({
      host:     process.env.MYSQL_HOST,
      user:     process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_DB,
    });

    console.log('MYSQL接続完了');
    cachedConnection = connection;

    return connection;
  } catch(err) {
    console.error("MYSQL接続エラー", err);
    process.exit(1); // アプリを強制終了
  }
}
