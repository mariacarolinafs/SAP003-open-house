
function Home(props) {
  let template = ''
  template = `
    <h3>Filmes em cartaz essa semana</h3>
    <section class=movie></section>
    <p class="map-title">Cinemas próximos</p>
  <div id="map"></div>`

  props.forEach(item => {
    fetch (movieUrl + item.id)
    .then(response => response.json())
    .then(data => {
      let movieName = data.results[0].title
      let moviePoster = data.results[0].poster_path
      
      document.querySelector('.movie').innerHTML += `<div class="poster"><a href='#${data.results[0].original_title}'><img class="poster-img" src='https://image.tmdb.org/t/p/w200${moviePoster}'><p>${movieName}</p></a></div>`
    })
  })
  return template
}


setTimeout(function(){ 
  var platform = new H.service.Platform({
      'apikey': '4suKp7ALVGG_DeM2J0bKH5XgCuWGWOozj4Cw3z0rk_8'
  });
  
  var defaultLayers = platform.createDefaultLayers();
  
  var map = new H.Map(
    document.getElementById('map'),
    defaultLayers.vector.normal.map,
    {
      zoom: 15.5,
      center: { lat: -23.559447, lng: -46.658162 }
    });
  
   const adress = ['Rua da Consolação, 2432, São Paulo, Brazil',
   'Av. Paulista, 1230, São Paulo, Brazil',
   'Av. Paulista, 2064, São Paulo, Brazil', 
   'R. Augusta, 1475, São Paulo, Brazil']
  
   adress.forEach(function(e) {
      var geocodingParams = {
          searchText: e
        };
      
        var onResult = function(result) {
          var locations = result.Response.View[0].Result,
            position,
            marker;
          for (let i = 0;  i < locations.length; i++) {
          position = {
            lat: locations[i].Location.DisplayPosition.Latitude,
            lng: locations[i].Location.DisplayPosition.Longitude
          };
          marker = new H.map.Marker(position);
          map.addObject(marker);
          }
        };
        
        var geocoder = platform.getGeocodingService();
        
       geocoder.geocode(geocodingParams, onResult, function(e) {
          alert(e);
        });
   } );
}, 2000);





export default Home;