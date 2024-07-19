const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, VoiceConnectionStatus } = require('@discordjs/voice');
const { findYouTubeUrl } = require('../utils/youtube');
const { searchTrack } = require('../utils/spotify');
const ytdl = require('ytdl-core');

module.exports = {
  async play(interaction) {
    const song = interaction.options.getString('song');
    const singer = interaction.options.getString('singer');
    const voiceChannel = interaction.member.voice.channel;

    if (!voiceChannel) {
      await interaction.reply('You need to join a voice channel first!');
      return;
    }

    await interaction.deferReply({ ephemeral: true });

    try {
      const searchQuery = singer ? `${song} ${singer}` : song;
      const track = await searchTrack(searchQuery);

      if (!track) {
        await interaction.editReply('No song found.');
        return;
      }

      const songTitle = `${track.name} by ${track.artists.map(artist => artist.name).join(', ')}`;

      const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
      });

      const player = createAudioPlayer();
      connection.subscribe(player);

      const ytUrl = await findYouTubeUrl(songTitle);

      if (!ytUrl) {
        await interaction.editReply('Could not find a playable version of the song.');
        connection.destroy();
        return;
      }

      const resource = createAudioResource(ytdl(ytUrl, { filter: 'audioonly' }));

      player.play(resource);

      player.on(AudioPlayerStatus.Idle, () => {
        connection.destroy();
      });

      player.on('error', async error => {
        console.error('Error in audio player:', error);
        await interaction.editReply('There was an error trying to play the song.');
        connection.destroy();
      });

      await interaction.editReply(`Now playing: ${songTitle}`);
    } catch (error) {
      console.error('Error playing song:', error);
      await interaction.editReply(error.message || 'There was an error trying to play the song.');
    }
  },
};
