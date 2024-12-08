"use client"
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="welcome-screen">
      <h1>Welcome to the AI Photo App</h1>
      <button onClick={() => router.push('/upload')}>Start</button>
    </div>
  );
}
