import React from 'react';
import { Loader2 } from 'lucide-react';

export const SkeletonLoader = () => (
  <div className="animate-pulse">
    <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded-xl mb-4" />
    <div className="space-y-3">
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded" />
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6" />
    </div>
  </div>
);

export const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
    <div className="text-center">
      <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Loader2 className="w-8 h-8 text-red-600 dark:text-red-400 animate-spin" />
      </div>
      <p className="text-slate-600 dark:text-slate-400 font-medium">Loading...</p>
    </div>
  </div>
);

export const CardSkeleton = ({ count = 4 }: { count?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="rounded-2xl p-6 bg-white dark:bg-slate-800 animate-pulse">
        <div className="w-full h-48 bg-slate-200 dark:bg-slate-700 rounded-xl mb-4" />
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded mb-2 w-4/5" />
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
      </div>
    ))}
  </div>
);

interface LoaderProps {
  isLoading: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const ConditionalLoader = ({ isLoading, children, fallback }: LoaderProps) => {
  if (isLoading) {
    return fallback || <PageLoader />;
  }
  return <>{children}</>;
};
