// State management
let currentTheme = 'light';
let activeTab = 'videos';
let activeFilters = [];
let currentSort = 'shuffle';
let currentSearchTerm = '';
let selectedFilters = {
    actress: [],
    tags: [],
    studios: [],
    tokens: [],
    series: [],
    version: [],
    group: []
};

// Pagination state
let currentVideoPage = 1;
let currentAlbumPage = 1;
let currentPicturePage = 1;
const itemsPerPage = {
    videos: 6,
    albums: 6,
    pictures: 12
};

// Current video for suggestion carousels
let currentVideoForSuggestions = null;

// Track video player state to prevent poster click from resetting it
let isVideoPlaying = false;
let currentVideoPlayerType = null;

// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const filtersBtn = document.getElementById('filtersBtn');
const searchInput = document.getElementById('searchInput');
const sortBtn = document.getElementById('sortBtn');
const sortMenu = document.getElementById('sortMenu');
const activeFiltersContainer = document.getElementById('activeFilters');
const tabs = document.querySelectorAll('.tab');
const contentSections = document.querySelectorAll('.content-section');
const videosGrid = document.getElementById('videosGrid');
const albumsGrid = document.getElementById('albumsGrid');
const picturesGrid = document.getElementById('picturesGrid');
const videoModal = document.getElementById('videoModal');
const filterModal = document.getElementById('filterModal');
const albumModal = document.getElementById('albumModal');
const imageModal = document.getElementById('imageModal');
const closeVideoModal = document.getElementById('closeVideoModal');
const closeFilterModal = document.getElementById('closeFilterModal');
const closeAlbumModal = document.getElementById('closeAlbumModal');
const closeImageModal = document.getElementById('closeImageModal');
const fullscreenImage = document.getElementById('fullscreenImage');

// Video modal elements
const mainModalContent = document.getElementById('mainModalContent');
const previewPage = document.getElementById('previewPage');
const previewBackBtn = document.getElementById('previewBackBtn');
const videoThumbnailContainer = document.getElementById('videoThumbnailContainer');
const modalThumb = document.getElementById('modalThumb');
const videoPlayer = document.getElementById('videoPlayer');
const videoFrame = document.getElementById('videoFrame');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const toggleDesc = document.getElementById('toggleDesc');
const modalTags = document.getElementById('modalTags');
const modalSeries = document.getElementById('modalSeries');
const modalActress = document.getElementById('modalActress');
const modalRating = document.getElementById('modalRating');
const modalStudio = document.getElementById('modalStudio');
const modalLabel = document.getElementById('modalLabel');
const modalRelease = document.getElementById('modalRelease');
const modalDuration = document.getElementById('modalDuration');
const modalVersions = document.getElementById('modalVersions');
const modalGroup = document.getElementById('modalGroup');
const modalViews = document.getElementById('modalViews');
const modalPoster = document.getElementById('modalPoster');
const modalCode = document.getElementById('modalCode');
const previewBtn = document.getElementById('previewBtn');
const trailerBtn = document.getElementById('trailerBtn');
const videoBtn = document.getElementById('videoBtn');
const previewImagesFull = document.getElementById('previewImagesFull');

// Suggestion carousel elements
const alsoStarredCarousel = document.getElementById('alsoStarredCarousel');
const youMayLikeCarousel = document.getElementById('youMayLikeCarousel');
const alsoStarredPrev = document.getElementById('alsoStarredPrev');
const alsoStarredNext = document.getElementById('alsoStarredNext');
const youMayLikePrev = document.getElementById('youMayLikePrev');
const youMayLikeNext = document.getElementById('youMayLikeNext');

// Pagination elements
const videosPrevBtn = document.getElementById('videosPrevBtn');
const videosNextBtn = document.getElementById('videosNextBtn');
const videosPageNumber = document.getElementById('videosPageNumber');
const albumsPrevBtn = document.getElementById('albumsPrevBtn');
const albumsNextBtn = document.getElementById('albumsNextBtn');
const albumsPageNumber = document.getElementById('albumsPageNumber');
const picturesPrevBtn = document.getElementById('picturesPrevBtn');
const picturesNextBtn = document.getElementById('picturesNextBtn');
const picturesPageNumber = document.getElementById('picturesPageNumber');

// Album modal elements
const albumModalTitle = document.getElementById('albumModalTitle');
const albumModalTags = document.getElementById('albumModalTags');
const albumModalActress = document.getElementById('albumModalActress');
const albumModalImageCount = document.getElementById('albumModalImageCount');
const albumMainCover = document.getElementById('albumMainCover');
const albumImagesContainer = document.getElementById('albumImages');

// Filter modal elements
const filterTabs = document.querySelectorAll('.filter-tab');
const filterSections = document.querySelectorAll('.filter-section');
const selectedFiltersContainer = document.getElementById('selectedFilters');
const actressGrid = document.getElementById('actressGrid');
const tagsGrid = document.getElementById('tagsGrid');
const studiosGrid = document.getElementById('studiosGrid');
const tokensGrid = document.getElementById('tokensGrid');
const seriesGrid = document.getElementById('seriesGrid');

// Initialize the app
function init() {
    // Set initial theme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        toggleTheme();
    }
    
    // Set default sort to "shuffle"
    document.querySelectorAll('.sort-option').forEach(option => {
        option.classList.remove('active');
        if (option.dataset.sort === 'shuffle') {
            option.classList.add('active');
        }
    });
    
    // Load initial content
    loadVideos();
    loadAlbums();
    loadPictures();
    loadFilterData();
    
    // Set up event listeners
    setupEventListeners();
    
    // Update pagination displays
    updatePagination();
}

