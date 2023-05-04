

window.addEventListener("load", function() {
    $(function() {
        //hide first div or remove after append using `$(".card:first").remove()`
        $(".w3-card-2:first").hide()
        $(".hslides:first").hide()
        $.ajax({
          url: "https://alienpoodle.github.io/food-app-e5b3a-default-rtdb-export.json",
          success: function(result) {
            $.each(result, function(index, item) {
              var cards = $(".w3-card-2:first").clone() //clone first divs
              var name = item.name;
              var ingredients = item.ingredients;
              var instructions = item.instructions;
              var imageurl = item.image;
              var prep = item.prep;
              var rating = item.rating;
              var cost = item.cost;
              //add values inside divs
              $(cards).find(".card-name").html(name);
              $(cards).find(".card-ingredients").html(ingredients);
              $(cards).find(".card-instructions").html(instructions);
              $(cards).find(".card-cost").html("$ "+ cost + " ");
              $(cards).find(".card-rating").html(rating + "/" + "10");
              $(cards).find(".card-prep").html(prep + " min  "+ " ");
              $(cards).find(".food-image").attr('src', imageurl);
              $(cards).show() //show cards
              $(cards).appendTo($(".recipe-grid")) //append to container
            });
    
          }
        });
      });
     
}, false);