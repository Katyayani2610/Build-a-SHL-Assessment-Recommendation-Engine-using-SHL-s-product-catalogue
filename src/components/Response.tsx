import React from 'react';
import ReactMarkdown from 'react-markdown';

interface ResponseProps {
  answer: string;
  isLoading: boolean;
}

export function Response({ answer, isLoading }: ResponseProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4 w-full max-w-3xl">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (!answer) return null;

  return (
    <div className="w-full max-w-3xl bg-white rounded-lg shadow-sm p-6">
      <ReactMarkdown className="prose prose-blue max-w-none">
        {answer}
      </ReactMarkdown>
    </div>
  );
}