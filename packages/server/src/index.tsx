import React from 'react';
import fs from 'fs';
import path from 'path';
import express from 'express';
import * as Server from 'react-dom/server';

import HomePage from './pages/HomePage';
import EditProfilePage from './pages/EditProfilePage';

const app = express();

const clientPath = path.resolve(__dirname, '../../../node_modules/@timeline/client/lib/');

const realClientPath = fs.realpathSync(clientPath);

app.use('/scripts', express.static(realClientPath));

app.use('/styles', express.static('./styles'));

console.log(realClientPath);

app.get('/', (req, res) => {
  const html = Server.renderToString(<HomePage />);
  res.send(html);
});

app.get('/edit-profile', (req, res) => {
  const html = Server.renderToString(<EditProfilePage />);
  res.send(html);
});

app.listen(3000, () => {
  console.log('Running...');
});