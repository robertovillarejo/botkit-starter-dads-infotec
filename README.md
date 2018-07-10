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

## Development
Fist, make sure you're done with all environment variables in your `.env` file.

- **DIALOGFLOW_CLIENT_TOKEN**: The DialogFlow client token
- **DIALOGFLOW_DEVELOPER_TOKEN**: The DialogFlow developer token (required if you want to use the `conversation-create` script)
- **ACCESS_TOKEN**: The Facebook page access token (this token is provided by Facebook)
- **VERIFY_TOKEN**: The Facebook verify token (this token is defined by the user)
- **PORT**: The port that this application will use

Once all variables defined, run `yarn install` and dependencies will be downloaded.

Run `yarn build` to clean `lib` folder, copy resources and tanspile to Javascript.  

Run `yarn start:dev` to start the project in development mode.

### Project Structure
```
├── package.json
├── Procfile    (Processes file used by Heroku in production/used by foreman in development)
├── README.md
├── src
│   ├── bootstrap.ts    (Resources initialization through IoC container)
│   ├── bots
│   │   ├── common
│   │   │   └── middlewares.ts
│   │   ├── console
│   │   │   └── consoleBot.js
│   │   ├── conversation
│   │   │   ├── create-conversation.js
│   │   │   └── starter-conversation.json
│   │   ├── facebook
│   │   │   ├── FacebookBotConfigurer.ts
│   │   │   ├── menuConfigurer.ts
│   │   │   └── skills.ts
│   │   └── web //Web bot
│   │       ├── skills.ts
│   │       └── WebBotConfigurer.ts (Configure skills and middlewares)
│   ├── configureApp.ts (Configure Express Application Web server)
│   ├── constant
│   │   └── types.ts
│   ├── controller
│   │   └── fulfillment.ts  (REST endpoint to do fulfillment called by Dialogflow)
│   ├── installer.ts    (IoC container creation and binding to components)
│   ├── public
│   │   ├── chat.html
│   │   ├── css
│   │   │   ├── biggerstyles.css
│   │   │   ├── embed.css
│   │   │   ├── embed.css.map
│   │   │   ├── styles.css
│   │   │   └── styles.css.map
│   │   ├── images
│   │   │   └── botkit_icon.png
│   │   ├── javascripts
│   │   │   ├── beep.mp3
│   │   │   ├── client.js
│   │   │   ├── embed.js
│   │   │   └── sent.mp3
│   │   └── sass
│   │       ├── _botkit.scss
│   │       ├── _chat.scss
│   │       ├── embed.scss
│   │       ├── _home.scss
│   │       └── styles.scss
│   ├── service (Example service for fulfillment)
│   │   ├── chuckNorrisJokeService.ts
│   │   └── jokeService.ts
│   ├── utils
│   │   └── utils.ts
│   └── views
│       ├── embed.hbs
│       ├── index.hbs
│       ├── layouts
│       │   └── default.hbs
│       └── partials
│           ├── footer.hbs
│           ├── header.hbs
│           └── head.hbs
├── tsconfig.json
```

## Creating Conversation

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

## Chatting with the chatbot in Web
Once your project is running, go to `http://localhost:3000` (or the port you chose) and start chatting!

## Chatting with the chatbot in Facebook
Once your project is running, make sure your ip is public. Then, in your Facebook App, add a webhook with that ip and the verify token you defined in the `.env` file.

Go to your Facebook page and send a message to start the conversation.

## Deploy to Heroku
Requirements: 
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

1. Login to heroku `heroku login`
2. Create a Heroku app `heroku create APP_NAME`
3. Push branch `master` to heroku remote: `git push heroku master`
4. Set environment variables: `heroku config:set NAME=VALUE`. To see your stored variables simply run `heroku config`