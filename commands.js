const { SlashCommandBuilder } = require('@discordjs/builders');
const { help } = require('./help');
const { kick } = require('./kick');
const { ban } = require('./ban');
const { timeout } = require('./timeout');
const { profile } = require('./profile');

const commands = [
    new SlashCommandBuilder()
        .setName('help')
        .setDescription('Helps about all commands of GA BOT X'),

    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong! and checks the API latency'),

    new SlashCommandBuilder()
        .setName('profile')
        .setDescription('Shows the information about a user')
        .addUserOption(option => option.setName('user').setDescription('Enter username to see user info').setRequired(true)),

    new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays a song'),

    new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicks a user')
        .addUserOption(option => option.setName('user').setDescription('Enter the username to kick').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Enter reason').setRequired(false)),

    new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a user')
        .addUserOption(option => option.setName('user').setDescription('Enter the username to ban').setRequired(true))
        .addStringOption(option => option.setName('time').setDescription('Ban duration (e.g., 1s = 1 second, 1m = 1 minute, 1h = 1 hour, 1d = 1 day, 1y = 1 year)').setRequired(false))
        .addStringOption(option => option.setName('reason').setDescription('Enter reason').setRequired(false)),

    new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stops song'),

    new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pauses song'),

    new SlashCommandBuilder()
        .setName('resume')
        .setDescription('Resumes song'),
    
    new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Timeouts a user')
        .addUserOption(option => option.setName('user').setDescription('Enter the username to timeout').setRequired(true))
        .addStringOption(option => option.setName('time').setDescription('Timeout duration (e.g., 1s = 1 second, 1m = 1 minute, 1h = 1 hour, 1d = 1 day, 1mo = 1 month)').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Enter reason').setRequired(false)),
];

const handleCommand = async interaction => {

    if (interaction.commandName === 'play') {
        await interaction.reply({ content: 'It is in testing mode', ephemeral: true });
    } 
    
    else if (interaction.commandName === 'help') {
        await help(interaction);
    } 
    
    else if (interaction.commandName === 'profile') {
        await profile(interaction);
    } 
    
    else if (interaction.commandName === 'ping') {
        const sent = await interaction.reply({ content: 'Pong!', fetchReply: true, ephemeral: true });
        const latency = sent.createdTimestamp - interaction.createdTimestamp;
        await interaction.editReply({ content: `Pong!\nLatency is ${latency}ms.\nAPI Latency is ${Math.round(interaction.client.ws.ping)}ms`, ephemeral: true });
    } 
    
    else if (interaction.commandName === 'kick') {
        await kick(interaction)
    } 
    
    else if (interaction.commandName === 'ban') {
        await ban(interaction);
    }

    else if (interaction.commandName === 'timeout') {
        await timeout(interaction);
    }
}

module.exports = {
    commands,
    handleCommand
};
