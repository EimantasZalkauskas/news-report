const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000').replace(
  /\/+$/,
  '',
);

export type NewsArticle = {
  id: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
};

type GuardianNewsResponse = {
  response: {
    results: NewsArticle[];
  };
};

export async function fetchNews(searchValue:String,signal?: AbortSignal,): Promise<NewsArticle[]> {
  const response = await fetch(`${API_BASE_URL}/api/news?category=${searchValue}`, { signal
  });
  if (!response.ok) {
    throw new Error(`Could not load news (HTTP ${response.status})`);
  }

  const data: GuardianNewsResponse = await response.json();
  return data.response.results;
}
