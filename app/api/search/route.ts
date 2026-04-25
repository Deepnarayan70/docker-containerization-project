import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY;
const FIRECRAWL_API_URL = 'https://api.firecrawl.dev/v2/search';

// Validate API key on module load
if (!FIRECRAWL_API_KEY) {
  console.error('FIRECRAWL_API_KEY is not set in environment variables');
}

// Helper function to build search query
function buildSearchQuery(query: string, timeFilter: string, categoryFilter: string) {
  let searchQuery = '';
  
  // Add category if not "all"
  if (categoryFilter && categoryFilter !== 'all') {
    searchQuery += `${categoryFilter} `;
  }
  
  // Add custom query or default
  if (query) {
    searchQuery += `${query} `;
  }
  
  // Add "startup funding" context
  searchQuery += 'startup funding investment raised';
  
  return searchQuery.trim();
}

// Helper function to get time-based search parameter
function getTimeParameter(timeFilter: string) {
  switch (timeFilter) {
    case 'today':
      return 'qdr:d'; // Past 24 hours
    case 'this week':
      return 'qdr:w'; // Past week
    case 'this month':
      return 'qdr:m'; // Past month
    default:
      return 'qdr:w';
  }
}

// Generate mock metrics based on search results
function generateMetrics(searchResults: any[], query: string) {
  const resultCount = searchResults.length;
  
  // Calculate trend score (mock algorithm)
  const trendScore = Math.min(Math.floor((resultCount * 9.2) + Math.random() * 10), 100);
  
  // Determine direction
  const direction = trendScore > 70 ? 'Rising' : trendScore > 40 ? 'Stable' : 'Declining';
  
  // Calculate growth rate
  const growthRate = `+${(Math.random() * 500 + 100).toFixed(2)}%`;
  
  // Sentiment
  const sentiment = resultCount > 5 ? 'Positive' : resultCount > 2 ? 'Neutral' : 'Mixed';
  
  // Peak date (simulate)
  const today = new Date();
  const peakDate = new Date(today);
  peakDate.setDate(today.getDate() - Math.floor(Math.random() * 7));
  const peakDateStr = peakDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  
  // Confidence
  const confidence = `${Math.floor(85 + Math.random() * 15)}%`;
  
  return {
    trendScore,
    direction,
    growthRate,
    sentiment,
    peakDate: peakDateStr,
    confidence,
  };
}

// Generate chart data
function generateChartData(searchResults: any[]) {
  const labels: string[] = [];
  const scores: number[] = [];
  const mentions: number[] = [];
  
  // Generate 14 days of data
  const today = new Date();
  for (let i = 13; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    
    // Simulate trend scores with some randomness
    const baseScore = 2000 + Math.random() * 2000;
    const trend = i < 7 ? (7 - i) * 300 : 0; // Rising trend in recent days
    scores.push(Math.floor(baseScore + trend + Math.random() * 500));
    
    // Mentions
    mentions.push(Math.floor(Math.random() * 100 + 50));
  }
  
  return { labels, scores, mentions };
}

// Generate summary
function generateSummary(searchResults: any[], query: string, timeFilter: string) {
  const resultCount = searchResults.length;
  const categoryName = query || 'startups';
  
  const summaries = [
    `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} funding has experienced explosive growth throughout ${timeFilter}, becoming one of the most active sectors in venture capital. `,
    `The trend accelerated with major announcements including significant Series A, B, and C rounds. `,
    `Key investors have shown increased interest, with notable deals from leading VC firms across North America, Europe, and Asia.`
  ];
  
  return summaries.join('');
}

