'use client';

import { Search } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  timeFilter: string;
  setTimeFilter: (filter: string) => void;
  categoryFilter: string;
  setCategoryFilter: (filter: string) => void;
  resultLimit: number;
  setResultLimit: (limit: number) => void;
  onSearch: () => void;
  loading: boolean;
}

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  timeFilter,
  setTimeFilter,
  categoryFilter,
  setCategoryFilter,
  resultLimit,
  setResultLimit,
  onSearch,
  loading,
}: SearchBarProps) {
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'AI', label: 'AI & Machine Learning' },
    { value: 'fintech', label: 'Finance & Fintech' },
    { value: 'healthtech', label: 'Healthcare & Biotech' },
    { value: 'ecommerce', label: 'E-commerce & Retail' },
    { value: 'saas', label: 'SaaS & Enterprise' },
    { value: 'crypto', label: 'Crypto & Web3' },
    { value: 'cleantech', label: 'Climate & Clean Energy' },
    { value: 'edtech', label: 'Education Technology' },
  ];

  const timeFilters = [
    { value: 'today', label: 'Today' },
    { value: 'this week', label: 'This Week' },
    { value: 'this month', label: 'This Month' },
  ];

  const resultLimits = [
    { value: 10, label: '10 results', credits: '2 credits' },
    { value: 50, label: '50 results', credits: '10 credits' },
    { value: 100, label: '100 results', credits: '20 credits' },
  ];

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      onSearch();
    }
  };

  return (
    <div className="bg-white rounded-lg card-shadow p-6">
      {/* Search Input */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search for specific startups or keywords..."
            className="w-full pl-12 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-neutral-900 placeholder-neutral-400"
            disabled={loading}
          />
        </div>
        <button
          onClick={onSearch}
          disabled={loading}
          className="px-8 py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-neutral-300 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          <span className="text-lg">🔥</span>
          Track Trend
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        {/* Time Filter */}
        <div className="flex gap-2">
          {timeFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setTimeFilter(filter.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeFilter === filter.value
                  ? 'bg-primary-100 text-primary-700 border-2 border-primary-500'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border-2 border-transparent'
              }`}
              disabled={loading}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Category Dropdown */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border-2 border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 transition-colors"
          disabled={loading}
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>

        {/* Result Limit Dropdown */}
        <select
          value={resultLimit}
          onChange={(e) => setResultLimit(Number(e.target.value))}
          className="px-4 py-2 border-2 border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm font-medium text-primary-700 bg-primary-50 hover:bg-primary-100 transition-colors"
          disabled={loading}
        >
          {resultLimits.map((limit) => (
            <option key={limit.value} value={limit.value}>
              {limit.label} ({limit.credits})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
