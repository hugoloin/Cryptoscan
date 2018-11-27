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
    token: 'xoxb-487717201747-488056503376-z82o2Q3MCf7WuNGViowsFpEd',
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