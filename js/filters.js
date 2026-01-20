// filters.js - Filter System

// Filter data structure
const filterData = {
    categories: ['Japanese', 'Western', 'Chinese', 'Korean', 'Other'],
    studios: [],
    labels: [],
    series: [],
    actresses: [],
    tags: [],
    versions: ['Censored', 'Decensored', 'Uncensored', 'Subbed'],
    qualities: ['360p', '480p', '720p', '1080p', '2K', '4K'],
    ratings: ['4.5+', '4.0+', '3.5+', '3.0+'],
    durations: ['Short (< 90 min)', 'Medium (90-120 min)', 'Long (120-150 min)', 'Very Long (> 150 min)'],
    releases: ['2024', '2023', '2022', '2021', '2020 & Older'],
    collab: ['Yes', 'No']
};

// Initialize filters
function initializeFilters() {
    console.log('Filters initialized');
    populateFilterData();
}

// Populate dynamic filter data from video collection
function populateFilterData() {
    if (!videoCollection || videoCollection.length === 0) return;
    
    const studios = new Set();
    const labels = new Set();
    const series = new Set();
    const actresses = new Set();
    const tags = new Set();
    
    videoCollection.forEach(video => {
        if (video.studio) studios.add(video.studio);
        if (video.label) labels.add(video.label);
        if (video.series) series.add(video.series);
        if (video.actresses) {
            video.actresses.forEach(actress => actresses.add(actress));
        }
        if (video.tags) {
            video.tags.forEach(tag => tags.add(tag));
        }
    });
    
    filterData.studios = Array.from(studios).sort();
    filterData.labels = Array.from(labels).sort();
    filterData.series = Array.from(series).sort();
    filterData.actresses = Array.from(actresses).sort();
    filterData.tags = Array.from(tags).sort();
}

function openFilterModal(filterType) {
    currentFilterType = filterType;
    
    // Update modal title and icon
    const iconMap = {
        category: 'fa-folder',
        actress: 'fa-user',
        tags: 'fa-tag',
        studio: 'fa-building',
        label: 'fa-bookmark',
        series: 'fa-layer-group',
        release: 'fa-calendar',
        duration: 'fa-clock',
        rating: 'fa-star',
        version: 'fa-code-branch',
        quality: 'fa-hd',
        collab: 'fa-users'
    };
    
    const iconEl = document.getElementById('filterModalIcon');
    const titleEl = document.getElementById('filterModalTitle');
    
    if (iconEl) iconEl.className = `fas ${iconMap[filterType]}`;
    if (titleEl) titleEl.textContent = filterType.charAt(0).toUpperCase() + filterType.slice(1);
    
    // Load filter options
    loadFilterOptions(filterType);
    
    // Show modal
    const overlay = document.getElementById('filterModalOverlay');
    const modal = document.getElementById('filterModal');
    
    if (overlay) overlay.classList.add('active');
    if (modal) modal.classList.add('active');
}

