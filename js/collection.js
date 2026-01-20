// collection.js - Collection Page Logic

function initializeCollectionPage() {
    console.log('Initializing collection page...');
    updateCollectionFilterCircles();
}

function updateCollectionFilterCircles() {
    // Update circle visual states based on active filters
    Object.keys(activeFilters).forEach(filterType => {
        const circle = document.getElementById(`filter${filterType.charAt(0).toUpperCase() + filterType.slice(1)}`);
        if (circle) {
            if (activeFilters[filterType].length > 0) {
                circle.classList.add('active');
            } else {
                circle.classList.remove('active');
            }
        }
    });
}