// Extract funding information from search results
function extractFundingInfo(result: any) {
  const title = result.title || '';
  const description = result.description || result.snippet || '';
  const markdown = result.markdown || '';
  const combinedText = `${title} ${description} ${markdown}`.toLowerCase();
  
  // Extract funding amount using regex patterns
  const fundingPatterns = [
    /\$(\d+(?:\.\d+)?)[\s]*(million|m|billion|b|k|thousand)/gi,
    /(\d+(?:\.\d+)?)[\s]*(million|billion|m|b)[\s]*(?:funding|raised|investment|round|series)/gi,
    /raised[\s]*\$(\d+(?:\.\d+)?)[\s]*(million|m|billion|b)/gi,
    /series[\s]+[a-z]+[\s]*\$(\d+(?:\.\d+)?)[\s]*(million|m|billion|b)/gi,
  ];
  
  let fundingAmount = null;
  for (const pattern of fundingPatterns) {
    const match = combinedText.match(pattern);
    if (match) {
      fundingAmount = match[0];
      break;
    }
  }
  
  // Extract round type
  const roundPatterns = [
    /series[\s]+[a-z]+/gi,
    /seed[\s]+round/gi,
    /pre-seed/gi,
    /angel[\s]+round/gi,
  ];
  
  let roundType = null;
  for (const pattern of roundPatterns) {
    const match = combinedText.match(pattern);
    if (match) {
      roundType = match[0];
      break;
    }
  }
  
  // Extract email from links or markdown
  const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi;
  const emails = combinedText.match(emailPattern);
  const email = emails && emails.length > 0 ? emails[0] : null;
  
  // Get website link
  const websiteUrl = result.url || null;
  
  // Extract company name (usually in title before certain keywords)
  const companyMatch = title.match(/^([^-–|]+)/);
  const companyName = companyMatch ? companyMatch[1].trim() : null;
  
  return {
    companyName,
    fundingAmount,
    roundType,
    email,
    websiteUrl,
    hasDetails: !!(fundingAmount || roundType || email),
  };
}

// Generate key insights
function generateInsights(searchResults: any[], query: string) {
  const insights = [
    {
      type: 'Major Breakthrough',
      text: `${searchResults.length}+ funding rounds identified within search period, showing unprecedented momentum in the sector`,
    },
    {
      type: 'Geographic Distribution',
      text: 'Strong funding activity across US (45%), Europe (30%), and Asia (25%) markets',
    },
    {
      type: 'Investment Size',
      text: 'Average round size trending upward, with several unicorn-level investments',
    },
  ];
  
  return insights;
}

export async function POST(request: NextRequest) {
  try {
    // Validate API key
    if (!FIRECRAWL_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: 'API configuration error',
          details: 'FIRECRAWL_API_KEY is not configured. Please set it in your environment variables.',
        },
        { status: 500 }
      );
    }

    const { query, timeFilter, categoryFilter, resultLimit = 10 } = await request.json();
    
    // Build the search query
    const searchQuery = buildSearchQuery(query, timeFilter, categoryFilter);
    const tbs = getTimeParameter(timeFilter);
    
    console.log('Searching for:', searchQuery, 'with tbs:', tbs, 'limit:', resultLimit);
    
    // Call Firecrawl API
    const response = await axios.post(
      FIRECRAWL_API_URL,
      {
        query: searchQuery,
        limit: resultLimit,
        tbs: tbs,
        sources: ['web', 'news'],
        scrapeOptions: {
          formats: ['markdown', 'links'],
          onlyMainContent: true,
        },
      },
      {
        headers: {
          'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    console.log('Firecrawl API Response:', JSON.stringify(response.data, null, 2));
    
    // Extract search results - handle different response structures
    let searchResults = [];
    if (response.data?.data) {
      // Check if data is an array or contains web/news properties
      if (Array.isArray(response.data.data)) {
        searchResults = response.data.data;
      } else if (response.data.data.web) {
        // Combine web and news results
        searchResults = [
          ...(response.data.data.web || []),
          ...(response.data.data.news || []),
        ];
      }
    }
    
    console.log('Processed search results count:', searchResults.length);
    
    // Ensure searchResults is an array
    if (!Array.isArray(searchResults)) {
      console.error('searchResults is not an array:', typeof searchResults);
      searchResults = [];
    }
    
    // Extract funding information from each result
    const enrichedResults = searchResults.map((result: any) => ({
      ...result,
      fundingInfo: extractFundingInfo(result),
    }));
    
    // Generate metrics and insights
    const metrics = generateMetrics(enrichedResults, query || categoryFilter);
    const chartData = generateChartData(searchResults);
    const summary = generateSummary(searchResults, query || categoryFilter, timeFilter);
    const insights = generateInsights(searchResults, query || categoryFilter);
    
    return NextResponse.json({
      success: true,
      searchResults: enrichedResults,
      metrics,
      chartData,
      summary,
      insights,
      query: searchQuery,
    });
    
  } catch (error: any) {
    console.error('API Error:', error.response?.data || error.message);
    console.error('Full error:', JSON.stringify(error.response?.data, null, 2));
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch data',
        details: error.response?.data || 'No additional details',
      },
      { status: 500 }
    );
  }
}
