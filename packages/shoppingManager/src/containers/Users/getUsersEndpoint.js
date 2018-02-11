const baseEndpoint = 'users';
const strategy = {
  get: ({ id }) => [baseEndpoint].concat(id || []).join('/'),
  put: ({ id }) => [baseEndpoint].concat(id).join('/'),
  post: ({ method }) => baseEndpoint,
  delete: ({ ids }) => ids.map(id => `${baseEndpoint}/${id}`),
};

export default function getUsersEndpoint({ id, ids, method }) {
  return strategy[method]({ id, ids });
}
