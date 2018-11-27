/**
 * Ref: https: //sabe.io/tutorials/learn-how-to-build-slack-bot-node-js
 */

const SlackBot = require('slackbots');
const Botkit = require('botkit');
const axios = require('axios');
const config = require('./package.json');
const env = require('dotenv').config();


/**
 * Create a new Instance of Slack Bot
 */
const bot = new SlackBot({
    token: process.env.secret_key_slack,
    name: 'cryptoscan',
});



/* Example in Node.js ES6 using request-promise, concepts should translate to your language of choice */


const rp = require('request-promise');
const requestOptions = {
    method: 'GET',
    uri: 'https://api.coinmarketcap.com/v2/ticker/?convert=EUR&limit=10',
    headers: {
        'X-CMC_PRO_API_KEY': process.env.secret_key_coinmarketcap
    },
    json: true,
    gzip: true
};

function fetchCrypto() {

    return rp(requestOptions).then(response => {
        console.log('hey', response);
        return response;
    }).catch((err) => {
        console.log('API call error:', err.message);
    });
}
bot.on("start", function() {
    bot.postMessageToChannel('ebm', 'Hello world!');
});

bot.on('message', function(message) {
    // more information about additional params https://api.slack.com/methods/chat.postMessage
    if (message.type !== 'message') {
        return;
    }
    handleMessage(message.text);
});
function handleMessage(message) {
    switch (message) {
        case "crypto":
            sendGreeting();
        break;
        default:
            return;
    }
}

function sendGreeting() {
    return fetchCrypto().then(res => {
        bot.postMessageToChannel('ebm', res.data[1].name + ' value is ' + res.data[1].quotes.EUR.price +'€', params);
    });

}