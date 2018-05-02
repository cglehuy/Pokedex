$(function() {

  pokemonList()

  $(".btn").on('click', function() {
    $(this).toggleClass("bounce")
    var pokemonName = $("input[type='text']").val().toLowerCase()
    var request = $.ajax({
      url: "http://pokeapi.salestock.net/api/v2/pokemon/" + pokemonName,
      method: "GET"
    });

    request.done(function(data) {
      console.log(data);
      var pokemonName = data.name
      var pokemonImg = data["sprites"]["front_default"]
      $(".pokedex .pokemon-img img").attr( "src", pokemonImg);
      $(".pokemon-name").text(pokemonName)
    });

    request.fail(function( jqXHR, textStatus, error ) {
      alert( "Request failed: " + textStatus + ' ' + error );
    });
  })

  $(".fa-bars").on('click', function() {
    $(".menu").toggleClass("active")
    $(this).toggleClass("hide")
  })
  $(".x").on('click', function() {
    $(".menu").removeClass("active")
  })

  function pokemonList() {
    var completedPokemons = []
    for (i = 1; i <= 5; i++) {
      var request = $.ajax({
        url: "http://pokeapi.salestock.net/api/v2/pokemon/" + i,
        method: "GET"
      });

      request.done(function(data) {
        $(".pokedex .menu").append("<span class='pokemon'>" + data.name + "</span>")
        completedPokemons.push(i)
        console.log(completedPokemons)
        if (completedPokemons.length >= 5) {
          $(".loading").addClass("hide")
        }
      });

      request.fail(function( jqXHR, textStatus, error ) {
        console.log( "Request failed: " + textStatus + ' ' + error );
      });
    }

  }

  })
