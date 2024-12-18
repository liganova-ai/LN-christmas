const { MongoClient, ObjectId } = require('mongodb');

const MONGO_URI = process.env.MONGO_URI; // Use environment variable
const DB_NAME = 'xmasliganova24';
const COLLECTION_NAME = 'images';

let cachedClient = null;

async function connectToDatabase() {
  try {
    if (!cachedClient) {
      // Create a new MongoDB client if none exists
      cachedClient = new MongoClient(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await cachedClient.connect();
      console.log('MongoDB connection established');
    }
    return cachedClient.db(DB_NAME);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Failed to connect to MongoDB');
  }
}

exports.handler = async (event) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection(COLLECTION_NAME);

    if (event.httpMethod === 'POST') {
      try {
        const { uploadedImage, generatedImage } = JSON.parse(event.body);
        const result = await collection.insertOne({
          uploadedImage,
          generatedImage,
          createdAt: new Date(),
        });

        return {
          statusCode: 201,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
          body: JSON.stringify({
            message: 'Image saved successfully',
            id: result.insertedId,
          }),
        };
      } catch (error) {
        console.error('Error saving image:', error.message, error.stack);
        return {
          statusCode: 500,
          body: JSON.stringify({
            error: 'Failed to save image',
            details: error.message,
          }),
        };
      }
    } else if (event.httpMethod === 'PATCH') {
      try {
        const { id, generatedImage } = JSON.parse(event.body);

        // Ensure `id` is a valid ObjectId
        if (!ObjectId.isValid(id)) {
          return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Invalid ID format' }),
          };
        }

        // Update document with the generated image
        const result = await collection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { generatedImage } }
        );

        if (result.matchedCount === 0) {
          return {
            statusCode: 404,
            body: JSON.stringify({ error: 'Document not found' }),
          };
        }

        return {
          statusCode: 200,
          body: JSON.stringify({
            message: 'Generated image updated successfully',
          }),
        };
      } catch (error) {
        console.error('Error updating generated image:', error);
        return {
          statusCode: 500,
          body: JSON.stringify({
            error: 'Failed to update generated image',
            details: error.message,
          }),
        };
      }
    } else {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method Not Allowed' }),
      };
    }
  } catch (error) {
    console.error('Global error in handler:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Internal Server Error',
        details: error.message,
      }),
    };
  }
};
