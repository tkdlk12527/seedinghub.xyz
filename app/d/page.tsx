import { Suspense } from 'react';
import DealsClientPage from './deals-client-page';

export default function DealsPage() {
  return (
    <Suspense fallback={<div className="text-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div><p className="text-gray-600">Đang tải trang...</p></div>}>
      <DealsClientPage />
    </Suspense>
  );
}