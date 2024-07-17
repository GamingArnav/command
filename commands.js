const handleCommand = async interaction => {
    const member = interaction.member;
    const ownerID = interaction.guild.ownerId;

    try {
        if (interaction.commandName === 'play') {
            await interaction.reply({ content: 'It is in testing mode', ephemeral: true });
        } else if (interaction.commandName === 'help') {
            await help(interaction);
        } else if (interaction.commandName === 'profile') {
            await profile(interaction);
        } else if (interaction.commandName === 'ping') {
            const sent = await interaction.reply({ content: 'Pong!', fetchReply: true, ephemeral: true });
            const latency = sent.createdTimestamp - interaction.createdTimestamp;
            await interaction.editReply({ content: `Pong!\nLatency is ${latency}ms.\nAPI Latency is ${Math.round(interaction.client.ws.ping)}ms`, ephemeral: true });
        } else if (interaction.commandName === 'kick') {
            if (member.permissions.has(PermissionsBitField.Flags.KickMembers) || member.permissions.has(PermissionsBitField.Flags.Administrator) || member.id === ownerID) {
                await kick(interaction);
            } else {
                await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
            }
        } else if (interaction.commandName === 'ban') {
            if (member.permissions.has(PermissionsBitField.Flags.BanMembers) || member.permissions.has(PermissionsBitField.Flags.Administrator) || member.id === ownerID) {
                await ban(interaction);
            } else {
                await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
            }
        } else if (interaction.commandName === 'timeout') {
            if (member.permissions.has(PermissionsBitField.Flags.ModerateMembers) || member.permissions.has(PermissionsBitField.Flags.Administrator) || member.id === ownerID) {
                await timeout(interaction);
            } else {
                await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
            }
        }
    } catch (error) {
        console.error(`Error handling command ${interaction.commandName}:`, error);
        await interaction.reply({ content: 'An error occurred while executing the command.', ephemeral: true });
    }
};
