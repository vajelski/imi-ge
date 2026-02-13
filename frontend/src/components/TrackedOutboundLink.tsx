'use client';

import React from 'react';
import { trackEvent } from '@/lib/analytics';

interface TrackedOutboundLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  eventName: string;
  href: string;
  children: React.ReactNode;
}

/**
 * Outbound <a> (mailto, tel, external) that fires a GA4 event on click.
 */
export default function TrackedOutboundLink({ eventName, onClick, ...props }: TrackedOutboundLinkProps) {
  return (
    <a
      {...props}
      onClick={(e) => {
        trackEvent(eventName);
        onClick?.(e);
      }}
    />
  );
}
