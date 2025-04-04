import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { Response } from './components/Response';
import { Brain } from 'lucide-react';
import { supabase } from './lib/supabase';
import { AssessmentTable } from './components/AssessmentTable';
import { Assessment } from './types';

function App() {
  const [query, setQuery] = useState('');
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const { data: embeddings } = await supabase.functions.invoke('generate-embeddings', {
        body: { query: query.trim() }
      });

      const { data: matches } = await supabase.rpc('match_assessments', {
        query_embedding: embeddings,
        match_threshold: 0.8,
        match_count: 10
      });

      setAssessments(matches || []);
    } catch (error) {
      console.error('Error:', error);
      setAssessments([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            SHL Assessment Finder
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enter a job description or requirements to find the most relevant SHL assessments for your hiring needs.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-8">
          <SearchBar
            query={query}
            setQuery={setQuery}
            onSearch={handleSearch}
            placeholder="Enter job description or requirements..."
          />
          <AssessmentTable assessments={assessments} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default App;