import { NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(request) {
  const { prompt, main_face_image } = await request.json();

  if (!prompt || !main_face_image) {
    return NextResponse.json(
      { detail: "Missing prompt or main_face_image in request body" },
      { status: 400 }
    );
  }

  // Validate Base64 string
  if (!main_face_image.startsWith("data:image/")) {
    return NextResponse.json(
      { detail: "Invalid image format. Please upload a valid image." },
      { status: 400 }
    );
  }

  try {
    // Create the prediction
    const prediction = await replicate.predictions.create({
      version: '8baa7ef2255075b46f4d91cd238c21d31181b3e6a864463f967960bb0112525b',
      input: {
        prompt,
        start_step: 4,
        num_outputs: 1,
        main_face_image, // Pass Base64 string directly
        negative_prompt: "bad quality, worst quality, text, signature, watermark, extra limbs"
      },
      
    });

    console.log("API Response prediction:", prediction);

    console.log("Prediction input:", {
      prompt,
      main_face_image,
    });

    if (prediction.error) {
      return NextResponse.json({ detail: prediction.error }, { status: 500 });
    }

    return NextResponse.json(prediction, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { detail: "Failed to create prediction", error: error.message },
      { status: 500 }
    );
  }
}
