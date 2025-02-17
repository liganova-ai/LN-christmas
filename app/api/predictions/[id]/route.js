import { NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Prevent caching
replicate.fetch = (url, options) => fetch(url, { cache: "no-store", ...options });

export async function GET(request, { params }) {
  // Await params before accessing properties, params --> from dynamic route get param [id]
  const { id } = await params;

  try {
    const prediction = await replicate.predictions.get(id);

    if (prediction?.error) {
      return NextResponse.json({ detail: prediction.error }, { status: 500 });
    }

    return NextResponse.json(prediction);
  } catch (error) {
    return NextResponse.json(
      { detail: "Failed to retrieve prediction", error: error.message },
      { status: 500 }
    );
  }
}

