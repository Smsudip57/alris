'use client'

import { useState, FormEvent } from 'react';
import { toast } from 'sonner';

import React, { JSX } from 'react';

export function WaitlistForm(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      toast.success('Successfully joined the waitlist!');
      setEmail('');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };
  console.log('Submitting form with email:', email);
  console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-4 py-2 rounded-lg bg-[#111218] border border-[#54F4EC]/20"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 rounded-lg hover:bg-[#54F4EC]/10 bg-[#B04FB8]/50 hover:text-white disabled:opacity-50"
      >
        {loading ? 'Joining...' : 'Join Waitlist'}
      </button>
    </form>
  );
}