function loadFilterOptions(filterType) {
    const content = document.getElementById('filterModalContent');
    if (!content) return;
    
    selectedFilterOptions = [...activeFilters[filterType]];
    
    // Get filtered videos based on current category filter
    const filteredVideos = getFilteredVideosByCategory();
    
    let options = [];
    
    // Get options based on filter type
    if (filterType === 'category') {
        options = filterData.categories;
    } else if (filterType === 'actress') {
        options = filterData.actresses;
    } else if (filterType === 'tags') {
        options = filterData.tags;
    } else if (filterType === 'studio') {
        options = filterData.studios;
    } else if (filterType === 'label') {
        options = filterData.labels;
    } else if (filterType === 'series') {
        options = filterData.series;
    } else if (filterType === 'release') {
        options = filterData.releases;
    } else if (filterType === 'duration') {
        options = filterData.durations;
    } else if (filterType === 'rating') {
        options = filterData.ratings;
    } else if (filterType === 'version') {
        options = filterData.versions;
    } else if (filterType === 'quality') {
        options = filterData.qualities;
    } else if (filterType === 'collab') {
        options = filterData.collab;
    }
    
    // Special layout for actress and tags
    if (filterType === 'actress' && options.length > 0) {
        content.innerHTML = `
            <div class="filter-actress-grid">
                ${options.map(actress => {
                    const isActive = selectedFilterOptions.includes(actress);
                    return `
                        <div class="filter-actress-item ${isActive ? 'active' : ''}" 
                             onclick="toggleFilterOption('${actress.replace(/'/g, "\\'")}')">
                            <img class="filter-actress-img" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="${actress}">
                            <div class="filter-actress-name">${actress}</div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    } else if (filterType === 'tags' && options.length > 0) {
        content.innerHTML = `
            <div class="filter-tags-grid">
                ${options.map(tag => {
                    const isActive = selectedFilterOptions.includes(tag);
                    return `
                        <div class="filter-tag-item ${isActive ? 'active' : ''}" 
                             onclick="toggleFilterOption('${tag.replace(/'/g, "\\'")}')">
                            <img class="filter-tag-img" src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="${tag}">
                            <div class="filter-tag-name">${tag}</div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    } else {
        // Regular layout for other filters
        // Sort options alphabetically, but keep selected options at top
        options.sort((a, b) => {
            const aSelected = selectedFilterOptions.includes(a);
            const bSelected = selectedFilterOptions.includes(b);
            if (aSelected && !bSelected) return -1;
            if (!aSelected && bSelected) return 1;
            return a.localeCompare(b);
        });
        
        content.innerHTML = `
            <div class="filter-options">
                ${options.map(option => {
                    const isActive = selectedFilterOptions.includes(option);
                    return `
                        <div class="filter-option ${isActive ? 'active' : ''}" 
                             onclick="toggleFilterOption('${option.replace(/'/g, "\\'")}')">
                            ${option}
                            <span class="filter-option-count">
                                ${getFilterCount(filterType, option, filteredVideos)}
                            </span>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }
}

function getFilteredVideosByCategory() {
    // Get videos filtered by current category selection
    const categoryFilter = activeFilters.category;
    if (categoryFilter.length === 0) return videoCollection;
    
    return videoCollection.filter(video => 
        categoryFilter.includes(video.category)
    );
}

function getFilterCount(filterType, option, filteredVideos) {
    // Count how many items match this filter option
    let count = 0;
    
    filteredVideos.forEach(video => {
        let matches = false;
        
        switch(filterType) {
            case 'category':
                matches = video.category === option;
                break;
            case 'actress':
                matches = video.actresses?.includes(option);
                break;
            case 'tags':
                matches = video.tags?.includes(option);
                break;
            case 'studio':
                matches = video.studio === option;
                break;
            case 'label':
                matches = video.label === option;
                break;
            case 'series':
                matches = video.series === option;
                break;
            case 'release':
                matches = video.release?.includes(option);
                break;
            case 'duration':
                const duration = parseInt(video.duration);
                if (option === 'Short (< 90 min)') matches = duration < 90;
                if (option === 'Medium (90-120 min)') matches = duration >= 90 && duration <= 120;
                if (option === 'Long (120-150 min)') matches = duration > 120 && duration <= 150;
                if (option === 'Very Long (> 150 min)') matches = duration > 150;
                break;
            case 'rating':
                const minRating = parseFloat(option);
                matches = video.rating >= minRating;
                break;
            case 'version':
                matches = video.versions?.includes(option);
                break;
            case 'quality':
                matches = video.quality === option;
                break;
            case 'collab':
                matches = option === 'Yes' ? video.collab === true : video.collab === false;
                break;
        }
        
        if (matches) count++;
    });
    
    return count;
}

function toggleFilterOption(option) {
    const index = selectedFilterOptions.indexOf(option);
    if (index > -1) {
        selectedFilterOptions.splice(index, 1);
    } else {
        selectedFilterOptions.push(option);
    }
    
    // Update UI
    loadFilterOptions(currentFilterType);
}

function clearFilterSelection() {
    selectedFilterOptions = [];
    loadFilterOptions(currentFilterType);
}

function applySelectedFilters() {
    if (currentFilterType) {
        activeFilters[currentFilterType] = [...selectedFilterOptions];
        updateCollectionFilterCircles();
        applyFilters();
        closeFilterModal();
        renderActiveFilters();
        
        if (currentPage === 'discover' && typeof renderDiscoverGrid === 'function') {
            renderDiscoverGrid();
        } else if (currentPage === 'featured' && typeof renderFeaturedPage === 'function') {
            renderFeaturedPage();
        }
    }
}

