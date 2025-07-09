import { useRef, useState } from 'react';
import { YoutubeAPIVideo } from '@/types/youtube-api';
import YoutubeCard from '@/components/YoutubeCard';
import { fetchYoutubeSearchResults } from '@/lib/youtube';
import { cn } from '@/lib/utils';

const HomePage = () => { 
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [results, setResults] = useState<YoutubeAPIVideo[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>(undefined);
  const [prevPageToken, setPrevPageToken] = useState<string | undefined>(undefined);
  const [isSearching, setIsSearching] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const search = async (q: string, page?: string) => {
    setIsSearching(true);
    const res = await fetchYoutubeSearchResults(q, page);
    setResults(res.items);
    setNextPageToken(res.nextPageToken);
    setPrevPageToken(res.prevPageToken);
    setSubmittedQuery(q);
    setIsSearching(false);
    console.log(results)
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;
    search(query);
  };

  const goToPage = (token: string | undefined) => {
    if (!submittedQuery || !token) return;
    search(submittedQuery, token);
  };

  return (
    <div className="h-full w-full bg-white dark:bg-black text-black dark:text-white transition-all flex flex-col">
      <div
        className={cn(
          'flex items-center justify-center transition-all duration-700 gap-4',
          submittedQuery
            ? 'items-start px-6 pt-4 space-y-2 flex-row'
            : 'h-screen overflow-hidden space-y-6 flex-col'
        )}
      >
        <h1
          className={cn(
            'font-handwritten transition-all duration-700',
            submittedQuery ? 'text-2xl' : 'text-6xl'
          )}
        >
          FOCUSTUBE
        </h1>

        <form
          onSubmit={handleSubmit}
          className={cn(
            'transition-all duration-700 flex',
            submittedQuery ? 'ml-2 w-full max-w-md' : 'w-3/4'
          )}
        >
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search YouTube..."
            className="w-full rounded-l-xl border-4 border-black dark:border-white px-4 py-3 font-mono text-lg focus:outline-none bg-transparent shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transform -translate-y-1 translate-x-1"
          />
          <button
            type="submit"
            className="cursor-pointer rounded-r-xl border-4 border-l-0 border-black dark:border-white px-5 py-1 font-black hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transform -translate-y-1 translate-x-1"
          >
            🔍
          </button>
        </form>
      </div>

      {submittedQuery && (
        <div className="mt-4 px-6 space-y-4">
          {isSearching ? (
            <p className="text-center text-lg">Loading...</p>
          ) : results.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {results.map((video) => (
                  <YoutubeCard key={video.id} video={video}/>
                ))}
              </div>

              <div className="flex justify-center gap-12 my-6">
                <button
                  disabled={!prevPageToken}
                  onClick={() => goToPage(prevPageToken)}
                  className="px-4 py-2 cursor-pointer border border-black dark:border-white rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black disabled:opacity-40"
                >
                  ◀ Previous
                </button>
                <button
                  disabled={!nextPageToken}
                  onClick={() => goToPage(nextPageToken)}
                  className="px-4 py-2 cursor-pointer border border-black dark:border-white rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black disabled:opacity-40"
                >
                  Next ▶
                </button>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500 mt-6">No results found.</p>
          )}
        </div>
      )}
    </div>
  );
}; 

export default HomePage;