import * as React from 'react';
import * as Server from 'react-dom/server';
import * as express from 'express';
import * as AP from  '@activity-kit/types';
import { LOCAL_DOMAIN } from '@activity-kit/utilities';
import { EntityGetEndpoint } from '@activity-kit/endpoints';
import '../utils/globals';
import { HTML_DOCTYPE } from '../utils/globals';

export default (
  PageComponent: React.ComponentType<{ entity: AP.OrderedCollection; user: AP.Actor | null }>,
) => async (req: express.Request, res: express.Response) => {
  const endpoint = new EntityGetEndpoint(req.activitypub, {
    url: new URL(req.url, LOCAL_DOMAIN),
    returnHtml: req.headers.accept?.includes('text/html'),
  });

  const render = async ({ ...args }: { entity: AP.OrderedCollection }) => {
    return HTML_DOCTYPE + Server.renderToString(<PageComponent {...args} user={req.user} />);
  };

  const result = await endpoint.respond(render).catch((err: Error) => {
    console.error(err);

    return {
      statusCode: 500,
      body: err.message,
    };
  });

  res.status(result.statusCode);
  res.send(result.body);
  res.end();
};
