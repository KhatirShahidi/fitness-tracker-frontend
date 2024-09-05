import axios from 'axios';

const API_URL = 'https://fitness-tracker-backend-vp22.onrender.com/';

// Utility function to create headers with token
function createHeaders(token) {
  if (!token) throw new Error('No token provided');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

// PUBLIC API

export async function postApi(endpoint, data) {
  try {
    const url = `${API_URL}${endpoint}`;
    console.log('POST API call with data:', data);
    const response = await axios.post(url, data);
    console.log('POST API Response:', response.data);
    return response;
  } catch (error) {
    console.error('POST API Error:', error);
    throw error;
  } finally {
    console.log('POST API call attempted');
  }
}

export async function getApi(endpoint) {
  try {
    const url = `${API_URL}${endpoint}`;
    console.log('GET API call to URL:', url);
    const response = await axios.get(url);
    console.log('GET API Response:', response.data);
    return response;
  } catch (error) {
    console.error('GET API Error:', error);
    throw error;
  } finally {
    console.log('GET API call attempted');
  }
}

export async function putApi(endpoint, data) {
  try {
    const url = `${API_URL}${endpoint}`;
    console.log('PUT API call with data:', data);
    const response = await axios.put(url, data);
    console.log('PUT API Response:', response.data);
    return response;
  } catch (error) {
    console.error('PUT API Error:', error);
    throw error;
  } finally {
    console.log('PUT API call attempted');
  }
}

export async function deleteApi(endpoint) {
  try {
    const url = `${API_URL}${endpoint}`;
    console.log('DELETE API call to URL:', url);
    const response = await axios.delete(url);
    console.log('DELETE API Response:', response.data);
    return response;
  } catch (error) {
    console.error('DELETE API Error:', error);
    throw error;
  } finally {
    console.log('DELETE API call attempted');
  }
}

// PROTECTED API

export async function getApiWithToken(endpoint, token) {
  try {
    const url = `${API_URL}${endpoint}`;
    console.log('GET API call with token to URL:', url);
    const response = await axios.get(url, { headers: createHeaders(token) });
    console.log('GET API with Token Response:', response.data);
    return response;
  } catch (error) {
    console.error('GET API with Token Error:', error);
    throw error;
  } finally {
    console.log('GET API with Token call attempted');
  }
}

export async function putApiWithToken(endpoint, data, token) {
  try {
    const url = `${API_URL}${endpoint}`;
    console.log('PUT API call with token and data:', data);
    const response = await axios.put(url, data, {
      headers: createHeaders(token),
    });
    console.log('PUT API with Token Response:', response.data);
    return response;
  } catch (error) {
    console.error('PUT API with Token Error:', error);
    throw error;
  } finally {
    console.log('PUT API with Token call attempted');
  }
}

export async function postApiWithToken(endpoint, data, token) {
  try {
    const url = `${API_URL}${endpoint}`;
    console.log('POST API call with token and data:', data);
    const response = await axios.post(url, data, {
      headers: createHeaders(token),
    });
    console.log('POST API with Token Response:', response.data);
    return response;
  } catch (error) {
    console.error('POST API with Token Error:', error);
    throw error;
  } finally {
    console.log('POST API with Token call attempted');
  }
}

export async function deleteApiWithToken(endpoint, token) {
  try {
    const url = `${API_URL}${endpoint}`;
    console.log('DELETE API call with token to URL:', url);
    const response = await axios.delete(url, { headers: createHeaders(token) });
    console.log('DELETE API with Token Response:', response.data);
    return response;
  } catch (error) {
    console.error('DELETE API with Token Error:', error);
    throw error;
  } finally {
    console.log('DELETE API with Token call attempted');
  }
}
