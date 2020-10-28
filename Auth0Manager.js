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
    formatRules
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
   * Format client rules data
   * 
   * Transforms list of clients into a list of rules using each client's
   * metadata. Expects rules metadata to be prefixed with "rule:".
   *
   * @param {Array} clients list of clients
   */
  function formatRules(clients) {
    const clientsWithRules = clients.filter(client => client.client_metadata);
    const rules = clientsWithRules.map(client => {
      const metadataKeys = Object.keys(client.client_metadata);
      const ruleNames = metadataKeys.filter(ruleName => ruleName.includes('rule:'));
      const rule = ruleNames.map(rule => {
        return {
          Client: client.name,
          Rule: rule,
          Value: client.client_metadata[rule]
        }
      });
      return rule;
    })
    return rules.flat();
  }
})();
