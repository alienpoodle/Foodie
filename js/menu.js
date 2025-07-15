// Use $(function() { ... }); for document ready, no need for window.addEventListener("load")
$(function() {
    // Hide the first menu item template immediately
    $(".menu-item:first").hide();

    $.ajax({
        // Updated URL to point to the local menu.json file
        url: "https://alienpoodle.github.io/Foodie/menu.json", 
        success: function(result) {
            $.each(result, function(index, item) {
                // Clone the first menu-item template for each new item
                var $cards = $(".menu-item:first").clone(); 
                
                var name = item.name;
                var category = item.category;
                var extras = item.extra;
                var cost = item.cost;
                var imageurl = item.image;

                // Populate the cloned card with data
                $cards.find(".menu-item__title").html(name);
                $cards.find(".menu-item__category").html(category);
                $cards.find(".menu-item__price").html("$ " + cost); 
                $cards.find(".food-image").attr('src', imageurl);
                
                // Clear any existing extra items from the template's ul
                $cards.find(".menu-item__additional").empty(); 

                // Loop through extras and append them ONLY to the ul within the CURRENT cloned card
                $.each(extras, function(subindex, value) {
                    var $additionalItem = $('<li class="list-group-item list-group-item-action list-group-item-dark">' + value + '</li>');
                    // Append the new li to the ul inside the CURRENT cloned card
                    $additionalItem.appendTo($cards.find(".menu-item__additional"));
                });

                // Show the populated card
                $cards.show(); 
                // Append the entire populated card to the menu grid
                $cards.appendTo($(".menu-grid")); 
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("Error loading menu.json:", textStatus, errorThrown);
            console.log("Response Text:", jqXHR.responseText);
        }
    });
});

// A little delay for live search
let typingTimer;          
let typeInterval = 500;  
let searchInput = document.getElementById('searchbox');

if (searchInput) { 
    searchInput.addEventListener('keyup', () => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(liveSearch, typeInterval);
    });
} else {
    console.error("Searchbox element not found!");
}

function liveSearch() {
    // Locate the card elements
    let cards = document.querySelectorAll('.menu-item');
    // Locate the search input
    let search_query = document.getElementById("searchbox").value;

    // Loop through the cards
    for (var i = 0; i < cards.length; i++) {
        // If the text is within the card...
        if(cards[i].textContent.toLowerCase().includes(search_query.toLowerCase())) {
            // ...remove the `.is-hidden` class.
            cards[i].classList.remove("is-hidden");
        } else {
            // Otherwise, add the class.
            cards[i].classList.add("is-hidden");
        }
    }
}