function closeFilterModal() {
    const overlay = document.getElementById('filterModalOverlay');
    const modal = document.getElementById('filterModal');
    
    if (overlay) overlay.classList.remove('active');
    if (modal) modal.classList.remove('active');
}

function applyFilters() {
    // Filter videos based on activeFilters
    currentContent = videoCollection.filter(video => {
        // Check each filter type
        for (const [filterType, selectedValues] of Object.entries(activeFilters)) {
            if (selectedValues.length === 0) continue;
            
            let matches = false;
            
            switch(filterType) {
                case 'category':
                    matches = selectedValues.includes(video.category);
                    break;
                case 'actress':
                    matches = selectedValues.some(value => video.actresses?.includes(value));
                    break;
                case 'tags':
                    matches = selectedValues.some(value => video.tags?.includes(value));
                    break;
                case 'studio':
                    matches = selectedValues.includes(video.studio);
                    break;
                case 'label':
                    matches = selectedValues.includes(video.label);
                    break;
                case 'series':
                    matches = selectedValues.includes(video.series);
                    break;
                case 'release':
                    matches = selectedValues.some(value => video.release?.includes(value));
                    break;
                case 'duration':
                    const duration = parseInt(video.duration);
                    selectedValues.forEach(value => {
                        if (value === 'Short (< 90 min)') matches = matches || duration < 90;
                        if (value === 'Medium (90-120 min)') matches = matches || (duration >= 90 && duration <= 120);
                        if (value === 'Long (120-150 min)') matches = matches || (duration > 120 && duration <= 150);
                        if (value === 'Very Long (> 150 min)') matches = matches || duration > 150;
                    });
                    break;
                case 'rating':
                    selectedValues.forEach(value => {
                        const minRating = parseFloat(value);
                        matches = matches || video.rating >= minRating;
                    });
                    break;
                case 'version':
                    matches = selectedValues.some(value => video.versions?.includes(value));
                    break;
                case 'quality':
                    matches = selectedValues.includes(video.quality);
                    break;
                case 'collab':
                    selectedValues.forEach(value => {
                        if (value === 'Yes') matches = matches || video.collab === true;
                        if (value === 'No') matches = matches || video.collab === false;
                    });
                    break;
            }
            
            if (!matches) return false;
        }
        
        return true;
    });
}

function renderActiveFilters() {
    const container = document.getElementById('activeFilters');
    if (!container) return;
    
    container.innerHTML = '';
    
    let hasActiveFilters = false;
    
    Object.entries(activeFilters).forEach(([filterType, values]) => {
        if (filterType === 'category' && values.length === 1 && values[0] === 'Japanese') {
            // Don't show default filter
            return;
        }
        
        values.forEach(value => {
            hasActiveFilters = true;
            const filterEl = document.createElement('div');
            filterEl.className = 'active-filter';
            filterEl.innerHTML = `
                ${filterType}: ${value}
                <button class="active-filter-remove" onclick="removeFilter('${filterType}', '${value.replace(/'/g, "\\'")}')">×</button>
            `;
            container.appendChild(filterEl);
        });
    });
    
    if (!hasActiveFilters) {
        container.style.display = 'none';
    } else {
        container.style.display = 'flex';
    }
}

function removeFilter(filterType, value) {
    const index = activeFilters[filterType].indexOf(value);
    if (index > -1) {
        activeFilters[filterType].splice(index, 1);
        updateCollectionFilterCircles();
        applyFilters();
        renderActiveFilters();
        
        if (currentPage === 'discover' && typeof renderDiscoverGrid === 'function') {
            renderDiscoverGrid();
        } else if (currentPage === 'featured' && typeof renderFeaturedPage === 'function') {
            renderFeaturedPage();
        }
    }
}

function resetFilters() {
    // Clear all filters except category=Japanese
    Object.keys(activeFilters).forEach(key => {
        if (key === 'category') {
            activeFilters[key] = ['Japanese'];
        } else {
            activeFilters[key] = [];
        }
    });
    
    updateCollectionFilterCircles();
    applyFilters();
    renderActiveFilters();
    
    if (currentPage === 'discover' && typeof renderDiscoverGrid === 'function') {
        renderDiscoverGrid();
    } else if (currentPage === 'featured' && typeof renderFeaturedPage === 'function') {
        renderFeaturedPage();
    }
    
    // Clear localStorage flag so filters reset on next load
    localStorage.removeItem('filtersSet');
}
