(function () {
  const lat = document.querySelector('#lat').value || 4.659931;
  const lng = document.querySelector('#lng').value || -74.098303;
  const mapa = L.map('mapa').setView([lat, lng], 16);
  let marker;

  // Utilizar provider y geocoder
  const geocodeService = L.esri.Geocoding.geocodeService();

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mapa);

  // El pin
  marker = new L.marker([lat, lng], {
    draggable: true,
    autoPan: true
  }).addTo(mapa)

  marker.on('moveend', function (e) {
    marker = e.target

    const position = marker.getLatLng();
    console.log(position);

    mapa.panTo(new L.LatLng(position.lat, position.lng));
    geocodeService.reverse().latlng(position, 16).run(function(error, resultado){
      //console.log(resultado)
      marker.bindPopup(resultado.address.LongLabel);

      //llenar los campos
      document.querySelector('.calle').textContent = resultado?.address?.Address ?? '';
      document.querySelector('#calle').value = resultado?.address?.Address ?? '';
      document.querySelector('#lat').value = resultado?.latlng?.lat ?? '';
      document.querySelector('#lng').value = resultado?.latlng?.lng ?? '';
    })
  })

})()