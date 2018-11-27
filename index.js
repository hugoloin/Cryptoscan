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
    token: 'FZ7XEtD9IUBvJd1yet6U3qds',
    name: 'Cryptoscan',
});

/**
 * Param of the bot
 */
const params = {
   icon_emoji: ':hey:',
    channel: 'ebm',
};

/**
 * Fetch the cryptos from CoinMarketCap
 *
 * @param {*} limit
 */
async function fetchCrypto(limit) {
    try {
        const res = await axios.get(`https://api.coinmarketcap.com/v2/ticker/?limit=${limit}`);
        return res.data;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 *
 * @param {*} data
 */
const handleMessage = async (message) => {
    // Stop the program if the message come from our bot
    if (message.username === 'Cryptoscan') {
        return 'Nothing to handle';
    }

    if (message.text.indexOf('crypto') !== -1) {
        await bot.postMessageToChannel(params.channel, 'Okay, I\'m fetching the top cryptos', params);
        const {
            data,
        } = await fetchCrypto(10);

        Object.values(data).forEach(async (item) => {
            const string = `${item.name}, position ${item.rank} ---  price: $${item.quotes.USD.price}`;
            console.log(string);
            await bot.postMessageToChannel(params.channel, string, params);
        });
    }
};

/**
 *
 */
bot.on('start', async () => {
    //
});

/**
 * Listen for any new message
 */
bot.on('message', (data) => {
    switch (data.type) {
        case 'message':
            handleMessage(data);
            break;
        case 'team_join':
            bot.postMessageToChannel(params.channel, 'Hey there! Do you want to know more about Cryptos?', params);
            break;
        default:
            break;
    }
});

/*var api = require('etherscan-api').init('DPXRTHG4A1B7RHFJ6ZNJD1BUZHJI4VI7J4');
var balance = api.account.balance('0x4d1317A2A98cfEA41e3EB9E228E80797eD302403');
balance.then(function(balanceData){
    console.log(balanceData);

});*/


//var api = require('etherscan-api').init('DPXRTHG4A1B7RHFJ6ZNJD1BUZHJI4VI7J4','rinkeby', '3000');
//var balance = api.account.balance('0x4d1317A2A98cfEA41e3EB9E228E80797eD302403');

