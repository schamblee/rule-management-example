# Auth0 Rules Management Sample App

This is an example of how you can use Auth0's V2 Managment API to keep
track of the Auth0 rules that are set up among your applications.

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

You can also view and update your applications’ metadata on the [https://auth0.com/docs/get-started/dashboard/application-settings#application-metadata](dashboard).


## Installing Auth0 Rules Management Sample App

To install the sample app, follow these steps:

* Clone the repo and install nodemon globally and the project dependencies

`git clone git@github.com:schamblee/rule-management-example.git`
`cd rule-management-example`
`npm i nodemon -g`
`yarn`

## Using Auth0 Rules Management Sample App

To start the sample app, run the command `yarn dev` to start the backend api and React client

## Screenshot

![](/demo.gif)
