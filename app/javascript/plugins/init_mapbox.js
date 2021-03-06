import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const initMapbox = () => {
  const mapElement = document.getElementById('map');

  const fitMapToMarkers = (map, markers) => {
    const bounds = new mapboxgl.LngLatBounds();
    markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
    map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 });
  };
  const addMarkersToMap = (map, markers) => {
    markers.forEach((marker) => {
      const popup = new mapboxgl.Popup().setHTML(marker.info_window); // add this

      const element = document.createElement("div");
      element.className = "marker";
      element.style.backgroundImage = `url('${marker.image_url}')`;
      element.style.backgroundSize = "contain";
      element.style.width = "40px";
      element.style.height = "40px";

      new mapboxgl.Marker(element)
        .setLngLat([marker.lng, marker.lat])
        .setPopup(popup) // add this
        .addTo(map);
    });
  };

  if (mapElement) {
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10'
    });

    const markers = JSON.parse(mapElement.dataset.markers);
    addMarkersToMap(map, markers);
    fitMapToMarkers(map, markers);
  }
};

export { initMapbox };
