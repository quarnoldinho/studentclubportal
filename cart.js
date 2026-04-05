let events = []
let cart = []

// Load events from JSON file
$(document).ready(function() {
    $.getJSON('events.json', function(data) {
        events = data
        displayEvents(events)
    });
});

function displayEvents(events) {
    const eventList = $('#eventList')
    eventList.empty()
    events.forEach(event => {
        const eventCard = `
            <div class="card col-sm-12 col-md-6 col-lg-4 p-0 mb-4" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${event.name}</h5>
                    <p class="card-text">${event.description}</p>
                    <p class="card-text"><strong>Price:</strong> $${event.price} per ${event.unit}</p>
                    <button class="btn btn-primary add-to-cart" data-id="${event.id}">Add to Cart</button>
                </div>
            </div>
        `
        eventList.append(eventCard)
    });
}

    // Add click event listener for "Add to Cart" buttons
    $(document).on('click', '.add-to-cart', function() {
        const eventId = $(this).data('id')
        const event = events.find(e => e.id === eventId)
        if (event) {
            addToCart(event)
        }
    });

function addToCart(event) {
    const existingItem = cart.find(item => item.id === event.id)
    if (existingItem) {
        existingItem.quantity += 1
    } else {
        cart.push({ ...event, quantity: 1 })
    }
    updateCartDisplay()
}

$("#searchInput").on("keyup", function() {
    const value = $(this).val().toLowerCase()
    const filteredEvents = events.filter(event => event.name.toLowerCase().includes(value))
    displayEvents(filteredEvents)
});

function updateCartDisplay() {
    const cartItems = $('#cartItems')
    cartItems.empty()
    let total = 0

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity
        total += itemTotal;
        const cartItem = `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                ${item.name} (x${item.quantity})
                <span>$${itemTotal.toFixed(2)}</span>
            </li>
        `
        cartItems.append(cartItem)
    })

$('#cartTotal').text(`$${total.toFixed(2)}`)
}