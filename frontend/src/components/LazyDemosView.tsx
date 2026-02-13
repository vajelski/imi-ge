'use client';

import dynamic from 'next/dynamic';

const DemosView = dynamic(() => import('./DemosView'), { ssr: false });

export default function LazyDemosView() {
    return <DemosView />;
}
