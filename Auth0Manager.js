/**
 * Management Client documentation: https://auth0.github.io/node-auth0/module-management.ManagementClient.html
 */

const axios = require("axios");
const ManagementClient = require("auth0").ManagementClient;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const DOMAIN = process.env.CLIENT_DOMAIN;

module.exports = (function() {
  let managementClient;

  return {
    init,
    getClients,
    updateClient
  };

  /**
   * Initiate management client
   * 
   * Retrieves an access token to create a new management client
   * which can be used to interact with the Auth0 Management API
   * 
   */
  function init() {
    return getAccessToken()
      .then(data => data.access_token)
      .then(token => {
        const audience = `https://${process.env.CLIENT_DOMAIN}/api/v2/`;
        this.managementClient= new ManagementClient({
          domain: DOMAIN,
          audience,
          token
        });
      })
      .catch(err => err);
  }

  /**
   * Get access token for the Auth0 Management API
   * 
   * Uses the client ID, client secret, and domain environment variables
   * to request an access token. The values for these variables are
   * found on the dashboard and must be stored in a .env file
   * 
   */
  function getAccessToken() {
    const url = `https://${process.env.CLIENT_DOMAIN}/oauth/token`;
    const audience = `https://${process.env.CLIENT_DOMAIN}/api/v2/`;
    return axios.post(url, {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "client_credentials",
        audience
      })
      .then(res => res.data)
      .catch(err => err);
  }

  /**
   * Get client data
   * 
   * Returns paginated client data for multiple clients
   * 
   * @param {number} pageNumber the page number of results (default: 0)
   */
  function getClients(pageNumber = 0) {
    const pagination = {
      per_page: 10,
      page: 0
    }
    return this.managementClient
      .getClient(pagination)
      .then(client => client)
      .catch(err => err);
  }

  /**
   * Update a client
   * 
   * Uses given data to update a client
   *
   * @param {object} data     Data used to update the client
   * @param {string} clientId The client ID of the client to be updated (defaults to env CLIENT_ID)
   */
  function updateClient(data, clientId = null) {
    if (!clientId) clientId = CLIENT_ID;

    return this.managementClient
      .updateClient({ client_id: clientId }, data)
      .then(client => client)
      .catch(err => err);
  }
})();