// Set up all event listeners
function setupEventListeners() {
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Search
    searchInput.addEventListener('input', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
    
    // Sort menu
    sortBtn.addEventListener('click', toggleSortMenu);
    document.querySelectorAll('.sort-option').forEach(option => {
        option.addEventListener('click', handleSortChange);
    });
    
    // Tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', handleTabChange);
    });
    
    // Modals
    filtersBtn.addEventListener('click', openFilterModal);
    closeVideoModal.addEventListener('click', () => closeModal(videoModal));
    closeFilterModal.addEventListener('click', () => closeModal(filterModal));
    closeAlbumModal.addEventListener('click', () => closeModal(albumModal));
    closeImageModal.addEventListener('click', () => closeModal(imageModal));
    
    // Close modals when clicking outside
    [videoModal, filterModal, albumModal, imageModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(modal);
        });
    });
    
    // Close sort menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!sortBtn.contains(e.target) && !sortMenu.contains(e.target)) {
            sortMenu.classList.remove('active');
        }
    });
    
    // Description toggle
    toggleDesc.addEventListener('click', toggleDescription);
    
    // Video controls
    previewBtn.addEventListener('click', openPreviewPage);
    trailerBtn.addEventListener('click', () => playVideo('trailer'));
    videoBtn.addEventListener('click', () => playVideo('full'));
    
    // Preview page back button
    previewBackBtn.addEventListener('click', closePreviewPage);
    
    // Carousel navigation
    alsoStarredPrev.addEventListener('click', () => scrollCarousel('alsoStarred', -1));
    alsoStarredNext.addEventListener('click', () => scrollCarousel('alsoStarred', 1));
    youMayLikePrev.addEventListener('click', () => scrollCarousel('youMayLike', -1));
    youMayLikeNext.addEventListener('click', () => scrollCarousel('youMayLike', 1));
    
    // Pagination
    videosPrevBtn.addEventListener('click', () => changePage('videos', -1));
    videosNextBtn.addEventListener('click', () => changePage('videos', 1));
    albumsPrevBtn.addEventListener('click', () => changePage('albums', -1));
    albumsNextBtn.addEventListener('click', () => changePage('albums', 1));
    picturesPrevBtn.addEventListener('click', () => changePage('pictures', -1));
    picturesNextBtn.addEventListener('click', () => changePage('pictures', 1));
    
    // Filter tabs
    filterTabs.forEach(tab => {
        tab.addEventListener('click', handleFilterTabChange);
    });
    
    // Filter search
    document.querySelectorAll('.filter-search-input').forEach(input => {
        input.addEventListener('input', handleFilterSearch);
    });
    
    // Option items
    document.querySelectorAll('.option-item').forEach(item => {
        item.addEventListener('click', handleOptionSelect);
    });
    
    // Touch support for carousels
    setupCarouselTouch();
    
    // Prevent poster click from resetting video player
    modalPoster.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // Also prevent thumbnail container click from resetting if video is playing
    videoThumbnailContainer.addEventListener('click', (e) => {
        if (isVideoPlaying && (e.target === videoPlayer || e.target === videoFrame || videoPlayer.contains(e.target))) {
            e.stopPropagation();
        }
    });
}

