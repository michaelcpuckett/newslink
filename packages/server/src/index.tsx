import * as React from 'react';
import * as Server from 'react-dom/server';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';
import * as cookies from 'cookie-parser';
import { MongoClient } from 'mongodb';
import { MongoDbAdapter } from '@activity-kit/db-mongo';
import { TokenAuthAdapter } from '@activity-kit/auth-token';
import { NodeCryptoAdapter } from '@activity-kit/crypto-node';
import { FtpStorageAdapter } from '@activity-kit/storage-ftp';
import { OutboxPostEndpoint, UserPostEndpoint } from '@activity-kit/endpoints';
import { Core } from '@activity-kit/core';
import { DEFAULT_ROUTES, LOCAL_DOMAIN } from '@activity-kit/utilities';
import './utils/globals';

import handleGetCollectionPage from './endpoints/handleGetCollectionPage';
import handleGetUserPage from './endpoints/handleGetUserPage';

import HomePage from './pages/HomePage';
import InboxEntityPage from './pages/InboxEntityPage';
import InboxPageEntityPage from './pages/InboxPageEntityPage';
import OutboxEntityPage from './pages/InboxEntityPage';
import OutboxPageEntityPage from './pages/InboxPageEntityPage';

(async () => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true, }));
  app.use(bodyParser.json({ type: 'application/activity+json', }));
  app.use(cookies()); 
  app.use('/scripts', express.static(fs.realpathSync('../../node_modules/@timeline/client/lib')));
  app.use('/styles', express.static('./styles'));
   
  const ftpStorageAdapter = new FtpStorageAdapter({
    ...JSON.parse(decodeURIComponent('%7B%22host%22%3A%22media.michaelpuckett.engineer%22%2C%22user%22%3A%22uploads%40media.michaelpuckett.engineer%22%2C%22password%22%3A%22Ag3nt106!%22%7D')),
    path: '/uploads',
  });
  const mongoClient = new MongoClient(
    process.env.AP_MONGO_CLIENT_URL ?? 'mongodb://127.0.0.1:27017',
  );
  await mongoClient.connect();
  const mongoDb = mongoClient.db(
    process.env.AP_MONGO_DB_NAME ?? 'activitypub2',
  );
  const mongoDbAdapter = new MongoDbAdapter(mongoDb);
  const nodeCryptoAdapter = new NodeCryptoAdapter();
  const tokenAuthAdapter = new TokenAuthAdapter({
    db: mongoDbAdapter,
    crypto: nodeCryptoAdapter,
  });

  const core = new Core({
    auth: tokenAuthAdapter,
    crypto: nodeCryptoAdapter,
    db: mongoDbAdapter,
    storage: ftpStorageAdapter,
  });

  app.use(async (req: express.Request, res, next) => {
    req.activitypub = core;
    const { __session: token } = req.cookies;
    const userId = await req.activitypub.getUserIdByToken(token);
    const user = await req.activitypub.getActorByUserId(userId);
    req.user = user;
    next();
  });

  app.get('/', async (req: express.Request, res) => {
    res.send(Server.renderToString(<HomePage user={req.user} />));
    res.end();
  });

  app.get('/@:username/inbox', handleGetCollectionPage(InboxEntityPage));

  app.get('/@:username/inbox/page/:page', handleGetCollectionPage(InboxPageEntityPage));

  app.get('/@:username/outbox', handleGetCollectionPage(OutboxEntityPage));

  app.get('/@:username/outbox/page/:page', handleGetCollectionPage(OutboxPageEntityPage));

  app.get('/@:username', handleGetUserPage);

  app.post('/@:username/outbox', async (req: express.Request, res) => {
    if (!req.user) {
      res.status(401);
      res.end();
      return;
    }

    const endpoint = new OutboxPostEndpoint(
      core,
      {
        body: req.body,
        url: new URL(req.url, LOCAL_DOMAIN),
        actor: req.user,
        routes: DEFAULT_ROUTES,
      }
    );

    const result = await endpoint.respond();

    res.status(result.statusCode);

    if (result.location) {
      res.set('Location', result.location);
    }

    res.end();
  });

  app.post('/user', async (req, res) => {
    const endpoint = new UserPostEndpoint(
      core,
      {
        body: req.body,
        routes: DEFAULT_ROUTES,
      }
    );

    const result = await endpoint.respond();

    res.status(result.statusCode);
    res.send(result.body);
    res.end();
  });

  app.listen(3000, () => {
    console.log('Running...');
  });
})();
