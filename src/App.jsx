import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, BookOpen, RefreshCw } from 'lucide-react';

const categories = [
  'random',
  'science',
  'history',
  'technology',
  'food',
  'animal',
  'space'
];

const FunFactsApp = () => {
  const [fact, setFact] = useState('Click the button to get a random fact!');
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('random');
  const [error, setError] = useState(null);

  const fetchFact = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.api-ninjas.com/v1/facts?limit=1&category=${category}`, {
        headers: {
          'X-Api-Key': import.meta.env.VITE_API_NINJA_KEY
        }
      });
      const data = await response.json();
      if (data.length > 0) {
        setFact(data[0].fact);
      }
    } catch (err) {
      setError('Failed to fetch fact. Please try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <BookOpen className="h-6 w-6" />
                Fun Facts Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={category === cat ? "default" : "outline"}
                    onClick={() => setCategory(cat)}
                    className="capitalize"
                  >
                    {cat}
                  </Button>
                ))}
              </div>
              
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="min-h-[100px] flex items-center justify-center text-center">
                    {loading ? (
                      <Loader2 className="h-8 w-8 animate-spin" />
                    ) : error ? (
                      <p className="text-red-500">{error}</p>
                    ) : (
                      <p className="text-lg">{fact}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center">
                <Button
                  size="lg"
                  onClick={fetchFact}
                  disabled={loading}
                  className="gap-2"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                  Get New Fact
                </Button>
              </div>

              <div className="flex justify-center">
                <img
                  src="/api/placeholder/400/300"
                  alt="Random placeholder image"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p>Developed by Cedric Kent Centeno</p>
          </div>
          <div className="flex space-x-6">
            <a href="mailto:cdrcknt@gmail.com" className="hover:text-blue-400 transition-colors">
              <i className="fas fa-envelope text-xl"></i>
            </a>
            <a href="https://github.com/cdrcknt" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              <i className="fab fa-github text-xl"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FunFactsApp;