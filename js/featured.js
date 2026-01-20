// featured.js - Featured Page Logic

function initializeFeaturedPage() {
    console.log('Initializing featured page...');
    renderFeaturedPage();
}

function renderFeaturedPage() {
    renderSpecialSuggestions();
    renderTopRated();
    renderEditorsChoice();
    renderRecentlyReleased();
}

function renderSpecialSuggestions() {
    const grid = document.getElementById('specialSuggestions');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    // Get 5 random videos
    let randomVideos = [...videoCollection]
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);
    
    randomVideos.forEach(video => {
        const item = createFeaturedItem(video);
        grid.appendChild(item);
    });
}

function renderTopRated() {
    const grid = document.getElementById('topRated');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    // Get top 5 rated videos
    let topRated = [...videoCollection]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);
    
    topRated.forEach(video => {
        const item = createFeaturedItem(video);
        grid.appendChild(item);
    });
}

function renderEditorsChoice() {
    const grid = document.getElementById('editorsChoice');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    // Get 5 featured videos
    let editorsChoice = videoCollection
        .filter(v => v.featured)
        .slice(0, 5);
    
    editorsChoice.forEach(video => {
        const item = createFeaturedItem(video);
        grid.appendChild(item);
    });
}

function renderRecentlyReleased() {
    const grid = document.getElementById('recentlyReleased');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    // Get 5 most recent videos
    let recentVideos = [...videoCollection]
        .sort((a, b) => new Date(b.release) - new Date(a.release))
        .slice(0, 5);
    
    recentVideos.forEach(video => {
        const item = createFeaturedItem(video);
        grid.appendChild(item);
    });
}

function createFeaturedItem(video) {
    const item = document.createElement('div');
    item.className = 'featured-item';
    item.onclick = () => {
        if (typeof openVideoModal === 'function') {
            openVideoModal(video);
        }
    };
    item.innerHTML = `
        <img class="featured-image" src="${video.thumbnail || video.poster}">
        <div class="featured-content">
            <div class="featured-title">${video.title}</div>
            <div class="featured-meta">
                <span>⭐ ${video.rating}</span>
                <span>${video.duration}m</span>
            </div>
        </div>
    `;
    return item;
}

function viewAll(type) {
    // Set appropriate filters based on type and switch to discover
    resetFilters();
    
    if (type === 'toprated') {
        // Sort by rating
        currentContent = [...videoCollection].sort((a, b) => b.rating - a.rating);
    } else if (type === 'editors') {
        // Show only featured
        currentContent = videoCollection.filter(v => v.featured);
    } else if (type === 'recent') {
        // Sort by release date
        currentContent = [...videoCollection].sort((a, b) => new Date(b.release) - new Date(a.release));
    }
    
    switchTab('discover');
}
