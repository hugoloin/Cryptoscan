/**
 * Ref: https: //sabe.io/tutorials/learn-how-to-build-slack-bot-node-js
 */

const SlackBot = require('slackbots');
const axios = require('axios');
const config = require('./package.json');

/**
 * Create a new Instance of Slack Bot
 */
const bot = new SlackBot({
    token: 'my key',
    name: 'cryptoscan',
});

bot.on('start', function() {
    // more information about additional params https://api.slack.com/methods/chat.postMessage
    var params = {
        icon_emoji: ':love:'
    };

    // define channel, where bot exist. You can adjust it there https://my.slack.com/services
    bot.postMessageToChannel('ebm', 'meow!', params);


});

/* Example in Node.js ES6 using request-promise, concepts should translate to your language of choice */

const rp = require('request-promise');
const requestOptions = {
    method: 'GET',
    uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    qs: {
        start: 1,
        limit: 10,
        convert: 'EUR'
    },
    headers: {
        'X-CMC_PRO_API_KEY': 'my key'
    },
    json: true,
    gzip: true
};

rp(requestOptions).then(response => {
    console.log('API call response:', response);
}).catch((err) => {
    console.log('API call error:', err.message);
});