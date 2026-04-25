'use client';

import { Lightbulb, ExternalLink, DollarSign, Mail, Building2, TrendingUp } from 'lucide-react';
import { SearchAPIResponse } from '@/types';

interface SummarySectionProps {
  data: SearchAPIResponse;
}

export default function SummarySection({ data }: SummarySectionProps) {
  if (!data) {
    return null;
  }

  const { summary, insights, searchResults } = data;

  return (
    <div className="mt-8 space-y-6">
      {/* Summary */}
      {summary && (
        <div className="bg-white rounded-lg card-shadow p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="bg-primary-50 p-2 rounded-lg">
              <Lightbulb className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-900">Summary</h3>
            </div>
          </div>
          <p className="text-neutral-700 leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Key Insights */}
      {insights && insights.length > 0 && (
        <div className="bg-white rounded-lg card-shadow p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Key Insights</h3>
          <div className="space-y-3">
            {insights.map((insight: any, index: number) => (
            <div key={index} className="flex gap-3 p-3 bg-neutral-50 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-semibold text-sm">
                {index + 1}
              </div>
              <div>
                <div className="font-medium text-neutral-900 mb-1">{insight.type}</div>
                <div className="text-sm text-neutral-600">{insight.text}</div>
              </div>
            </div>
          ))}
          </div>
        </div>
      )}

      {/* Startup Funding Details */}
      {searchResults && searchResults.length > 0 && (
        <div className="bg-white rounded-lg card-shadow p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">
            Startup Funding Details
          </h3>
          <div className="space-y-4">
            {searchResults.map((result: any, index: number) => {
              const info = result.fundingInfo || {};
              return (
                <div
                  key={index}
                  className="p-5 bg-gradient-to-br from-neutral-50 to-white border border-neutral-200 hover:border-primary-300 rounded-lg transition-all hover:shadow-md"
                >
                  {/* Header with company name and emoji */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="flex-shrink-0 text-2xl">
                        {info.hasDetails ? '🚀' : result.category === 'news' ? '📰' : '🌐'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-neutral-900 mb-1 line-clamp-2">
                          {info.companyName || result.title}
                        </h4>
                        <p className="text-sm text-neutral-600 line-clamp-2 mb-3">
                          {result.description || result.snippet}
                        </p>
                        
                        {/* Funding Details Grid */}
                        {info.hasDetails && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                            {info.fundingAmount && (
                              <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
                                <DollarSign className="w-4 h-4 text-green-600 flex-shrink-0" />
                                <div>
                                  <div className="text-xs text-green-700 font-medium">Funding Amount</div>
                                  <div className="text-sm font-bold text-green-900">
                                    {info.fundingAmount.toUpperCase()}
                                  </div>
                                </div>
                              </div>
                            )}
                            {info.roundType && (
                              <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                                <TrendingUp className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                <div>
                                  <div className="text-xs text-blue-700 font-medium">Round Type</div>
                                  <div className="text-sm font-bold text-blue-900 capitalize">
                                    {info.roundType}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        
                        {/* Links and Contact */}
                        <div className="flex flex-wrap items-center gap-3">
                          {info.websiteUrl && (
                            <a
                              href={info.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 hover:bg-primary-100 text-primary-700 hover:text-primary-900 rounded-md text-xs font-medium transition-colors"
                            >
                              <Building2 className="w-3.5 h-3.5" />
                              Visit Website
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          {info.email && (
                            <a
                              href={`mailto:${info.email}`}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 hover:text-purple-900 rounded-md text-xs font-medium transition-colors"
                            >
                              <Mail className="w-3.5 h-3.5" />
                              {info.email}
                            </a>
                          )}
                          {result.date && (
                            <span className="px-3 py-1.5 bg-neutral-100 text-neutral-600 rounded-md text-xs font-medium">
                              {result.date}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Source */}
                  <div className="text-xs text-neutral-500 mt-3 pt-3 border-t border-neutral-200">
                    Source: {info.websiteUrl ? new URL(info.websiteUrl).hostname : 'N/A'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
