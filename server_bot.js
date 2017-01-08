// JavaScript source code
let restify = require('restify'),
    builder = require('botbuilder');

let server = restify.createServer();

//setting up restify server
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log(`${server.name} listening to ${server.url}`);
});

//Creating new chat bot
let connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

let bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//bot dialog; "Hello world!"

bot.dialog('/', [
    session => {
        builder.Prompts.text(session, "What is your name?");
    },
    (session, results) => {
        session.send(`Hi ${results.response}`);
    },
]);
