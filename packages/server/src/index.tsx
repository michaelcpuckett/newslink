import * as React from 'react';
import * as Server from 'react-dom/server';
import * as AP from '@activity-kit/types';
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
import { HTML_DOCTYPE } from './utils/globals';
import middleware from './utils/middleware';

import handleGetEntityPage from './endpoints/handleGetEntityPage';

import HomePage from './pages/HomePage';
import InboxEntityPage from './pages/InboxEntityPage';
import InboxPageEntityPage from './pages/InboxPageEntityPage';
import OutboxEntityPage from './pages/InboxEntityPage';
import OutboxPageEntityPage from './pages/InboxPageEntityPage';
import FollowEntityPage from './pages/FollowEntityPage';
import UserEntityPage from './pages/UserEntityPage';

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

  app.use(middleware(core));

  app.get('/', async (req: express.Request, res: express.Response) => {
    res.send(HTML_DOCTYPE + Server.renderToString(<HomePage user={req.user} />));
    res.end();
  });

  app.get('/@:username/inbox', handleGetEntityPage<AP.OrderedCollection>(InboxEntityPage));

  app.get('/@:username/inbox/page/:page', handleGetEntityPage<AP.OrderedCollectionPage>(InboxPageEntityPage));

  app.get('/@:username/outbox', handleGetEntityPage<AP.OrderedCollection>(OutboxEntityPage));

  app.get('/@:username/outbox/page/:page', handleGetEntityPage<AP.OrderedCollectionPage>(OutboxPageEntityPage));

  app.get('/follow/:guid', handleGetEntityPage<AP.Follow>(FollowEntityPage));

  app.get('/@:username', handleGetEntityPage<AP.Actor>(UserEntityPage));

  app.post('/@:username/outbox', async (req: express.Request, res: express.Response) => {
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

    res.respondWith(await endpoint.respond());
  });

  app.post('/user', async (req, res: express.Response) => {
    const endpoint = new UserPostEndpoint(
      core,
      {
        body: req.body,
        routes: DEFAULT_ROUTES,
      }
    );

    res.respondWith(await endpoint.respond());
  });

  app.listen(3000, () => {
    console.log('Running...');
  });
})();
