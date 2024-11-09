import React from 'react';
import { Newspaper, ExternalLink } from 'lucide-react';

interface NewsItem {
  title: string;
  source: string;
  timestamp: string;
  url: string;
}

interface NewsSectionProps {
  news: NewsItem[];
}

const NewsSection: React.FC<NewsSectionProps> = ({ news }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Newspaper className="h-6 w-6 text-indigo-500 mr-2" />
        <h2 className="text-xl font-bold">Latest News</h2>
      </div>

      <div className="space-y-4">
        {news.map((item, index) => (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <span>{item.source}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-gray-400 ml-2 flex-shrink-0" />
            </div>
          </a>
        ))}
        {news.length === 0 && (
          <p className="text-gray-500 text-center py-4">
            No news available at the moment.
          </p>
        )}
      </div>
    </div>
  );
}

export default NewsSection;