'use client';

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import MetricsDisplay from '@/components/MetricsDisplay';
import TrendChart from '@/components/TrendChart';
import SummarySection from '@/components/SummarySection';
import { SearchAPIResponse } from '@/types';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState('this week');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [resultLimit, setResultLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SearchAPIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: searchQuery,
          timeFilter,
          categoryFilter,
          resultLimit,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch data');
      }
      
      setData(result);
    } catch (error) {
      console.error('Search error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred while searching');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-neutral-900">
            Startup Funding <span className="gradient-text">Tracker</span>
          </h1>
          <p className="mt-2 text-sm text-neutral-600">
            Powered by Firecrawl Agent • Searches the web for real-time funding data
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          timeFilter={timeFilter}
          setTimeFilter={setTimeFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          resultLimit={resultLimit}
          setResultLimit={setResultLimit}
          onSearch={handleSearch}
          loading={loading}
        />

        {loading && (
          <div className="mt-8 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
            <p className="mt-4 text-neutral-600">Searching for funding data...</p>
          </div>
        )}

        {error && !loading && (
          <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">⚠️</div>
            <h3 className="text-lg font-semibold text-red-900 mb-2">Error</h3>
            <p className="text-red-700">{error}</p>
            <button
              onClick={handleSearch}
              className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {data && data.success && !loading && !error && (
          <>
            <MetricsDisplay data={data} searchQuery={searchQuery} />
            <TrendChart data={data} />
            <SummarySection data={data} />
          </>
        )}

        {!data && !loading && !error && (
          <div className="mt-16 text-center">
            <div className="text-6xl mb-4">🚀</div>
            <h2 className="text-2xl font-semibold text-neutral-800 mb-2">
              Track Startup Funding Trends
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Search for startups by category (AI, Finance, HealthTech, etc.) and time period 
              to discover recent funding rounds from around the world.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
