import { client } from './cache';

function extractArtistData(data, offset) {
  return data.map((item, i) => ({
    rank: offset + i + 1,
    spotifyURL: item.external_urls.spotify,
    name: item.name,
    imageURL: item.images[2].url, // TODO: this may cause errors
    genres: item.genres.slice(0, 5),
    popularity: item.popularity,
  }));
}

function extractTrackData(data, offset) {
  return data.map((item, i) => ({
    artists: item.artists.map(({ name }) => name),
    albumImage: item.album.images[2].url,
    trackName: item.name,
    popularity: item.popularity,
    rank: offset + i + 1,
    spotifyURL: item.external_urls.spotify,
    previewURL: item.preview_url,
  }));
}

export default async function getUsersTopData(accessToken, type, time_range = 'medium_term', limit = 20, offset = 0) {
  const queryParams = new URLSearchParams({
    time_range,
    limit,
    offset,
  }).toString();

  const response = await client.get(`/${type}?${queryParams}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const { items } = response.data;

  if (type === 'artists') {
    return extractArtistData(items, offset);
  }
  return extractTrackData(items, offset);
}
