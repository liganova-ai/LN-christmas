// Docs on request and context https://docs.netlify.com/functions/build/#code-your-function-2

const { MongoClient, ObjectId } = require('mongodb');


const MONGO_URI = process.env.MONGO_URI; // Use environment variable
const DB_NAME = 'xmasliganova24';
const COLLECTION_NAME = 'images';

let client;

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(MONGO_URI);
    const db = client.db(DB_NAME);
    console.log('Connected to MongoDB:', db.databaseName);
    await client.connect();
  }
  return client.db(DB_NAME);
}

exports.handler = async (event) => {
  const db = await connectToDatabase();
  const collection = db.collection(COLLECTION_NAME);

  if (event.httpMethod === 'POST') {
    // Handle saving a new image
    try {
      const { uploadedImage, generatedImage } = JSON.parse(event.body);
      const result = await collection.insertOne({ uploadedImage, generatedImage, createdAt: new Date() });

      return {
        statusCode: 201,
        headers: {
          'Access-Control-Allow-Origin': '*', 
          'Access-Control-Allow-Methods': 'POST, PATCH, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: JSON.stringify({ message: 'Image saved successfully', id: result.insertedId }),
      };
    } catch (error) {
      console.error('Error saving image:', error.message, error.stack);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to save image', details: error.message }),
      };
    }
  } else if (event.httpMethod === 'PATCH') {
    try {
      const { id, generatedImage } = JSON.parse(event.body);

      // Ensure `id` is a valid ObjectId
      if (!ObjectId.isValid(id)) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Invalid ID format' }) };
      }

      // Update document with the generated image
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { generatedImage } }
      );

      if (result.matchedCount === 0) {
        return { statusCode: 404, body: JSON.stringify({ error: 'Document not found' }) };
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Generated image updated successfully' }),
      };
    } catch (error) {
      console.error('Error updating generated image:', error);
      return { statusCode: 500, body: JSON.stringify({ error: 'Failed to update generated image' }) };
    }
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }
};

