/**
 * Invokes the request function passing the requestData provided. The response
 * is a silent promise that will return the the expected data to sagas.
 * @param {function} request
 * @param {object} requestData
 */
function invokeRequest(request, requestData) {
  return request(requestData)
    .then(response => response)
    .catch(error => error.response || {});
}

export default invokeRequest;
