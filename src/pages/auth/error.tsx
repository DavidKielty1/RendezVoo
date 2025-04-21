import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ErrorPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  useEffect(() => {
    const { error } = router.query;
    
    if (error) {
      setErrorMessage(String(error));
      console.error("Auth error:", error);
    }
  }, [router.query]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-red-500">Authentication Error</h1>
        
        <div className="mb-6">
          <p className="text-lg mb-2">Error code: {errorMessage}</p>
          
          {errorMessage === 'OAuthCreateAccount' && (
            <div className="mt-4 p-4 bg-gray-700 rounded">
              <p className="mb-2">This error typically occurs when:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>There's an issue connecting to the database</li>
                <li>The database schema doesn't match what NextAuth expects</li>
                <li>There's a duplicate user account</li>
                <li>Required fields are missing</li>
              </ul>
            </div>
          )}
        </div>
        
        <div className="flex space-x-4">
          <button 
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
          >
            Return Home
          </button>
          <button 
            onClick={() => router.push('/api/auth/signin')}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
} 