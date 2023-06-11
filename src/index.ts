import cookieParser from 'cookie-parser';
import path from 'path';
import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (_: Request, res: Response) => {
  return res.json({
    success: true,
  });
});

app.listen(3000, () => console.log('started'));
