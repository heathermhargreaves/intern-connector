# Introduction

Welcome to Intern Connector, our goal is connect new Twilio interns with established Twilions to foster inclusion. By reaching out to interns and creating a community around them, they will feel more empowered and more likely to be engaged at work and accept a full time offer.

# Tools needed
* Twilio account
* Airtable account

#Getting Started

## Airtable
* Log into Airtable and create a new `Base`.
* Include record fields called `Name`, `City`, `Fun Fact`, `Bio`, `Team`, and `Slack`.
* Rename the `table` to "interns".
* Retrieve your Airtable `API key` and `Base key`. We will use these in our Twilio Function to get access the contents of our Airtable base.
* Finally add your data about your interns or people to get to know

## Twilio Function
* Navigate to the Functions tab, and set up a new service called `get-intern`
* Copy the code from `service.js` in this repo to your service.
* Navigate to *Dependencies* and add `airtable`.
* Navigate to *Enviornment Variables* and add a key called `AIRTABLE_KEY` and `INTERNS_TABLE_ID`. Respectively add your Airtable `API key` and your `Base key` as the values.
* Save and deploy your Function.
* Retrieve your Function URL, we will need this for our Studio Flow in the next guide.

## Twilio Studio Flow
* Create a new Flow and give it the name 'Intern Connector'.
* Select "Import from JSON", and copy the JSON from `studio.js` when prompted for your JSON.
* Under the widget titled *http_1* paste your Function URL as the `REQUEST URL`.
* Save the widget and publish your flow.

## Twilio Number
* Purchase a number from the Numbers dashboard and make sure it has SMS enabled.
* For incoming messages configure it to send it to a Studio Flow, and select your newly made Studio Flow.
* Save, and text 'meet somemone' to your number to see it in action.

