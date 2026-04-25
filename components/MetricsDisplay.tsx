'use client';

import { TrendingUp, TrendingDown, Calendar, ThumbsUp, Target } from 'lucide-react';
import { SearchAPIResponse } from '@/types';

interface MetricsDisplayProps {
  data: SearchAPIResponse;
  searchQuery: string;
}

export default function MetricsDisplay({ data, searchQuery }: MetricsDisplayProps) {
  if (!data || !data.metrics) {
    return null;
  }

  const { metrics } = data;

  const metricCards = [
    {
      icon: Target,
      value: `${metrics.trendScore}/100`,
      label: 'Trend Score',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: metrics.direction === 'Rising' ? TrendingUp : TrendingDown,
      value: metrics.direction,
      label: 'Direction',
      color: metrics.direction === 'Rising' ? 'text-green-600' : 'text-blue-600',
      bgColor: metrics.direction === 'Rising' ? 'bg-green-50' : 'bg-blue-50',
    },
    {
      icon: TrendingUp,
      value: metrics.growthRate,
      label: 'Growth Rate',
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
    },
    {
      icon: ThumbsUp,
      value: metrics.sentiment,
      label: 'Sentiment',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Calendar,
      value: metrics.peakDate,
      label: 'Peak Date',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: Target,
      value: metrics.confidence,
      label: 'Confidence',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <div className="mt-8">
      {/* Title with search query */}
      <div className="mb-6 flex items-center gap-2">
        <div className="text-2xl">📈</div>
        <h2 className="text-2xl font-bold text-neutral-900">
          {searchQuery || 'Startup Funding'}
        </h2>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {metricCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg card-shadow p-5 hover:scale-105 transition-transform"
            >
              <div className={`${card.bgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-3`}>
                <Icon className={`w-6 h-6 ${card.color}`} />
              </div>
              <div className={`text-2xl font-bold ${card.color} mb-1`}>
                {card.value}
              </div>
              <div className="text-sm text-neutral-600">{card.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
