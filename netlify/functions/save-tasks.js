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

  if (event.httpMethod !== 'POST') {
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

    const { date, tasks } = JSON.parse(event.body);

    if (!date || !tasks) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Missing required data'
        })
      };
    }

    // Prepare Airtable record
    const recordData = { Date: date };
    Object.keys(tasks).forEach(taskName => {
      recordData[taskName] = tasks[taskName];
    });

    // Save to Airtable
    const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Tasks`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fields: recordData
      })
    });

    if (response.ok) {
      const result = await response.json();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          id: result.id
        })
      };
    } else {
      const error = await response.json();
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: error.error?.message || 'Failed to save to Airtable'
        })
      };
    }

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