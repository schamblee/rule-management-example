require("dotenv").config();

const Auth0Manager = require("./Auth0Manager");
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Get rules data for all auth0 clients
 * 
 * Returns an array of objects containing the following properties:
 * 
 * - Client: The name of the application
 * - Rule: The name of the rule
 * - Value: The value of the rule (e.g. "true" or "false")
 * 
 * example response:
 * 
 *   [{
 *       Client: "example-app-1",
 *       Rule: "rule:weekendAccess",
 *       Value: "true"
 *   }]
 * 
 */
app.get('/client/rules', (req, res) => {
    Auth0Manager.init()
  .then(() => Auth0Manager.getClients())
  .then(clients => {
    const rules = Auth0Manager.formatRules(clients);
    res.send(rules);
  })
  .catch(console.error);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
