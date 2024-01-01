const fetcher = (endpoint = '', props = {}) => {
    const headers = {
      ...props.headers,
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    };
    return fetch(endpoint, {
      ...props,
      headers,
      mode: 'cors'
    })
      .then((response) => response.json())
      .catch((error) => ({ success: false, error }));
  };
  
  export default fetcher;