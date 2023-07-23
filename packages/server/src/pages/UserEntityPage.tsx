import * as React from 'react';
import * as AP from '@activity-kit/types';
import { getArray, getEntity, getId } from '@activity-kit/utilities';

import PageChrome from '../components/Chrome/PageChrome';
import FollowForm from '../components/Forms/FollowForm';
import FeedActivity from '../components/Feed/Activity';
import FeedEntity from '../components/Feed/Entity';

export default ({ entity, user }: { entity: AP.Actor, user: AP.Actor | null }) => {
  const getItems = (collection: AP.EitherCollection | null) => {
    if (!collection) {
      return [];
    }

    return [...getArray(collection.items), ...getArray(collection.orderedItems)];
  }

  const posts = getItems(getEntity<AP.OrderedCollection>(entity.outbox));
  const followers = getItems(getEntity<AP.OrderedCollection>(entity.followers));
  const following = getItems(getEntity<AP.OrderedCollection>(entity.following));
  const streams = entity.streams.map((stream) => {
    const entity = getEntity<AP.EitherCollection>(stream);

    if (!entity) {
      return null;
    }

    return {
      ...entity,
      items: getArray(entity.items),
      orderedItems: getArray(entity.orderedItems),
    };
  });

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
        {followers.map((follower) => {
          return (
            <li key={getId(follower).href}>
              <a href={getId(follower).href}>
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
        {following.map((followee) => {
          return (
            <li key={getId(followee).href}>
              <a href={getId(followee).href || '#'}>
                {getId(followee).href}
              </a>
            </li>
          );
        })}
      </ul>

      <h2>
        Recent Posts
      </h2>

      {posts.map((post) => {
        if (!post || post instanceof URL) {
          return null;
        }

        return (
          <FeedActivity
            key={getId(post).href}
            object={post}
          />
        );
      })}

      {streams.map((stream) => {
        if (!stream) {
          return null;
        }

        const items = [...stream.items, ...stream.orderedItems];

        return (
          <React.Fragment key={stream.name}>
            <h2>
              {stream.name}
            </h2>
            <div role="list">
              {items.map((item) => (
                <FeedEntity
                  role="listitem"
                  key={getId(item).href}
                  object={post}
                />
              ))}
            </div>
          </React.Fragment>
        );
      })}
      
      <textarea defaultValue={JSON.stringify(entity, null, 2)} />
    </PageChrome>
  );
}