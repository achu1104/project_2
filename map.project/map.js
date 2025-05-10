const map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let currentLatLng = null;

map.on('click', function(e) {
  currentLatLng = e.latlng;
  document.getElementById('memoryForm').style.display = 'block';
});

function saveMemory() {
  const title = document.getElementById('title').value;
  const story = document.getElementById('story').value;
  const photoInput = document.getElementById('photo');
  const photo = photoInput.files[0];

  if (!title || !story || !photo || !currentLatLng) {
    alert('Please fill all fields and select a location.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const imageUrl = e.target.result;

    const popupContent = `
      <strong>${title}</strong><br>
      <img src="${imageUrl}" alt="Memory" style="width:100px; height:auto;"><br>
      <p>${story}</p>
    `;

    L.marker(currentLatLng).addTo(map)
      .bindPopup(popupContent);

    document.getElementById('memoryForm').reset();
    document.getElementById('memoryForm').style.display = 'none';
  };
  reader.readAsDataURL(photo);
}
