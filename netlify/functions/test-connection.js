exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    const { AIRTABLE_BASE_ID, AIRTABLE_TOKEN } = process.env;
    
    if (!AIRTABLE_BASE_ID || !AIRTABLE_TOKEN) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Environment variables not configured'
        })
      };
    }

    // Test Airtable connection
    const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Tasks?maxRecords=1`, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_TOKEN}`
      }
    });

    if (response.ok) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true })
      };
    } else {
      const error = await response.json();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: false,
          error: error.error?.message || 'Airtable connection failed'
        })
      };
    }
  } catch (error) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};