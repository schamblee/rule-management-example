require("dotenv").config();

const Auth0Manager = require("./Auth0Manager");
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/client/rules', (req, res) => {
    Auth0Manager.init()
  .then(() => Auth0Manager.getClients())
  .then(clients => {
    const rules = formatRules(clients);
    console.log(rules)
    res.send(rules)
  })
  .catch(console.error);
});

app.put('/client:client_id/rules', (req, res) => {
    const updatedData = {
        client_metadata: {
            weekdayAccess: req.body.weekdayAccess
        }
    };
    Auth0Manager.init()
      .then(() => {
        return Auth0Manager.updateClient(updatedData);
      })
      .then(updatedClient => {
        console.log(updatedClient);
        return updatedClient;
      })
      .catch(err => ({ message: "There was an error!", ...err }));    
});

const formatRules = (clients) => {
    const clientsWithRules = clients.filter(client => client.client_metadata);
    console.log(clientsWithRules)
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

app.listen(port, () => console.log(`Listening on port ${port}`));
