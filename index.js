// Function to dynamically create and update cards
function updateCards(items) {
    const container = document.getElementById('product-list');
    container.innerHTML = ''; // Clear existing cards

    items.forEach(item => {
        // Create card element
        const card = document.createElement('div');
        card.className = 'card';

        // Create image element
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;
        img.className = 'card-image';

        // Create text container
        const textContainer = document.createElement('div');
        textContainer.className = 'card-text';

        // Create name element
        const name = document.createElement('h3');
        name.textContent = item.name;

        // Create price element
        const price = document.createElement('p');
        price.textContent = `Price: $${item.price}`;

        // Create category element
        const category = document.createElement('p');
        category.textContent = `Category: ${item.category}`;

        // Append text elements to text container
        textContainer.appendChild(name);
        textContainer.appendChild(price);
        textContainer.appendChild(category);

        // Append image and text container to card
        card.appendChild(img);
        card.appendChild(textContainer);

        // Append card to container
        container.appendChild(card);
    });
}

const items = [
    { name: 'Zorb Box', price: 39.99, category: 'Decor', image: 'images/image.png' },
    { name: 'Lamporite (living)', price: 49.99, category: 'Decor', image: 'images/image1.png' },
    { name: 'Earth Clock', price: 29.99, category: 'Decor', image: 'images/image2.png' },
    { name: 'Crackle Pot', price: 89.99, category: 'Cooking', image: 'images/image3.png' },
    { name: 'Blurb Storage', price: 19.99, category: 'Cooking', image: 'images/image4.png' },
    { name: 'Blamphers (set of 2)', price: 29.99, category: 'Decor', image: 'images/image5.png' },
    { name: 'Crawlizer', price: 19.99, category: 'Toy', image: 'images/image6.png' },
    { name: 'Zurgon Tree Vase', price: 49.99, category: 'Decor', image: 'images/image7.png' },
    { name: 'Tumble Pot', price: 19.99, category: 'Cooking', image: 'images/image8.png' },
    { name: 'Dinglehopper', price: 39.99, category: 'Toy', image: 'images/image9.png' },
];

updateCards(items);


const searchInput = document.getElementById('search');
const searchButton = document.getElementById('search-button');

function performSearch() {
    const query = searchInput.value.toLowerCase();
    // Filter items: match if query is found in product name or category
    const filteredItems = items.filter(item => {
        return item.name.toLowerCase().includes(query) ||
               item.category.toLowerCase().includes(query);
    });
    updateCards(filteredItems);
}

// Trigger search on button click
searchButton.addEventListener('click', performSearch);

// Optionally, trigger search on pressing Enter in the search input
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});


// Add sorting function
const sort = document.getElementById('sort');
const order = document.getElementById('order');

// Function to update order option texts based on the sort type.
function updateOrderOptions() {
    if (sort.value === "price") {
        order.options[0].text = "High to Low";  // Option with value "asc"
        order.options[1].text = "Low to High";  // Option with value "desc"
    } else if (sort.value === "name") {
        order.options[0].text = "A-Z";  // Option with value "asc"
        order.options[1].text = "Z-A";  // Option with value "desc"
    }
}

function updateOrder() {
    if (sort.value === "price") {
        if (order.value === "asc") {
            const sortedItems = items.sort((a,b) => { return b.price - a.price });
            updateCards(sortedItems);
        } else {
            const sortedItems = items.sort((a,b) => { return a.price - b.price });
            updateCards(sortedItems);
        }
    } else if (sort.value === "name") {
        if (order.value === "asc") {
            const sortedItems = items.sort((a,b) => { 
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return -1;
                } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1;
                } else {
                    return 0;
                }
             });
            updateCards(sortedItems);
        } else {
            const sortedItems = items.sort((a,b) => { 
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return -1;
                } else if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return 1;
                } else {
                    return 0;
                }
             });
            updateCards(sortedItems);
            updateOrder();
        }
    }
}

// Listen for changes on the sort dropdown.
sort.addEventListener("change", function() {
    updateOrderOptions();
    updateOrder();
});

order.addEventListener("change", updateOrder);

updateOrderOptions();
updateOrder();