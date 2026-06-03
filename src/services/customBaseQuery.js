export const customBaseQuery = async (args, api, extraOptions) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    ...args.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const modifiedArgs = {
    ...args,
    headers,
  };

  return fetch(modifiedArgs.url, {
    method: modifiedArgs.method || 'GET',
    headers: modifiedArgs.headers,
    body: modifiedArgs.body,
  })
    .then(res => res.json())
    .then(data => ({ data }))
    .catch(error => ({ error }));
};
