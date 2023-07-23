import * as React from 'react';
import * as AP from '@activity-kit/types';
import { getArray, getEntity, getId } from '@activity-kit/utilities';

import PageChrome from '../components/PageChrome';
import FollowForm from '../components/FollowForm';

export default ({ entity, user }: { entity: AP.Actor, user: AP.Actor | null }) => {
  const followers = getArray(getEntity<AP.Collection>(entity.followers)?.items);
  const following = getArray(getEntity<AP.Collection>(entity.following)?.items);
  const requests = getArray(getEntity<AP.Collection>(entity.streams.find(stream => getEntity(stream)?.name === 'Requests'))?.items);

  return (
    <PageChrome
      title={entity.name || 'User'}
      user={user}>
      <h1>
        @{entity.preferredUsername}
      </h1>
      <dl>
        <dt>
          Name
        </dt>
        <dd>
          {entity.name}
        </dd>
        
        <dt>
          Links
        </dt>
        <dd>
          <ul>
            <li>
              <a href={getId(entity.inbox).href}>
                Inbox
              </a>
            </li>
            <li>
              <a href={getId(entity.outbox).href}>
                Outbox
              </a>
            </li>
          </ul>
        </dd>
      </dl>

      <h2>
        Follow
      </h2>
      <FollowForm follower={user} followee={entity} />

      <h2>
        Followers
      </h2>
      <ul>
        {followers.map(follower => {
          return (
            <li>
              <a href={getId(follower).href || '#'}>
                {getId(follower).href}
              </a>
            </li>
          );
        })}
      </ul>

      <h2>
        Following
      </h2>
      <ul>
        {following.map(followee => {
          return (
            <li>
              <a href={getId(followee).href || '#'}>
                {getId(followee).href}
              </a>
            </li>
          );
        })}
      </ul>
      
      <h2>
        Requests
      </h2>
      <ul>
        {requests.map(request => {
          return (
            <li>
              <a href={getId(request).href || '#'}>
                {getId(request).href}
              </a>
            </li>
          );
        })}
      </ul>

      <textarea defaultValue={JSON.stringify(entity, null, 2)} />
    </PageChrome>
  );
}