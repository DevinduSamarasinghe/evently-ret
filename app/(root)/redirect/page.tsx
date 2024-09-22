"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const OAuthRedirect = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  // Extract code from query parameters
  const code = searchParams.get('code');

  useEffect(() => {
    // Handle OAuth flow after the component is mounted
    const handleOAuth = async () => {
      if (!code) {
        setError('No authorization code found.');
        return;
      }

      try {
        // Redirect to the API route where server-side logic happens
        router.push(`/api/auth/callback?code=${code}`);
      } catch (err) {
        console.error('Error during OAuth:', err);
        setError('Failed to complete OAuth flow.');
      }
    };

    handleOAuth();
  }, [code, router]); // Only run when the component mounts and `code` changes

  // Display error or loading message
  return <p>{error ? error : 'Processing OAuth, please wait...'}</p>;
};

export default OAuthRedirect;
