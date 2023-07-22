import { CoreLibrary } from '@activity-kit/core';
import * as AP from '@activity-kit/types';

declare module 'express' {
  interface Request {
    activitypub: CoreLibrary;
    user: AP.Actor | null;
  }
}

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    shadowrootmode?: string;
  }
}

export const HTML_DOCTYPE = '<!DOCTYPE html>';
