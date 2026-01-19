import HeroSection from '@/components/landing-page/hero';
import LandingPageNavbar from '@/components/navbar/landing-page-navbar';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Suspense } from 'react';

export const Route = createFileRoute('/_public')({
  component: PublicLayout,
});

function PublicLayout() {
  return (
    <div>
      <LandingPageNavbar />

      <div className="mx-auto max-w-6xl">
        <Suspense fallback={<SkeletonPage />}>
          <HeroSection />
        </Suspense>
      </div>
    </div>
  );
}

function SkeletonPage() {
  return (
    <div className="p-6 animate-pulse">
      <div className="h-6 w-1/3 bg-gray-300 rounded mb-4" />
      <div className="h-4 w-1/2 bg-gray-200 rounded mb-2" />
      <div className="h-4 w-2/3 bg-gray-200 rounded mb-2" />
      <div className="h-4 w-1/3 bg-gray-200 rounded" />
    </div>
  );
}
