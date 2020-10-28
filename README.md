# Auth0 Rules Management Sample App

If you have several applications registered with Auth0 and many rules configured, it may be challenging to keep track of the rules you have set up in your applications.

This is an example of how you can use Auth0's V2 Managment API to keep
track of the Auth0 rules that are set up among your applications.

## Methodology

The management API offers a way to store and retrieve metadata to each of your applications (or clients) via its [Clients endpoints](https://auth0.com/docs/api/management/v2#!/Clients/get_clients).

In order to keep track of an application's rules, add items to its client metadata that includes a rule and the rule's value (example: `rule:weekendAccess: "true"`).

Once your applications have their rules data stored in metadata, you can use the [https://auth0.com/docs/api/management/v2#!/Clients/get_clients](get clients endpoint) to retrieve rules data for all of your applications.

Another benefit of storing rules data within client metadata is that it can simplify your rules scripts.

Rules logic can become complex if you have to hard-code several app names to determin which app the rule should be applied to.

In order to avoid naming specific apps in your rules code, reference the client's metadata via the rule's context object:

```
function(user, context, callback) {
  context.clientMetadata = context.clientMetadata || {};
  if (context.clientMetadata.weekdayAccess === ‘true’) {
    …
  }
}
```

## Prerequisites

Before you begin, set up the rules metadata for your Auth0-registered applications.

In order to distinguish rules metadata from other
metadata, prefix the rule name with "rule:"

Example [/api/v2/clients](https://auth0.com/docs/api/management/v2#!/Clients/post_clients) POST body

```
…
"client_metadata": {
    “rule:weekdayAccess”: “true”,
    “rule:weekendAccess”: “false”
},
…
```

_Note: client metadata values are strings with a 255 character limit._

You can also view and update your applications’ metadata on the [dashboard](https://auth0.com/docs/get-started/dashboard/application-settings#application-metadata).

<sup>1</sup>Create a new app that will be used to interact with the Auth0 Management Client.

1. Sign in to your [Auth0 Dashboard](https://manage.auth0.com)
2. Name the App
3. Select Machine to Machine Applications
4. Click on Create
5. Select an API, select Auth0 Management API
6. Choose scopes. select `read:clients`
7. Click on Authorize.
8. Go to the Settings tab to view Client ID, view the Client Secret, add in Allowed Callback URLs, etc.

The Client ID, Client Secret, and Domain will be used as environment variables in the sample app.

## Installing Auth0 Rules Management Sample App

To install the sample app, follow these steps:

* Clone the repo and install nodemon globally as well as the project dependencies

```
git clone git@github.com:schamblee/rule-management-example.git
cd rule-management-example
npm i nodemon -g
yarn
```

* Collect the Client ID, Client Secret, and Domain from the app you created in the "Prerequisites" step and create a `.env` file in the rule-management-example directory:

```
CLIENT_DOMAIN="Your app's domain here"
CLIENT_ID="Your client ID here"
CLIENT_SECRET="Your client secret here"
```

## Using Auth0 Rules Management Sample App

To start the sample app, run the command `yarn dev` from the project's root directory which will start the backend api and React client.

## Screenshot

![](/demo.gif)

## References

1. Update Auth0 Applications using the Management API](https://auth0.com/blog/update-auth0-applications-using-the-management-api/)
