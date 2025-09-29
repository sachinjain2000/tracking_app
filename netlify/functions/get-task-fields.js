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

    // Try Meta API first, then fallback to records approach
    let taskFields = [];
    let errorMessage = '';
    
    try {
      // Method 1: Try Meta API to get table schema
      const metaResponse = await fetch(`https://api.airtable.com/v0/meta/bases/${AIRTABLE_BASE_ID}/tables`, {
        headers: {
          'Authorization': `Bearer ${AIRTABLE_TOKEN}`
        }
      });

      if (metaResponse.ok) {
        const metaData = await metaResponse.json();
        console.log('Meta API response:', JSON.stringify(metaData, null, 2));
        
        if (metaData.tables && metaData.tables.length > 0) {
          // Try different table name variations
          const tableNames = ['Tasks', 'tasks', 'Task', 'task'];
          let tasksTable = null;
          
          for (const tableName of tableNames) {
            tasksTable = metaData.tables.find(table => 
              table.name === tableName || table.name.toLowerCase() === tableName.toLowerCase()
            );
            if (tasksTable) break;
          }
          
          if (tasksTable && tasksTable.fields) {
            taskFields = tasksTable.fields
              .filter(field => field.name.toLowerCase() !== 'date')
              .map(field => field.name)
              .sort();
          } else {
            errorMessage = 'Tasks table not found in schema';
          }
        } else {
          errorMessage = 'No tables found in base';
        }
      } else {
        const metaError = await metaResponse.json();
        console.log('Meta API error:', JSON.stringify(metaError, null, 2));
        errorMessage = `Meta API failed: ${metaError.error?.message || 'Unknown error'}`;
      }
    } catch (metaError) {
      console.log('Meta API exception:', metaError);
      errorMessage = `Meta API exception: ${metaError.message}`;
    }

    // Method 2: Fallback to records approach if Meta API fails
    if (taskFields.length === 0) {
      try {
        console.log('Trying fallback method...');
        const recordsResponse = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Tasks?maxRecords=1`, {
          headers: {
            'Authorization': `Bearer ${AIRTABLE_TOKEN}`
          }
        });

        if (recordsResponse.ok) {
          const recordsData = await recordsResponse.json();
          console.log('Records API response:', JSON.stringify(recordsData, null, 2));
          
          if (recordsData.records && recordsData.records.length > 0) {
            const fields = recordsData.records[0].fields;
            taskFields = Object.keys(fields)
              .filter(fieldName => fieldName.toLowerCase() !== 'date')
              .sort();
          } else {
            // If no records, try to get field names from a different table or provide sample fields
            taskFields = ['cold_emails', 'applications', 'interviews', 'follow_ups'];
            errorMessage = 'No records found, showing sample fields. Add data to see actual fields.';
          }
        } else {
          const recordsError = await recordsResponse.json();
          console.log('Records API error:', JSON.stringify(recordsError, null, 2));
          errorMessage = `Records API failed: ${recordsError.error?.message || 'Unknown error'}`;
        }
      } catch (recordsError) {
        console.log('Records API exception:', recordsError);
        errorMessage = `Records API exception: ${recordsError.message}`;
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: taskFields.length > 0,
        fields: taskFields,
        error: errorMessage || (taskFields.length === 0 ? 'No task fields found' : null),
        debug: {
          fieldsFound: taskFields.length,
          errorMessage: errorMessage
        }
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
