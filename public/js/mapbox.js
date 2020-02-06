/*eslint-disable */
const locations = JSON.parse(document.getElementById('map').dataset.locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoiaXZhbnZvaW5vdiIsImEiOiJjazZhM2pvc3UwZWdnM2RyeTR3YmE3NTdvIn0.E3zHYEYLjcCkBa-pcjkDcg';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/ivanvoinov/ck6a3o4w62j8a1hmhxc2pclj9',
  scrollZoom: false
  // center: [-118.113, 34.111],
  // zoom: 7,
  // interactive: false
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(loc => {
  // Create a marker
  const el = document.createElement('div');
  el.className = 'marker';

  // Add the marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom'
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // Add popup
  new mapboxgl.Popup({
    offset: 30
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

  // Extend map bounds to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 150,
    bottom: 150,
    left: 100,
    right: 100
  }
});
