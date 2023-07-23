import * as React from 'react';
import * as AP from  '@activity-kit/types';

import PageChrome from '../components/PageChrome';
import EditProfileForm from '../components/EditProfileForm';

export default ({ user }: { user: AP.Actor | null }) => (
  <PageChrome
    title="Edit Profile"
    user={user}>
    <h1>
      Edit Profile
    </h1>
    <EditProfileForm />
  </PageChrome>
);
