'use client';

import React from 'react';
import { Link } from '@/i18n/routing';
import { trackEvent } from '@/lib/analytics';

type TrackedLinkProps = React.ComponentProps<typeof Link> & { eventName: string };

/**
 * Locale-aware Link that fires a GA4 event on click (e.g. click_consultation).
 */
export default function TrackedLink({ eventName, onClick, ...props }: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        trackEvent(eventName);
        onClick?.(e);
      }}
    />
  );
}
