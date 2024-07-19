const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: 'removed',
  clientSecret: 'removed',
});

async function authorizeSpotify() {
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(data.body.access_token);
  } catch (error) {
    console.error('Error authorizing Spotify API:', error);
    throw new Error('Could not authorize Spotify API.');
  }
}

async function searchTrack(query) {
  try {
    await authorizeSpotify();
    const result = await spotifyApi.searchTracks(query);

    if (result.body.tracks.items.length === 0) {
      return null;
    }

    return result.body.tracks.items[0];
  } catch (error) {
    console.error('Error searching track on Spotify:', error);
    throw new Error('Could not search track on Spotify.');
  }
}

module.exports = { searchTrack };
