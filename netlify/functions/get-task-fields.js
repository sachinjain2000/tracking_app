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

    // Fetch table schema using Meta API to get field definitions
    const response = await fetch(`https://api.airtable.com/v0/meta/bases/${AIRTABLE_BASE_ID}/tables`, {
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
          error: error.error?.message || 'Failed to fetch table schema from Airtable'
        })
      };
    }

    const data = await response.json();
    
    // Find the Tasks table and extract field names (excluding Date field)
    let taskFields = [];
    
    if (data.tables && data.tables.length > 0) {
      const tasksTable = data.tables.find(table => table.name === 'Tasks');
      
      if (tasksTable && tasksTable.fields) {
        taskFields = tasksTable.fields
          .filter(field => field.name.toLowerCase() !== 'date')
          .map(field => field.name)
          .sort(); // Sort alphabetically for better UX
      }
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