// Toggle between light and dark themes
function toggleTheme() {
    const body = document.body;
    
    if (currentTheme === 'light') {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        currentTheme = 'dark';
    } else {
        body.classList.remove('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        currentTheme = 'light';
    }
    
    // Save theme preference
    localStorage.setItem('theme', currentTheme);
}

// Disable background scrolling when modal is open
function disableBodyScroll() {
    document.body.classList.add('modal-open');
}

// Enable background scrolling when modal is closed
function enableBodyScroll() {
    document.body.classList.remove('modal-open');
}

// Open modal with scroll disabling
function openModal(modal) {
    modal.classList.add('active');
    disableBodyScroll();
}

// Close modal with scroll enabling
function closeModal(modal) {
    modal.classList.remove('active');
    enableBodyScroll();
    
    // Reset video player state when closing video modal
    if (modal === videoModal) {
        if (isVideoPlaying) {
            videoFrame.src = '';
            modalThumb.style.display = 'block';
            videoPlayer.style.display = 'none';
            isVideoPlaying = false;
            currentVideoPlayerType = null;
        }
    }
}

// Toggle sort menu visibility
function toggleSortMenu() {
    sortMenu.classList.toggle('active');
}

// Handle sort option selection
function handleSortChange(e) {
    const sortValue = e.target.dataset.sort;
    
    // Update active sort option
    document.querySelectorAll('.sort-option').forEach(option => {
        option.classList.remove('active');
    });
    e.target.classList.add('active');
    
    currentSort = sortValue;
    sortMenu.classList.remove('active');
    
    // Reset to page 1 when changing sort
    if (activeTab === 'videos') currentVideoPage = 1;
    if (activeTab === 'albums') currentAlbumPage = 1;
    if (activeTab === 'pictures') currentPicturePage = 1;
    
    // Re-render current tab content with new sort
    renderCurrentTab();
    updatePagination();
}

// Handle tab switching
function handleTabChange(e) {
    const tabId = e.target.dataset.tab;
    
    // Update active tab
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    e.target.classList.add('active');
    
    // Show corresponding content section
    contentSections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(`${tabId}Section`).classList.add('active');
    
    activeTab = tabId;
    
    // Update pagination
    updatePagination();
}

// Handle search input
function handleSearch() {
    currentSearchTerm = searchInput.value;
    
    // If search is cleared, reset content
    if (!currentSearchTerm) {
        // Reset to page 1 when clearing search
        if (activeTab === 'videos') currentVideoPage = 1;
        if (activeTab === 'albums') currentAlbumPage = 1;
        if (activeTab === 'pictures') currentPicturePage = 1;
        
        renderCurrentTab();
        updatePagination();
    }
}

// Perform search with current term
function performSearch() {
    if (currentSearchTerm) {
        // Reset to page 1 when searching
        if (activeTab === 'videos') currentVideoPage = 1;
        if (activeTab === 'albums') currentAlbumPage = 1;
        if (activeTab === 'pictures') currentPicturePage = 1;
        
        addFilter(`Search: ${currentSearchTerm}`);
        
        // Simulate search results
        renderCurrentTab();
        updatePagination();
        
        // Show message
        showNotification(`Search results for "${currentSearchTerm}"`);
    }
}

// Toggle description expanded/collapsed
function toggleDescription() {
    modalDesc.classList.toggle('expanded');
    toggleDesc.textContent = modalDesc.classList.contains('expanded') ? 'Show Less' : 'Show More';
}

// Open preview page
function openPreviewPage() {
    mainModalContent.style.display = 'none';
    previewPage.style.display = 'block';
}

// Close preview page
function closePreviewPage() {
    previewPage.style.display = 'none';
    mainModalContent.style.display = 'block';
}

// Play video in modal
function playVideo(type) {
    const thumbnail = videoThumbnailContainer.querySelector('img');
    const player = videoThumbnailContainer.querySelector('.video-player');
    
    // Stop any currently playing video first
    if (isVideoPlaying && currentVideoPlayerType !== type) {
        videoFrame.src = '';
    }
    
    if (type === 'trailer') {
        videoFrame.src = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";
    } else {
        videoFrame.src = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";
    }
    
    thumbnail.style.display = 'none';
    player.style.display = 'block';
    isVideoPlaying = true;
    currentVideoPlayerType = type;
}

// Handle filter tab change
function handleFilterTabChange(e) {
    const tabId = e.target.dataset.filterTab;
    
    // Update active filter tab
    filterTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    e.target.classList.add('active');
    
    // Show corresponding filter section
    filterSections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(`${tabId}Filter`).classList.add('active');
}

// Handle filter search
function handleFilterSearch(e) {
    const filterType = e.target.dataset.filterType;
    const searchTerm = e.target.value.toLowerCase();
    
    // Filter items based on search term
    const gridId = `${filterType}Grid`;
    const grid = document.getElementById(gridId);
    
    if (grid) {
        const items = grid.querySelectorAll('.filter-item');
        items.forEach(item => {
            const name = item.querySelector('.filter-name').textContent.toLowerCase();
            if (name.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
}

// Handle option selection (for version and group)
function handleOptionSelect(e) {
    const filterType = e.target.dataset.filterType;
    const value = e.target.dataset.value;
    
    // Toggle selection
    if (selectedFilters[filterType].includes(value)) {
        selectedFilters[filterType] = selectedFilters[filterType].filter(v => v !== value);
        e.target.classList.remove('selected');
    } else {
        selectedFilters[filterType].push(value);
        e.target.classList.add('selected');
    }
    
    // Update active filters
    updateActiveFilters();
    renderSelectedFilters();
    
    // Reset to page 1 when applying filters
    if (activeTab === 'videos') currentVideoPage = 1;
    if (activeTab === 'albums') currentAlbumPage = 1;
    if (activeTab === 'pictures') currentPicturePage = 1;
    
    renderCurrentTab();
    updatePagination();
}

// Handle filter item selection
function selectFilterItem(filterType, value, displayName) {
    // Toggle selection
    if (selectedFilters[filterType].includes(value)) {
        selectedFilters[filterType] = selectedFilters[filterType].filter(v => v !== value);
    } else {
        selectedFilters[filterType].push(value);
    }
    
    // Reset to page 1 when applying filters
    if (activeTab === 'videos') currentVideoPage = 1;
    if (activeTab === 'albums') currentAlbumPage = 1;
    if (activeTab === 'pictures') currentPicturePage = 1;
    
    // Update active filters
    updateActiveFilters();
    renderSelectedFilters();
    renderFilterItems(filterType, true); // Keep shuffled order when updating
    renderCurrentTab();
    updatePagination();
}

// Remove selected filter
function removeSelectedFilter(filterType, value) {
    selectedFilters[filterType] = selectedFilters[filterType].filter(v => v !== value);
    
    // Reset to page 1 when removing filters
    if (activeTab === 'videos') currentVideoPage = 1;
    if (activeTab === 'albums') currentAlbumPage = 1;
    if (activeTab === 'pictures') currentPicturePage = 1;
    
    // Update UI
    if (filterType === 'version' || filterType === 'group') {
        document.querySelectorAll(`.option-item[data-filter-type="${filterType}"][data-value="${value}"]`).forEach(item => {
            item.classList.remove('selected');
        });
    }
    
    // Also update filter modal items if they exist
    const filterItems = document.querySelectorAll(`.filter-item[data-value="${value}"]`);
    filterItems.forEach(item => {
        item.classList.remove('selected');
    });
    
    updateActiveFilters();
    renderSelectedFilters();
    renderFilterItems(filterType, true); // Keep shuffled order when updating
    renderCurrentTab();
    updatePagination();
}

// Update active filters from selectedFilters
function updateActiveFilters() {
    activeFilters = [];
    
    Object.keys(selectedFilters).forEach(filterType => {
        selectedFilters[filterType].forEach(value => {
            let displayName = value;
            
            // Convert value to display name
            if (filterType === 'version') {
                displayName = value.charAt(0).toUpperCase() + value.slice(1);
            } else if (filterType === 'group') {
                displayName = value.charAt(0).toUpperCase() + value.slice(1);
            }
            
            activeFilters.push(`${filterType.charAt(0).toUpperCase() + filterType.slice(1)}: ${displayName}`);
        });
    });
    
    renderActiveFilters();
}

// Add a filter to active filters
function addFilter(filterText) {
    if (!activeFilters.includes(filterText)) {
        activeFilters.push(filterText);
        renderActiveFilters();
    }
}

// Remove a filter
function removeFilter(filterText) {
    // Parse filter type and value from filterText
    const match = filterText.match(/^(\w+):\s*(.+)$/);
    if (match) {
        const filterType = match[1].toLowerCase();
        let value = match[2];
        
        // Convert display name back to stored value for version/group
        if (filterType === 'version' || filterType === 'group') {
            value = value.toLowerCase();
        }
        
        // Remove from selectedFilters
        if (selectedFilters[filterType]) {
            selectedFilters[filterType] = selectedFilters[filterType].filter(v => v !== value);
            
            // Update UI
            if (filterType === 'version' || filterType === 'group') {
                document.querySelectorAll(`.option-item[data-filter-type="${filterType}"][data-value="${value}"]`).forEach(item => {
                    item.classList.remove('selected');
                });
            }
            
            // Also update filter modal items if they exist
            const filterItems = document.querySelectorAll(`.filter-item[data-value="${value}"]`);
            filterItems.forEach(item => {
                item.classList.remove('selected');
            });
        }
    }
    
    // Reset to page 1 when removing filters
    if (activeTab === 'videos') currentVideoPage = 1;
    if (activeTab === 'albums') currentAlbumPage = 1;
    if (activeTab === 'pictures') currentPicturePage = 1;
    
    activeFilters = activeFilters.filter(filter => filter !== filterText);
    renderActiveFilters();
    renderSelectedFilters();
    renderCurrentTab();
    updatePagination();
}

// Render active filters
function renderActiveFilters() {
    activeFiltersContainer.innerHTML = '';
    
    activeFilters.forEach(filter => {
        const filterElement = document.createElement('div');
        filterElement.className = 'filter-tag';
        filterElement.innerHTML = `
            <span>${filter}</span>
            <span class="remove" onclick="removeFilter('${filter.replace(/'/g, "\\'")}')">
                <i class="fas fa-times"></i>
            </span>
        `;
        activeFiltersContainer.appendChild(filterElement);
    });
    
    // Show/hide filter container
    if (activeFilters.length === 0) {
        activeFiltersContainer.style.display = 'none';
    } else {
        activeFiltersContainer.style.display = 'flex';
    }
}

// Render selected filters in filter modal
function renderSelectedFilters() {
    selectedFiltersContainer.innerHTML = '';
    
    let hasSelectedFilters = false;
    
    Object.keys(selectedFilters).forEach(filterType => {
        if (selectedFilters[filterType].length > 0) {
            hasSelectedFilters = true;
            
            selectedFilters[filterType].forEach(value => {
                let displayName = value;
                
                // Convert value to display name
                if (filterType === 'version') {
                    displayName = value.charAt(0).toUpperCase() + value.slice(1);
                } else if (filterType === 'group') {
                    displayName = value.charAt(0).toUpperCase() + value.slice(1);
                }
                
                const filterItem = document.createElement('div');
                filterItem.className = 'selected-filter-item';
                filterItem.innerHTML = `
                    <span>${filterType.charAt(0).toUpperCase() + filterType.slice(1)}: ${displayName}</span>
                    <button class="remove-selected" data-filter-type="${filterType}" data-value="${value}">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                
                filterItem.querySelector('.remove-selected').addEventListener('click', () => {
                    removeSelectedFilter(filterType, value);
                });
                
                selectedFiltersContainer.appendChild(filterItem);
            });
        }
    });
    
    // Show/hide selected filters section
    selectedFiltersContainer.style.display = hasSelectedFilters ? 'flex' : 'none';
}

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Render filter items for a specific filter type with shuffling
function renderFilterItems(filterType, shouldShuffle = false) {
    const gridId = `${filterType}Grid`;
    const grid = document.getElementById(gridId);
    
    if (!grid) return;
    
    grid.innerHTML = '';
    
    // Get selected items for this filter type
    const selectedItems = selectedFilters[filterType] || [];
    
    // Get the filter data
    let filterItems = [];
    if (filterData[filterType]) {
        filterItems = [...filterData[filterType]];
    }
    
    // Shuffle the filter items if requested
    if (shouldShuffle) {
        filterItems = shuffleArray(filterItems);
    }
    
    // Render selected items first (pinned to top)
    selectedItems.forEach(value => {
        const itemData = filterItems.find(item => item.name === value);
        if (itemData) {
            const item = createFilterItem(filterType, itemData, true);
            grid.appendChild(item);
        }
    });
    
    // Render non-selected items
    filterItems.forEach(itemData => {
        if (!selectedItems.includes(itemData.name)) {
            const item = createFilterItem(filterType, itemData, false);
            grid.appendChild(item);
        }
    });
}

// Create a filter item element with proper images
function createFilterItem(filterType, itemData, isSelected) {
    const item = document.createElement('div');
    item.className = `filter-item ${isSelected ? 'selected' : ''}`;
    item.dataset.value = itemData.name;
    
    // Set aspect ratio based on filter type
    let aspectRatio = '1/1';
    if (filterType === 'actress') aspectRatio = '2/3';
    if (filterType === 'tokens') aspectRatio = '3/2';
    if (filterType === 'series') aspectRatio = '16/9';
    
    item.innerHTML = `
        <img src="${itemData.image}" alt="${itemData.name}" class="filter-image" style="--ratio: ${aspectRatio};" onerror="this.onerror=null; this.src='https://via.placeholder.com/300x300/7c3aed/ffffff?text=${encodeURIComponent(itemData.name)}'">
        <div class="filter-name">${itemData.name}</div>
    `;
    
    item.addEventListener('click', () => {
        selectFilterItem(filterType, itemData.name, itemData.name);
    });
    
    return item;
}

// Load filter data with shuffling option
function loadFilterData(shouldShuffle = false) {
    // Load all filter types
    Object.keys(filterData).forEach(filterType => {
        renderFilterItems(filterType, shouldShuffle);
    });
    
    // Render selected filters
    renderSelectedFilters();
}

// Open filter modal with shuffled options
function openFilterModal() {
    // Shuffle filter options when opening the modal
    // Shuffle each filter type independently
    Object.keys(filterData).forEach(filterType => {
        renderFilterItems(filterType, true); // true = shuffle
    });
    openModal(filterModal);
}

// Change page
function changePage(contentType, direction) {
    if (contentType === 'videos') {
        currentVideoPage += direction;
        loadVideos();
    } else if (contentType === 'albums') {
        currentAlbumPage += direction;
        loadAlbums();
    } else if (contentType === 'pictures') {
        currentPicturePage += direction;
        loadPictures();
    }
    
    updatePagination();
    
    // Scroll to top of content
    const section = document.getElementById(`${contentType}Section`);
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Update pagination buttons and display
function updatePagination() {
    // Calculate total pages for each content type
    const totalVideoPages = Math.ceil(getFilteredVideos().length / itemsPerPage.videos);
    const totalAlbumPages = Math.ceil(getFilteredAlbums().length / itemsPerPage.albums);
    const totalPicturePages = Math.ceil(getFilteredPictures().length / itemsPerPage.pictures);
    
    // Update video pagination
    videosPageNumber.textContent = currentVideoPage;
    videosPrevBtn.disabled = currentVideoPage <= 1;
    videosNextBtn.disabled = currentVideoPage >= totalVideoPages;
    
    // Update album pagination
    albumsPageNumber.textContent = currentAlbumPage;
    albumsPrevBtn.disabled = currentAlbumPage <= 1;
    albumsNextBtn.disabled = currentAlbumPage >= totalAlbumPages;
    
    // Update picture pagination
    picturesPageNumber.textContent = currentPicturePage;
    picturesPrevBtn.disabled = currentPicturePage <= 1;
    picturesNextBtn.disabled = currentPicturePage >= totalPicturePages;
}

// Get filtered videos with AND logic - FIXED to apply all filter types
function getFilteredVideos() {
    let filteredVideos = [...videoData];
    
    // Apply search filter if present
    if (currentSearchTerm) {
        filteredVideos = filteredVideos.filter(video => 
            video.title.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
            video.actress.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
            video.code.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
            video.tags.some(tag => tag.toLowerCase().includes(currentSearchTerm.toLowerCase()))
        );
    }
    
    // Apply ALL selected filters with AND logic
    Object.keys(selectedFilters).forEach(filterType => {
        if (selectedFilters[filterType].length > 0) {
            filteredVideos = filteredVideos.filter(video => {
                if (filterType === 'actress') {
                    // Split actress string by comma and check if any matches
                    const videoActresses = video.actress.split(',').map(a => a.trim());
                    return videoActresses.some(actress => 
                        selectedFilters[filterType].includes(actress)
                    );
                } else if (filterType === 'tags') {
                    return selectedFilters[filterType].some(tag => video.tags.includes(tag));
                } else if (filterType === 'studios') {
                    return selectedFilters[filterType].includes(video.studio);
                } else if (filterType === 'tokens') {
                    return selectedFilters[filterType].includes(video.token);
                } else if (filterType === 'series') {
                    return selectedFilters[filterType].includes(video.series);
                } else if (filterType === 'version') {
                    return selectedFilters[filterType].includes(video.version);
                } else if (filterType === 'group') {
                    return selectedFilters[filterType].includes(video.group.toLowerCase());
                }
                return true;
            });
        }
    });
    
    return filteredVideos;
}

// Get filtered albums with AND logic - FIXED to apply ALL relevant filters
function getFilteredAlbums() {
    let filteredAlbums = [...albumData];
    
    // Apply search filter if present
    if (currentSearchTerm) {
        filteredAlbums = filteredAlbums.filter(album => 
            album.title.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
            album.actress.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
            album.tags.some(tag => tag.toLowerCase().includes(currentSearchTerm.toLowerCase()))
        );
    }
    
    // Apply ALL selected filters with AND logic
    Object.keys(selectedFilters).forEach(filterType => {
        if (selectedFilters[filterType].length > 0) {
            filteredAlbums = filteredAlbums.filter(album => {
                if (filterType === 'actress') {
                    // Split actress string by comma and check if any matches
                    const albumActresses = album.actress.split(',').map(a => a.trim());
                    return albumActresses.some(actress => 
                        selectedFilters[filterType].includes(actress)
                    );
                } else if (filterType === 'tags') {
                    return selectedFilters[filterType].some(tag => album.tags.includes(tag));
                }
                // Note: Other filter types (studios, tokens, series, version, group) 
                // don't apply to albums, so return true for those
                return true;
            });
        }
    });
    
    return filteredAlbums;
}

// Get filtered pictures with AND logic - FIXED to apply ALL relevant filters
function getFilteredPictures() {
    let filteredPictures = [...pictureData];
    
    // Apply search filter if present
    if (currentSearchTerm) {
        filteredPictures = filteredPictures.filter(picture => 
            (picture.actress && picture.actress.toLowerCase().includes(currentSearchTerm.toLowerCase())) ||
            picture.tags.some(tag => tag.toLowerCase().includes(currentSearchTerm.toLowerCase()))
        );
    }
    
    // Apply ALL selected filters with AND logic
    Object.keys(selectedFilters).forEach(filterType => {
        if (selectedFilters[filterType].length > 0) {
            filteredPictures = filteredPictures.filter(picture => {
                if (filterType === 'actress') {
                    if (!picture.actress) return false;
                    const pictureActresses = picture.actress.split(',').map(a => a.trim());
                    return pictureActresses.some(actress => 
                        selectedFilters[filterType].includes(actress)
                    );
                } else if (filterType === 'tags') {
                    return selectedFilters[filterType].some(tag => picture.tags.includes(tag));
                }
                // Note: Other filter types (studios, tokens, series, version, group) 
                // don't apply to pictures, so return true for those
                return true;
            });
        }
    });
    
    return filteredPictures;
}

// Sort items based on currentSort
function sortItems(items, contentType) {
    const sortedItems = [...items];
    
    switch(currentSort) {
        case 'shuffle':
            // Fisher-Yates shuffle algorithm
            for (let i = sortedItems.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [sortedItems[i], sortedItems[j]] = [sortedItems[j], sortedItems[i]];
            }
            break;
            
        case 'latest':
            if (contentType === 'videos' || contentType === 'albums') {
                sortedItems.sort((a, b) => new Date(b.release) - new Date(a.release));
            } else {
                sortedItems.sort((a, b) => b.id - a.id);
            }
            break;
            
        case 'oldest':
            if (contentType === 'videos' || contentType === 'albums') {
                sortedItems.sort((a, b) => new Date(a.release) - new Date(b.release));
            } else {
                sortedItems.sort((a, b) => a.id - b.id);
            }
            break;
            
        case 'top-rated':
            if (contentType === 'videos') {
                sortedItems.sort((a, b) => b.rating - a.rating);
            } else if (contentType === 'albums') {
                sortedItems.sort((a, b) => b.pages - a.pages);
            } else {
                sortedItems.sort((a, b) => a.id - b.id);
            }
            break;
            
        case 'most-viewed':
        default:
            if (contentType === 'videos') {
                sortedItems.sort((a, b) => b.views - a.views);
            } else if (contentType === 'albums') {
                sortedItems.sort((a, b) => b.pages - a.pages);
            } else {
                sortedItems.sort((a, b) => a.id - b.id);
            }
            break;
    }
    
    return sortedItems;
}

// Render current tab content based on filters and sort
function renderCurrentTab() {
    switch(activeTab) {
        case 'videos':
            loadVideos();
            break;
        case 'albums':
            loadAlbums();
            break;
        case 'pictures':
            loadPictures();
            break;
    }
}

// Load videos into the grid with updated video card layout
function loadVideos() {
    videosGrid.innerHTML = '';
    
    // Get filtered and sorted videos
    let filteredVideos = getFilteredVideos();
    filteredVideos = sortItems(filteredVideos, 'videos');
    
    // Calculate start and end indices for current page
    const startIndex = (currentVideoPage - 1) * itemsPerPage.videos;
    const endIndex = startIndex + itemsPerPage.videos;
    const pageVideos = filteredVideos.slice(startIndex, endIndex);
    
    // Create video cards with updated layout
    pageVideos.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        videoCard.innerHTML = `
            <img src="${video.thumbnail}" alt="${video.title}" class="video-thumbnail" onerror="this.onerror=null; this.src='https://via.placeholder.com/300x200/7c3aed/ffffff?text=Thumbnail'">
            <div class="video-info">
                <h3 class="video-title">${video.title}</h3>
                <div class="video-meta">
                    <div class="video-meta-item">
                        <i class="fas fa-hashtag"></i>
                        <span>${video.code}</span>
                    </div>
                    <div class="video-meta-item">
                        <i class="fas fa-layer-group"></i>
                        <span>${video.version}</span>
                    </div>
                    <div class="video-meta-item">
                        <i class="fas fa-clock"></i>
                        <span>${video.duration} min</span>
                    </div>
                    <div class="video-meta-item">
                        <i class="fas fa-star"></i>
                        <span>${video.rating.toFixed(1)}</span>
                    </div>
                </div>
            </div>
        `;
        
        videoCard.addEventListener('click', () => openVideoModal(video));
        videosGrid.appendChild(videoCard);
    });
    
    // Show empty state if no videos
    if (pageVideos.length === 0) {
        videosGrid.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--text-secondary); grid-column: 1 / -1;">
                <i class="fas fa-video-slash" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <h3>No videos found</h3>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
    }
}

// Load albums into the grid
function loadAlbums() {
    albumsGrid.innerHTML = '';
    
    // Get filtered and sorted albums
    let filteredAlbums = getFilteredAlbums();
    filteredAlbums = sortItems(filteredAlbums, 'albums');
    
    // Calculate start and end indices for current page
    const startIndex = (currentAlbumPage - 1) * itemsPerPage.albums;
    const endIndex = startIndex + itemsPerPage.albums;
    const pageAlbums = filteredAlbums.slice(startIndex, endIndex);
    
    // Create album cards
    pageAlbums.forEach(album => {
        const albumCard = document.createElement('div');
        albumCard.className = 'album-card';
        albumCard.innerHTML = `
            <img src="${album.cover}" alt="${album.title}" class="album-cover" onerror="this.onerror=null; this.src='https://via.placeholder.com/300x400/8b5cf6/ffffff?text=Album'">
            <div class="album-info">
                <h3 class="album-title">${album.title}</h3>
            </div>
        `;
        
        albumCard.addEventListener('click', () => openAlbumModal(album));
        albumsGrid.appendChild(albumCard);
    });
    
    // Show empty state if no albums
    if (pageAlbums.length === 0) {
        albumsGrid.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--text-secondary); grid-column: 1 / -1;">
                <i class="fas fa-book-open" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <h3>No albums found</h3>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
    }
}

// Load pictures into the grid
function loadPictures() {
    picturesGrid.innerHTML = '';
    
    // Get filtered and sorted pictures
    let filteredPictures = getFilteredPictures();
    filteredPictures = sortItems(filteredPictures, 'pictures');
    
    // Calculate start and end indices for current page
    const startIndex = (currentPicturePage - 1) * itemsPerPage.pictures;
    const endIndex = startIndex + itemsPerPage.pictures;
    const pagePictures = filteredPictures.slice(startIndex, endIndex);
    
    // Create picture cards
    pagePictures.forEach(picture => {
        const pictureCard = document.createElement('div');
        pictureCard.className = 'picture-card';
        pictureCard.innerHTML = `
            <img src="${picture.image}" alt="Picture ${picture.id}" class="picture-img" onerror="this.onerror=null; this.src='https://via.placeholder.com/300x375/a78bfa/ffffff?text=Picture'">
        `;
        
        pictureCard.addEventListener('click', () => openImageModal(picture));
        picturesGrid.appendChild(pictureCard);
    });
    
    // Show empty state if no pictures
    if (pagePictures.length === 0) {
        picturesGrid.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--text-secondary); grid-column: 1 / -1;">
                <i class="fas fa-image" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <h3>No pictures found</h3>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
    }
}

// Get videos featuring the same actress(es)
function getAlsoStarredVideos(currentVideo) {
    const currentActresses = currentVideo.actress.split(',').map(a => a.trim());
    const allVideos = [...videoData];
    
    // Filter out the current video
    const otherVideos = allVideos.filter(video => video.id !== currentVideo.id);
    
    // Find videos with matching actresses
    const matchingVideos = otherVideos.filter(video => {
        const videoActresses = video.actress.split(',').map(a => a.trim());
        return videoActresses.some(actress => currentActresses.includes(actress));
    });
    
    // Sort by number of matching actresses, then by views
    matchingVideos.sort((a, b) => {
        const aActresses = a.actress.split(',').map(act => act.trim());
        const bActresses = b.actress.split(',').map(act => act.trim());
        
        const aMatches = aActresses.filter(act => currentActresses.includes(act)).length;
        const bMatches = bActresses.filter(act => currentActresses.includes(act)).length;
        
        if (bMatches !== aMatches) {
            return bMatches - aMatches;
        }
        
        return b.views - a.views;
    });
    
    // Return up to 10 videos
    return matchingVideos.slice(0, 10);
}

// Get videos with similar tags
function getYouMayLikeVideos(currentVideo) {
    const allVideos = [...videoData];
    
    // Filter out the current video
    const otherVideos = allVideos.filter(video => video.id !== currentVideo.id);
    
    // Calculate tag similarity score
    const videosWithScore = otherVideos.map(video => {
        const commonTags = video.tags.filter(tag => currentVideo.tags.includes(tag)).length;
        const totalTags = new Set([...video.tags, ...currentVideo.tags]).size;
        const similarityScore = totalTags > 0 ? commonTags / totalTags : 0;
        
        return {
            ...video,
            similarityScore
        };
    });
    
    // Sort by similarity score, then by views
    videosWithScore.sort((a, b) => {
        if (b.similarityScore !== a.similarityScore) {
            return b.similarityScore - a.similarityScore;
        }
        return b.views - a.views;
    });
    
    // Return up to 10 videos
    return videosWithScore.slice(0, 10).map(video => {
        const { similarityScore, ...videoData } = video;
        return videoData;
    });
}

// Setup carousel touch support
function setupCarouselTouch() {
    const carousels = [alsoStarredCarousel, youMayLikeCarousel];
    
    carousels.forEach(carousel => {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            carousel.classList.add('active');
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });
        
        carousel.addEventListener('mouseleave', () => {
            isDown = false;
            carousel.classList.remove('active');
        });
        
        carousel.addEventListener('mouseup', () => {
            isDown = false;
            carousel.classList.remove('active');
        });
        
        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });
        
        // Touch events for mobile
        carousel.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });
        
        carousel.addEventListener('touchend', () => {
            isDown = false;
        });
        
        carousel.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });
    });
}

// Scroll carousel
function scrollCarousel(carouselId, direction) {
    const carousel = carouselId === 'alsoStarred' ? alsoStarredCarousel : youMayLikeCarousel;
    const scrollAmount = 300;
    
    carousel.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

// Load suggestion carousels
function loadSuggestionCarousels(video) {
    // Clear existing content
    alsoStarredCarousel.innerHTML = '';
    youMayLikeCarousel.innerHTML = '';
    
    // Get suggested videos
    const alsoStarredVideos = getAlsoStarredVideos(video);
    const youMayLikeVideos = getYouMayLikeVideos(video);
    
    // Load "Also Starred In" carousel
    if (alsoStarredVideos.length > 0) {
        alsoStarredVideos.forEach(suggestedVideo => {
            const carouselItem = document.createElement('div');
            carouselItem.className = 'carousel-item poster';
            carouselItem.innerHTML = `
                <img src="${suggestedVideo.poster}" alt="${suggestedVideo.title}" onerror="this.onerror=null; this.src='https://via.placeholder.com/300x450/7c3aed/ffffff?text=Poster'">
                <div class="carousel-code">${suggestedVideo.code}</div>
            `;
            
            carouselItem.addEventListener('click', () => {
                closeModal(videoModal);
                setTimeout(() => openVideoModal(suggestedVideo), 100);
            });
            
            alsoStarredCarousel.appendChild(carouselItem);
        });
    } else {
        alsoStarredCarousel.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--text-secondary); width: 100%;">
                <p>No other videos with the same actress(es)</p>
            </div>
        `;
    }
    
    // Load "You May Also Like" carousel
    if (youMayLikeVideos.length > 0) {
        youMayLikeVideos.forEach(suggestedVideo => {
            const carouselItem = document.createElement('div');
            carouselItem.className = 'carousel-item thumbnail';
            carouselItem.innerHTML = `
                <img src="${suggestedVideo.thumbnail}" alt="${suggestedVideo.title}" onerror="this.onerror=null; this.src='https://via.placeholder.com/300x200/7c3aed/ffffff?text=Thumbnail'">
                <div class="carousel-code">${suggestedVideo.code}</div>
            `;
            
            carouselItem.addEventListener('click', () => {
                closeModal(videoModal);
                setTimeout(() => openVideoModal(suggestedVideo), 100);
            });
            
            youMayLikeCarousel.appendChild(carouselItem);
        });
    } else {
        youMayLikeCarousel.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--text-secondary); width: 100%;">
                <p>No similar videos found</p>
            </div>
        `;
    }
}

// Open video modal with real images
function openVideoModal(video) {
    // Store current video for suggestions
    currentVideoForSuggestions = video;
    
    // Reset video player state
    isVideoPlaying = false;
    currentVideoPlayerType = null;
    
    // Reset video player UI
    modalThumb.style.display = 'block';
    videoPlayer.style.display = 'none';
    videoFrame.src = '';
    
    // Reset preview page
    closePreviewPage();
    
    // Update modal content with video details
    modalTitle.textContent = video.title;
    modalDesc.textContent = video.description;
    modalCode.textContent = video.code;
    
    // Set thumbnail and poster images
    modalThumb.src = video.thumbnail;
    modalThumb.alt = video.title;
    modalThumb.onerror = function() {
        this.onerror = null;
        this.src = 'https://via.placeholder.com/600x400/7c3aed/ffffff?text=Video+Thumbnail';
    };
    
    modalPoster.src = video.poster;
    modalPoster.alt = video.title;
    modalPoster.onerror = function() {
        this.onerror = null;
        this.src = 'https://via.placeholder.com/300x450/7c3aed/ffffff?text=Video+Poster';
    };
    
    // Set other details
    modalRating.textContent = video.rating.toFixed(1);
    modalStudio.textContent = video.studio;
    modalLabel.textContent = video.label;
    modalRelease.textContent = video.release;
    modalDuration.textContent = video.duration;
    modalVersions.textContent = video.version;
    modalGroup.textContent = video.group;
    modalViews.textContent = video.views.toLocaleString();
    modalSeries.textContent = video.series;
    
    // Reset description toggle
    modalDesc.classList.remove('expanded');
    toggleDesc.textContent = 'Show More';
    
    // Clear and add tags (clickable for filtering)
    modalTags.innerHTML = '';
    if (video.tags && video.tags.length > 0) {
        video.tags.forEach(tag => {
            const tagElement = document.createElement('div');
            tagElement.className = 'tag';
            tagElement.textContent = tag;
            tagElement.addEventListener('click', () => {
                selectFilterItem('tags', tag, tag);
                closeModal(videoModal);
            });
            modalTags.appendChild(tagElement);
        });
    }
    
    // Clear and add actress with centralized images
    modalActress.innerHTML = '';
    if (video.actress) {
        // Split actress string by comma
        const actressNames = video.actress.split(',').map(name => name.trim());
        
        actressNames.forEach(actressName => {
            // Find actress image from filter data
            const actressData = filterData.actress.find(a => a.name === actressName);
            const actressImg = actressData ? actressData.image : '';
            
            const actressElement = document.createElement('div');
            actressElement.className = 'actress';
            
            const actressImgElement = document.createElement('img');
            actressImgElement.src = actressImg;
            actressImgElement.alt = actressName;
            actressImgElement.onerror = function() {
                this.onerror = null;
                this.src = 'https://via.placeholder.com/200x300/7c3aed/ffffff?text=' + encodeURIComponent(actressName);
            };
            
            const actressNameElement = document.createElement('span');
            actressNameElement.textContent = actressName;
            
            actressElement.appendChild(actressImgElement);
            actressElement.appendChild(actressNameElement);
            
            actressElement.addEventListener('click', () => {
                selectFilterItem('actress', actressName, actressName);
                closeModal(videoModal);
            });
            
            modalActress.appendChild(actressElement);
        });
    }
    
    // Set up filter functionality for clickable elements
    modalSeries.addEventListener('click', () => {
        selectFilterItem('series', video.series, video.series);
        closeModal(videoModal);
    });
    
    modalStudio.addEventListener('click', () => {
        selectFilterItem('studios', video.studio, video.studio);
        closeModal(videoModal);
    });
    
    modalLabel.addEventListener('click', () => {
        addFilter(`Label: ${video.label}`);
        closeModal(videoModal);
    });
    
    modalVersions.addEventListener('click', () => {
        selectFilterItem('version', video.version, video.version);
        closeModal(videoModal);
    });
    
    modalGroup.addEventListener('click', () => {
        selectFilterItem('group', video.group.toLowerCase(), video.group);
        closeModal(videoModal);
    });
    
    // Clear and add preview images for preview page
    previewImagesFull.innerHTML = '';
    if (video.previews && video.previews.length > 0) {
        video.previews.forEach((preview, index) => {
            const previewImage = document.createElement('div');
            previewImage.className = 'preview-image-full';
            
            previewImage.innerHTML = `
                <img src="${preview}" alt="Preview ${index + 1}" onerror="this.onerror=null; this.src='https://via.placeholder.com/600x338/7c3aed/ffffff?text=Preview'">
            `;
            
            previewImagesFull.appendChild(previewImage);
        });
    } else {
        previewImagesFull.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--text-secondary);">
                <i class="fas fa-image" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <h3>No preview images available</h3>
            </div>
        `;
    }
    
    // Load suggestion carousels
    loadSuggestionCarousels(video);
    
    // Open modal
    openModal(videoModal);
}

// Open album modal with new structure
function openAlbumModal(album) {
    // Update modal content with album details
    albumModalTitle.textContent = album.title;
    
    // Clear and add tags (clickable for filtering)
    albumModalTags.innerHTML = '';
    if (album.tags && album.tags.length > 0) {
        album.tags.forEach(tag => {
            const tagElement = document.createElement('div');
            tagElement.className = 'tag';
            tagElement.textContent = tag;
            tagElement.addEventListener('click', () => {
                selectFilterItem('tags', tag, tag);
                closeModal(albumModal);
            });
            albumModalTags.appendChild(tagElement);
        });
    }
    
    // Clear and add actress with centralized images
    albumModalActress.innerHTML = '';
    if (album.actress) {
        // Split actress string by comma
        const actressNames = album.actress.split(',').map(name => name.trim());
        
        actressNames.forEach(actressName => {
            // Find actress image from filter data
            const actressData = filterData.actress.find(a => a.name === actressName);
            const actressImg = actressData ? actressData.image : '';
            
            const actressElement = document.createElement('div');
            actressElement.className = 'actress';
            
            const actressImgElement = document.createElement('img');
            actressImgElement.src = actressImg;
            actressImgElement.alt = actressName;
            actressImgElement.onerror = function() {
                this.onerror = null;
                this.src = 'https://via.placeholder.com/200x300/8b5cf6/ffffff?text=' + encodeURIComponent(actressName);
            };
            
            const actressNameElement = document.createElement('span');
            actressNameElement.textContent = actressName;
            
            actressElement.appendChild(actressImgElement);
            actressElement.appendChild(actressNameElement);
            
            actressElement.addEventListener('click', () => {
                selectFilterItem('actress', actressName, actressName);
                closeModal(albumModal);
            });
            
            albumModalActress.appendChild(actressElement);
        });
    }
    
    // Set image count (including cover image)
    const totalImages = album.albumImages ? album.albumImages.length + 1 : 1;
    albumModalImageCount.textContent = `${totalImages} images (including cover)`;
    
    // Set cover image
    albumMainCover.src = album.cover;
    albumMainCover.alt = album.title;
    albumMainCover.onerror = function() {
        this.onerror = null;
        this.src = 'https://via.placeholder.com/600x800/8b5cf6/ffffff?text=Album+Cover';
    };
    
    // Clear and add album images (full width, no cropping)
    albumImagesContainer.innerHTML = '';
    if (album.albumImages && album.albumImages.length > 0) {
        album.albumImages.forEach((image, index) => {
            const albumImage = document.createElement('div');
            albumImage.className = 'album-image';
            
            albumImage.innerHTML = `
                <img src="${image}" alt="Album Image ${index + 1}" onerror="this.onerror=null; this.src='https://via.placeholder.com/600x338/8b5cf6/ffffff?text=Album+Image'">
            `;
            
            albumImagesContainer.appendChild(albumImage);
        });
    }
    
    // Open modal
    openModal(albumModal);
}

// Open image modal with real image
function openImageModal(picture) {
    // Set the image
    fullscreenImage.src = picture.image;
    fullscreenImage.alt = `Picture ${picture.id}`;
    fullscreenImage.onerror = function() {
        this.onerror = null;
        this.src = 'https://via.placeholder.com/800x1000/a78bfa/ffffff?text=Fullscreen+Image';
    };
    
    openModal(imageModal);
}

// Show notification (for demo purposes)
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.backgroundColor = 'var(--primary)';
    notification.style.color = 'white';
    notification.style.padding = '0.75rem 1.5rem';
    notification.style.borderRadius = '50px';
    notification.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    notification.style.zIndex = '10000';
    notification.style.fontFamily = "'Rubik', sans-serif";
    notification.style.fontWeight = '500';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Make functions available globally for inline onclick handlers
window.removeFilter = removeFilter;
