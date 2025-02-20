// Set your Mapbox access token here
mapboxgl.accessToken = 'pk.eyJ1Ijoiemh3MDc0IiwiYSI6ImNtN2Rxc3A5ZTA1djAya3EzanZoNTExcXMifQ.3DeLiMbZiACXq-l6BeUmTA';

// Initialize the map
const map = new mapboxgl.Map({
  container: 'map', // ID of the div where the map will render
  style: 'mapbox://styles/mapbox/streets-v12', // Map style
  center: [-71.09415, 42.36027], // [longitude, latitude]
  zoom: 12, // Initial zoom level
  minZoom: 5, // Minimum allowed zoom
  maxZoom: 18 // Maximum allowed zoom
});

// Wait for the map to load before adding data
map.on('load', () => {
  // Adding the source for Boston bike routes
  map.addSource('boston_route', {
    type: 'geojson',
    data: 'https://bostonopendata-boston.opendata.arcgis.com/datasets/boston::existing-bike-network-2022.geojson?...'
  });

  // Adding a layer to visualize the bike lanes
  map.addLayer({
    id: 'bike-lanes',
    type: 'line',
    source: 'boston_route',
    paint: {
        'line-color': '#32D400',  // A bright green using hex code
        'line-width': 5,          // Thicker lines
        'line-opacity': 0.6       // Slightly less transparent
      }
  });
  // Adding Cambridge bike lanes source and layer
  map.addSource('cambridge_route', {
    type: 'geojson',
    data: 'https://raw.githubusercontent.com/cambridgegis/cambridgegis_data/main/Recreation/Bike_Facilities/RECREATION_BikeFacilities.geojson'
  });
  map.addLayer({
    id: 'cambridge-bike-lanes',
    type: 'line',
    source: 'cambridge_route',
    paint: {
        'line-color': 'darkgreen',
        'line-width': 3,
        'line-opacity': 0.4
      }
  });
  // Fetch and display Bluebikes station data
  const jsonurl = 'https://dsc106.com/labs/lab07/data/bluebikes-stations.json';
  d3.json(jsonurl).then(data => {
    // Extract the stations array from the JSON data
    const stations = data.data.stations;
    stations.forEach(station => {
      // For each station, add a marker to the map
      new mapboxgl.Marker()
        .setLngLat([station.Long, station.Lat])
        .setPopup(new mapboxgl.Popup({ offset: 30 }) // add popups
        .setText(`${station.NAME}`))
        .addTo(map);
    });
  }).catch(error => {
    console.error('Error loading JSON:', error);
  });
});