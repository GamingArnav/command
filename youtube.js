const { google } = require('googleapis');
const youtube = google.youtube('v3');

const apiKey = 'REMOVED FOR NOW';

async function findYouTubeUrl(query) {
  try {
    const response = await youtube.search.list({
      part: 'snippet',
      q: query,
      maxResults: 1,
      type: 'video',
      key: apiKey,
    });

    if (response.data.items.length === 0) {
      return null;
    }

    return `https://www.youtube.com/watch?v=${response.data.items[0].id.videoId}`;
  } catch (error) {
    console.error('Error searching YouTube:', error);
    return null;
  }
}

module.exports = { findYouTubeUrl };
