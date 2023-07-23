import * as express from 'express';
import { CoreLibrary } from '@activity-kit/core';
import './globals';

function respondWith(
  this: express.Response,
  result: {
    statusCode: number;
    body?: string;
    json?: unknown;
    location?: string;
  },
) {
  this.status(result.statusCode);

  if (result.body) {
    this.send(result.body);
  } else {
    if (result.location) {
      this.set('Location', result.location);
    }

    if (result.json) {
      this.json(result.json);
    }
  }

  this.end();
}

export default (core: CoreLibrary) =>
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    req.activitypub = core;

    const { __session: token } = req.cookies;
    const userId = await req.activitypub.getUserIdByToken(token);
    const user = await req.activitypub.getActorByUserId(userId);

    req.user = user;

    res.respondWith = respondWith.bind(res);

    next();
  };
