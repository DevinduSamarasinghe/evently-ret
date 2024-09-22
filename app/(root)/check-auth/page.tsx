"use client"

import { SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const { user } = useUser(); // Correct usage to get full user data
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      // Call the API route to start the Google OAuth flow
      router.push('http://localhost:3000/api/auth/google');
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };

  return (
    <div>
      <h1>Clerk & Google OAuth Integration</h1>

      <SignedIn>
        <p>Welcome, {user?.firstName}</p>
        <button onClick={handleGoogleLogin} className="btn btn-primary">
          Login with Google
        </button>
      </SignedIn>

      <SignedOut>
        <p>You are not signed in. Please sign in first.</p>
      </SignedOut>
    </div>
  );
};

export default HomePage;
