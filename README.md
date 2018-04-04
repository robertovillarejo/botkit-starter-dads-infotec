# Botkit Starter DADS Infotec
A starting point for building custom multi-messaging platforms and multi-nlp services chatbot applications

## Getting Started
You will need:
- [NodeJS](https://nodejs.org/es/)

For Facebook support:
- A [Facebook page](https://www.facebook.com/pages/create/)
- A developer account
- A [Facebook App for Web](https://developers.facebook.com/quickstarts/?platform=web)
- The [page access token](https://developers.facebook.com/docs/messenger-platform/guides/setup#page_access_token) (This will be needed in .env file)
- Your own verify token (this is a string that you control that Facebook will use to verify your web hook endpoint) (This will be needed in .env file)

For DialogFlow support:
- A Google account to log into DialogFlow
- An DialogFlow agent (this may be empty or not. We provide a script to create the initial conversation for the agent. See [Creating Conversation](#creating-conversation))
- The client access token
- The developer access token

For fulfillment support:
- The endpoint of the external system (host and port)
- The credentials

## Usage
Fist, make sure you're done with all environment variables in your `.env` file.

- **DIALOGFLOW_CLIENT_TOKEN**: The DialogFlow client token
- **DIALOGFLOW_DEVELOPER_TOKEN**: The DialogFlow developer token (required if you want to use the `conversation-create` script)
- **ACCESS_TOKEN**: The Facebook page access token (this token is provided by Facebook)
- **VERIFY_TOKEN**: The Facebook verify token (this token is defined by the user)
- **PORT**: The port that this application will use
- **FULFILLMENT_ENDPOINT**: The URL that this application will use as webhook

Once all variables defined, run `npm install` and dependencies will be downloaded.

Finally, to run the project simply execute `npm start` or `node index.js`.

### Creating Conversation

If you want to create a basic conversation for your DialogFlow agent, run `npm run conversation-create` (currently supports only Spanish).
After that, your chatbot will be able to recognize the following intents:
- Tell a joke (cuéntame un chiste)
- How are you? (¿cómo estás?)
- Who are your creators? (¿quiénes son tus creadores?)
- Welcome (¡Hola!)
- Farewell (Nos vemos)
- Thanks (Gracias)
- Talk to a human (Hablar con un humano)
- General information (Información general)
- What is your name? (¿Cómo te llamas?)
- What is your web page? (¿Cuál es su página web?)
- Feedback (Eres de gran ayuda/No sirves para nada)
- Location of the company (¿En dónde se ubican?)

### Chatting with the chatbot
Once your project is running, make sure your ip is public. Then, in your Facebook App, add a webhook with that ip and the verify token you defined in the `.env` file.

Go to your Facebook page and send a message to start the conversation.
