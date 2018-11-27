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
    uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    qs: {
        start: 1,
        limit: 1,
        convert: 'EUR'
    },
    headers: {
        'X-CMC_PRO_API_KEY': process.env.secret_key_coinmarketcap
    },
    json: true,
    gzip: true
};

function fetchCrypto() {

    return rp(requestOptions).then(response => {
        return response;
    }).catch((err) => {
        console.log('API call error:', err.message);
    });
}



bot.on('start', function() {
    // more information about additional params https://api.slack.com/methods/chat.postMessage
    var params = {
        icon_emoji: ':love:'
    };
    // define channel, where bot exist. You can adjust it there https://my.slack.com/services
    fetchCrypto().then(res => {
        bot.postMessageToChannel('ebm', res.data[0].name, params);
    });



});