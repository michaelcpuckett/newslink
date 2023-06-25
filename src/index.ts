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

app.get('/test', async (_: Request, res: Response) => {
  const { html } = await import('lit');
  const { render } = await import('@lit-labs/ssr');
  const { collectResult } = await import('@lit-labs/ssr/lib/render-result.js');

  const htmlResult = await collectResult(
    render(html`<!DOCTYPE html>
      <html>
        <head>
          <title>Lit SSR</title>
        </head>
        <body>
          <ssr-test>
            <template shadowrootmode="open">
              <h1>Shopping list</h1>
            </template>
          </ssr-test>
        </body>
      </html>`),
  );

  return res.setHeader('Content-Type', 'text/html').send(htmlResult);
});

app.listen(3000, () => console.log('started'));
