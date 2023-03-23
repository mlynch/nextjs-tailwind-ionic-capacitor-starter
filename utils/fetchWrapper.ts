async function request(url: string, options: { [key: string]: any } = {}) {
  const { headers, query = null, method = 'GET', body, ...extraOpts } = options;

  // Compose the request configuration object
  const reqOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...extraOpts,
  };

  if (body) {
    reqOptions.body = typeof body === 'object' ? JSON.stringify(body) : body;
  }

  let queryString = '';
  if (query) {
    queryString = new URLSearchParams(query).toString();
    queryString = queryString && `?${queryString}`;
  }

  const res = await fetch(`${url}${queryString}`, reqOptions);
  return res;
}

export async function get(url, query?: { [key: string]: any }) {
  const requestOptions = {
    method: 'GET',
    query,
  };
  return request(url, requestOptions);
}

export const post = async (url, body) => {
  const postRequestOptions = {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body,
  };
  return request(url, postRequestOptions);
};

const put = async (url, body) => {
  const putRequestOptions = {
    method: 'PUT',
    body,
  };
  return request(url, putRequestOptions);
};

// prefixed with underscored because delete is a reserved word in javascript
const _delete = async url => {
  const requestOptions = {
    method: 'DELETE',
  };
  return request(url, requestOptions);
};

// helper functions
function handleResponse(response) {
  if (!response.ok && response.status === 401)
    // return signOut()

    return response;
}

export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete,
};
