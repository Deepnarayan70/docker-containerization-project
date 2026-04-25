// Funding Information Types
export interface FundingInfo {
  companyName: string | null;
  fundingAmount: string | null;
  roundType: string | null;
  email: string | null;
  websiteUrl: string | null;
  hasDetails: boolean;
}

// Search Result Types
export interface SearchResult {
  url: string;
  title: string;
  description?: string;
  snippet?: string;
  markdown?: string;
  links?: string[];
  date?: string;
  category?: string;
  fundingInfo?: FundingInfo;
}

// Metrics Types
export interface Metrics {
  trendScore: number;
  direction: string;
  growthRate: string;
  sentiment: string;
  peakDate: string;
  confidence: string;
}

// Chart Data Types
export interface ChartData {
  labels: string[];
  scores: number[];
  mentions: number[];
}

// Insight Types
export interface Insight {
  type: string;
  text: string;
}

// API Response Types
export interface SearchAPIResponse {
  success: boolean;
  searchResults: SearchResult[];
  metrics: Metrics;
  chartData: ChartData;
  summary: string;
  insights: Insight[];
  query: string;
  error?: string;
  details?: any;
}

// Request Types
export interface SearchRequest {
  query: string;
  timeFilter: string;
  categoryFilter: string;
  resultLimit: number;
}
