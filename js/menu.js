// Global variable to store menu items after they are loaded
// Initialize as an empty array
let allMenuItems = []; 

// Use $(function() { ... }); for document ready
$(function() {
    // Hide the first menu item template immediately
    $(".menu-item:first").hide();

    $.ajax({
        // Updated URL to point to the local menu.json file
        url: "menu.json", 
        success: function(result) {
            $.each(result, function(index, item) {
                // Clone the first menu-item template for each new item
                var $cards = $(".menu-item:first").clone(); 
                
                var name = item.name;
                var category = item.category;
                var description = item.description; // Get description from JSON
                var extras = item.extra;
                var cost = item.cost;
                var imageurl = item.image;

                // Populate the cloned card with data
                $cards.find(".menu-item__title").html(name);
                $cards.find(".menu-item__category").html(category);
                $cards.find(".menu-item__price").html("$ " + cost); 
                $cards.find(".food-image").attr('src', imageurl);
                $cards.find(".food-image").attr('alt', name); // Set alt text dynamically from name
                $cards.find(".menu-item__text").html(description); // Set description dynamically

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

            // After all cards are appended by the AJAX request,
            // populate the global allMenuItems array with the *actual* displayed cards.
            // We use :not(:first-child) to exclude the initial hidden template card.
            allMenuItems = document.querySelectorAll('.menu-item:not(:first-child)'); 
            console.log("Menu items successfully loaded and ready for search. Found:", allMenuItems.length, "items.");
            // *** IMPORTANT FIX END ***

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
    // *** IMPORTANT FIX START ***
    // Now, instead of querying the DOM every time, we use the pre-populated array.
    let cards = allMenuItems; 
    
    // Add a safeguard in case search is somehow triggered before items are loaded
    if (cards.length === 0) {
        console.warn("Search attempted, but no menu items are loaded yet.");
        return; // Exit the function if no items are present
    }

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
