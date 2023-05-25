
window.addEventListener("load", function() {
    $(function() {
        //hide first div or remove after append using `$(".card:first").remove()`
        $(".menu-item:first").hide()
        $.ajax({
          url: "https://alienpoodle.github.io/menu.json",
          success: function(result) {
            $.each(result, function(index, item) {
              var cards = $(".menu-item:first").clone() //clone first divs
              var name = item.name;
              var category = item.category;
              var extras = item.extra;
              console.log(extras);
              var cost = item.cost;
              var imageurl = item.image;;
              //add values inside divs
             
              $.each(extras, function(subindex,value){
                //var addditional = $(".menu-item__additional:first").clone() //clone first divs
                var addditional = $('<li class="list-group-item list-group-item-action">'+ value+'</li>');
                //$(cards).find(".menu-item__extra").html(item);
                $(addditional).appendTo($(".menu-item__additional"));
              });

              $(cards).find(".menu-item__title").html(name);
              $(cards).find(".menu-item__category").html(category);
              $(cards).find(".menu-item__price").html("$ "+ cost + " ");
              $(cards).find(".food-image").attr('src', imageurl);
              $(cards).show() //show cards
              $(cards).appendTo($(".menu-grid")) //append to container
            });
    
          }
        });
      });


      
}, false);

//A little delay
let typingTimer;               
let typeInterval = 500;  
let searchInput = document.getElementById('searchbox');

searchInput.addEventListener('keyup', () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(liveSearch, typeInterval);
});

function liveSearch() {
  // Locate the card elements
  let cards = document.querySelectorAll('.menu-item')
  // Locate the search input
  let search_query = document.getElementById("searchbox").value;
  // Loop through the cards
  for (var i = 0; i < cards.length; i++) {
    // If the text is within the card...
    if(cards[i].textContent.toLowerCase()
      // ...and the text matches the search query...
      .includes(search_query.toLowerCase())) {
        // ...remove the `.is-hidden` class.
        cards[i].classList.remove("is-hidden");
    } else {
      // Otherwise, add the class.
      cards[i].classList.add("is-hidden");
    }
  }
}

