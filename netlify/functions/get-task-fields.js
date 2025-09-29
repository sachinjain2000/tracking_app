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

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { AIRTABLE_BASE_ID, AIRTABLE_TOKEN } = process.env;
    
    if (!AIRTABLE_BASE_ID || !AIRTABLE_TOKEN) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Server configuration missing'
        })
      };
    }

    // Fetch one record from Tasks table to get field names
    const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Tasks?maxRecords=1`, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_TOKEN}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: error.error?.message || 'Failed to fetch from Airtable'
        })
      };
    }

    const data = await response.json();
    
    // Extract field names from the first record (excluding Date field)
    let taskFields = [];
    
    if (data.records && data.records.length > 0) {
      const fields = data.records[0].fields;
      taskFields = Object.keys(fields)
        .filter(fieldName => fieldName.toLowerCase() !== 'date')
        .sort(); // Sort alphabetically for better UX
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        fields: taskFields
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};
