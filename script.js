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

// Track video player state
let isVideoPlaying = false;
let currentVideoPlayerType = null;

// Store event listeners to prevent duplicates
let modalEventListenersAttached = false;

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

// Initialize the app
function init() {
    console.log('Initializing app...');
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            currentTheme = 'dark';
        }
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
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
    loadFilterData();
    loadVideos();
    loadAlbums();
    loadPictures();
    
    // Set up event listeners
    setupEventListeners();
    
    // Update pagination displays
    updatePagination();
    
    console.log('App initialized');
}

// Set up all event listeners
function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Theme toggle
    if (themeToggle) {
        themeToggle.removeEventListener('click', toggleTheme);
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Search
    if (searchInput) {
        searchInput.removeEventListener('input', handleSearch);
        searchInput.removeEventListener('keypress', handleSearchKeyPress);
        searchInput.addEventListener('input', handleSearch);
        searchInput.addEventListener('keypress', handleSearchKeyPress);
    }
    
    // Sort menu
    if (sortBtn) {
        sortBtn.removeEventListener('click', toggleSortMenu);
        sortBtn.addEventListener('click', toggleSortMenu);
    }
    
    document.querySelectorAll('.sort-option').forEach(option => {
        option.removeEventListener('click', handleSortChange);
        option.addEventListener('click', handleSortChange);
    });
    
    // Tabs
    tabs.forEach(tab => {
        tab.removeEventListener('click', handleTabChange);
        tab.addEventListener('click', handleTabChange);
    });
    
    // Modals
    if (filtersBtn) {
        filtersBtn.removeEventListener('click', openFilterModal);
        filtersBtn.addEventListener('click', openFilterModal);
    }
    
    if (closeVideoModal) {
        closeVideoModal.removeEventListener('click', closeVideoModalHandler);
        closeVideoModal.addEventListener('click', closeVideoModalHandler);
    }
    
    if (closeFilterModal) {
        closeFilterModal.removeEventListener('click', closeFilterModalHandler);
        closeFilterModal.addEventListener('click', closeFilterModalHandler);
    }
    
    if (closeAlbumModal) {
        closeAlbumModal.removeEventListener('click', closeAlbumModalHandler);
        closeAlbumModal.addEventListener('click', closeAlbumModalHandler);
    }
    
    if (closeImageModal) {
        closeImageModal.removeEventListener('click', closeImageModalHandler);
        closeImageModal.addEventListener('click', closeImageModalHandler);
    }
    
    // Close modals when clicking outside
    [videoModal, filterModal, albumModal, imageModal].forEach(modal => {
        if (modal) {
            modal.removeEventListener('click', modalOutsideClick);
            modal.addEventListener('click', modalOutsideClick);
        }
    });
    
    // Close sort menu when clicking outside
    document.removeEventListener('click', documentClickHandler);
    document.addEventListener('click', documentClickHandler);
    
    // Description toggle
    if (toggleDesc) {
        toggleDesc.removeEventListener('click', toggleDescription);
        toggleDesc.addEventListener('click', toggleDescription);
    }
    
    // Video controls
    if (previewBtn) {
        previewBtn.removeEventListener('click', openPreviewPage);
        previewBtn.addEventListener('click', openPreviewPage);
    }
    
    if (trailerBtn) {
        trailerBtn.removeEventListener('click', trailerClickHandler);
        trailerBtn.addEventListener('click', trailerClickHandler);
    }
    
    if (videoBtn) {
        videoBtn.removeEventListener('click', videoClickHandler);
        videoBtn.addEventListener('click', videoClickHandler);
    }
    
    // Preview page back button
    if (previewBackBtn) {
        previewBackBtn.removeEventListener('click', closePreviewPage);
        previewBackBtn.addEventListener('click', closePreviewPage);
    }
    
    // Carousel navigation
    if (alsoStarredPrev) {
        alsoStarredPrev.removeEventListener('click', alsoStarredPrevHandler);
        alsoStarredPrev.addEventListener('click', alsoStarredPrevHandler);
    }
    
    if (alsoStarredNext) {
        alsoStarredNext.removeEventListener('click', alsoStarredNextHandler);
        alsoStarredNext.addEventListener('click', alsoStarredNextHandler);
    }
    
    if (youMayLikePrev) {
        youMayLikePrev.removeEventListener('click', youMayLikePrevHandler);
        youMayLikePrev.addEventListener('click', youMayLikePrevHandler);
    }
    
    if (youMayLikeNext) {
        youMayLikeNext.removeEventListener('click', youMayLikeNextHandler);
        youMayLikeNext.addEventListener('click', youMayLikeNextHandler);
    }
    
    // Pagination
    if (videosPrevBtn) {
        videosPrevBtn.removeEventListener('click', videosPrevHandler);
        videosPrevBtn.addEventListener('click', videosPrevHandler);
    }
    
    if (videosNextBtn) {
        videosNextBtn.removeEventListener('click', videosNextHandler);
        videosNextBtn.addEventListener('click', videosNextHandler);
    }
    
    if (albumsPrevBtn) {
        albumsPrevBtn.removeEventListener('click', albumsPrevHandler);
        albumsPrevBtn.addEventListener('click', albumsPrevHandler);
    }
    
    if (albumsNextBtn) {
        albumsNextBtn.removeEventListener('click', albumsNextHandler);
        albumsNextBtn.addEventListener('click', albumsNextHandler);
    }
    
    if (picturesPrevBtn) {
        picturesPrevBtn.removeEventListener('click', picturesPrevHandler);
        picturesPrevBtn.addEventListener('click', picturesPrevHandler);
    }
    
    if (picturesNextBtn) {
        picturesNextBtn.removeEventListener('click', picturesNextHandler);
        picturesNextBtn.addEventListener('click', picturesNextHandler);
    }
    
    // Filter tabs
    filterTabs.forEach(tab => {
        tab.removeEventListener('click', handleFilterTabChange);
        tab.addEventListener('click', handleFilterTabChange);
    });
    
    // Filter search
    document.querySelectorAll('.filter-search-input').forEach(input => {
        input.removeEventListener('input', handleFilterSearch);
        input.addEventListener('input', handleFilterSearch);
    });
    
    // Option items
    document.querySelectorAll('.option-item').forEach(item => {
        item.removeEventListener('click', handleOptionSelect);
        item.addEventListener('click', handleOptionSelect);
    });
    
    // Touch support for carousels
    setupCarouselTouch();
    
    // Prevent poster click from resetting video player
    if (modalPoster) {
        modalPoster.removeEventListener('click', posterClickHandler);
        modalPoster.addEventListener('click', posterClickHandler);
    }
    
    // Also prevent thumbnail container click from resetting if video is playing
    if (videoThumbnailContainer) {
        videoThumbnailContainer.removeEventListener('click', thumbnailContainerClickHandler);
        videoThumbnailContainer.addEventListener('click', thumbnailContainerClickHandler);
    }
}

// Event handler functions to avoid creating new functions each time
function handleSearchKeyPress(e) {
    if (e.key === 'Enter') performSearch();
}

function closeVideoModalHandler() {
    closeModal(videoModal);
}

function closeFilterModalHandler() {
    closeModal(filterModal);
}

function closeAlbumModalHandler() {
    closeModal(albumModal);
}

function closeImageModalHandler() {
    closeModal(imageModal);
}

function modalOutsideClick(e) {
    if (e.target === this) closeModal(this);
}

function documentClickHandler(e) {
    if (sortBtn && sortMenu && !sortBtn.contains(e.target) && !sortMenu.contains(e.target)) {
        sortMenu.classList.remove('active');
    }
}

function trailerClickHandler() {
    playVideo('trailer');
}

function videoClickHandler() {
    playVideo('full');
}

function alsoStarredPrevHandler() {
    scrollCarousel('alsoStarred', -1);
}

function alsoStarredNextHandler() {
    scrollCarousel('alsoStarred', 1);
}

function youMayLikePrevHandler() {
    scrollCarousel('youMayLike', -1);
}

function youMayLikeNextHandler() {
    scrollCarousel('youMayLike', 1);
}

function videosPrevHandler() {
    changePage('videos', -1);
}

function videosNextHandler() {
    changePage('videos', 1);
}

function albumsPrevHandler() {
    changePage('albums', -1);
}

function albumsNextHandler() {
    changePage('albums', 1);
}

function picturesPrevHandler() {
    changePage('pictures', -1);
}

function picturesNextHandler() {
    changePage('pictures', 1);
}

function posterClickHandler(e) {
    e.stopPropagation();
}

function thumbnailContainerClickHandler(e) {
    if (isVideoPlaying && (e.target === videoPlayer || e.target === videoFrame || (videoPlayer && videoPlayer.contains(e.target)))) {
        e.stopPropagation();
    }
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
    if (modal) {
        modal.classList.add('active');
        disableBodyScroll();
    }
}

// Close modal with scroll enabling
function closeModal(modal) {
    if (modal) {
        modal.classList.remove('active');
        enableBodyScroll();
        
        // Reset video player state when closing video modal
        if (modal === videoModal) {
            resetVideoPlayer();
            currentVideoForSuggestions = null;
        }
    }
}

// Reset video player state
function resetVideoPlayer() {
    if (videoFrame) videoFrame.src = '';
    if (modalThumb) modalThumb.style.display = 'block';
    if (videoPlayer) videoPlayer.style.display = 'none';
    isVideoPlaying = false;
    currentVideoPlayerType = null;
}

// Toggle sort menu visibility
function toggleSortMenu() {
    if (sortMenu) sortMenu.classList.toggle('active');
}

// Handle sort option selection
function handleSortChange(e) {
    const sortValue = e.currentTarget.dataset.sort;
    
    // Update active sort option
    document.querySelectorAll('.sort-option').forEach(option => {
        option.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
    
    currentSort = sortValue;
    if (sortMenu) sortMenu.classList.remove('active');
    
    // Reset to page 1 when changing sort
    resetPageForActiveTab();
    
    // Re-render current tab content with new sort
    renderCurrentTab();
    updatePagination();
}

// Reset page to 1 for active tab
function resetPageForActiveTab() {
    if (activeTab === 'videos') currentVideoPage = 1;
    if (activeTab === 'albums') currentAlbumPage = 1;
    if (activeTab === 'pictures') currentPicturePage = 1;
}

// Handle tab switching
function handleTabChange(e) {
    const tabId = e.currentTarget.dataset.tab;
    
    // Update active tab
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
    
    // Show corresponding content section
    contentSections.forEach(section => {
        section.classList.remove('active');
    });
    const targetSection = document.getElementById(`${tabId}Section`);
    if (targetSection) targetSection.classList.add('active');
    
    activeTab = tabId;
    
    // Update pagination
    updatePagination();
}

// Handle search input
function handleSearch() {
    currentSearchTerm = searchInput.value.trim();
    
    // If search is cleared, reset content
    if (!currentSearchTerm) {
        resetPageForActiveTab();
        renderCurrentTab();
        updatePagination();
    }
}

// Perform search with current term
function performSearch() {
    if (currentSearchTerm) {
        resetPageForActiveTab();
        
        // Simulate search results
        renderCurrentTab();
        updatePagination();
        
        // Show message
        showNotification(`Search results for "${currentSearchTerm}"`);
    }
}

// Toggle description expanded/collapsed
function toggleDescription() {
    if (modalDesc && toggleDesc) {
        modalDesc.classList.toggle('expanded');
        toggleDesc.textContent = modalDesc.classList.contains('expanded') ? 'Show Less' : 'Show More';
    }
}

// Open preview page
function openPreviewPage() {
    if (mainModalContent && previewPage) {
        mainModalContent.style.display = 'none';
        previewPage.style.display = 'block';
    }
}

// Close preview page
function closePreviewPage() {
    if (previewPage && mainModalContent) {
        previewPage.style.display = 'none';
        mainModalContent.style.display = 'block';
    }
}

/**
 * Extract video ID from Google Drive URL
 * @param {string} url - Google Drive URL
 * @returns {string|null} - Video ID or null if not found
 */
function extractGoogleDriveId(url) {
    if (!url) return null;
    
    // Handle different GDrive URL formats
    const patterns = [
        /(?:drive\.google\.com\/file\/d\/)([^\/?#]+)/,
        /(?:drive\.google\.com\/open\?id=)([^&#]+)/,
        /(?:drive\.google\.com\/uc\?id=)([^&#]+)/,
        /(?:drive\.google\.com\/folderview\?id=)([^&#]+)/
    ];
    
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    
    return null;
}

/**
 * Generate embed URL for various video sources
 * @param {string} url - Original video URL
 * @param {string} type - Video type ('trailer' or 'full')
 * @returns {string} - Embed URL
 */
function getVideoEmbedUrl(url, type) {
    if (!url) return '';
    
    // If it's already an embed URL, return as is
    if (url.includes('youtube.com/embed/') || url.includes('player.vimeo.com') || url.includes('drive.google.com/file/d/')) {
        return url;
    }
    
    // YouTube
    if (url.includes('youtube.com/watch') || url.includes('youtu.be')) {
        const videoId = url.includes('youtube.com/watch') 
            ? new URL(url).searchParams.get('v')
            : url.split('youtu.be/')[1]?.split('?')[0];
        
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        }
    }
    
    // Vimeo
    if (url.includes('vimeo.com')) {
        const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
        if (videoId) {
            return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
        }
    }
    
    // Google Drive
    if (url.includes('drive.google.com')) {
        const fileId = extractGoogleDriveId(url);
        if (fileId) {
            // Use the direct embed URL for Google Drive
            return `https://drive.google.com/file/d/${fileId}/preview`;
        }
    }
    
    // Dailymotion
    if (url.includes('dailymotion.com')) {
        const videoId = url.split('dailymotion.com/video/')[1]?.split('?')[0];
        if (videoId) {
            return `https://www.dailymotion.com/embed/video/${videoId}?autoplay=1`;
        }
    }
    
    // Direct video file (mp4, webm, etc.)
    if (url.match(/\.(mp4|webm|ogg|mov|avi|mkv)(\?.*)?$/i)) {
        // For direct video files, we'll use a video player approach
        return url; // This will be handled separately in playVideo
    }
    
    // If it's already an embeddable URL, return it
    if (url.includes('embed') || url.includes('player')) {
        return url;
    }
    
    // Default: return original URL (might not work, but worth a try)
    return url;
}

/**
 * Play video in modal
 * @param {string} type - Video type ('trailer' or 'full')
 */
function playVideo(type) {
    if (!videoThumbnailContainer || !currentVideoForSuggestions) return;
    
    const thumbnail = videoThumbnailContainer.querySelector('img');
    const player = videoThumbnailContainer.querySelector('.video-player');
    
    if (!thumbnail || !player || !videoFrame) return;
    
    // Stop any currently playing video first
    if (isVideoPlaying) {
        videoFrame.src = '';
    }
    
    // Get the appropriate video URL based on type
    let videoUrl = '';
    if (type === 'trailer' && currentVideoForSuggestions.trailer) {
        videoUrl = currentVideoForSuggestions.trailer;
    } else if (type === 'full' && currentVideoForSuggestions.videoUrl) {
        videoUrl = currentVideoForSuggestions.videoUrl;
    }
    
    if (!videoUrl) {
        showNotification('Video URL not available');
        return;
    }
    
    // Get the embed URL
    const embedUrl = getVideoEmbedUrl(videoUrl, type);
    
    // Check if it's a direct video file
    if (embedUrl.match(/\.(mp4|webm|ogg|mov|avi|mkv)(\?.*)?$/i)) {
        // For direct video files, we need a different approach
        // We'll create a video element instead of an iframe
        const videoElement = document.createElement('video');
        videoElement.controls = true;
        videoElement.autoplay = true;
        videoElement.style.width = '100%';
        videoElement.style.height = '100%';
        videoElement.src = embedUrl;
        
        // Clear the iframe and append the video element
        videoFrame.parentNode.replaceChild(videoElement, videoFrame);
        
        // Update reference
        window.videoElement = videoElement;
        
        thumbnail.style.display = 'none';
        player.style.display = 'block';
        isVideoPlaying = true;
        currentVideoPlayerType = type;
    } else {
        // For embedded players (YouTube, Vimeo, GDrive, etc.)
        videoFrame.src = embedUrl;
        thumbnail.style.display = 'none';
        player.style.display = 'block';
        isVideoPlaying = true;
        currentVideoPlayerType = type;
    }
}

// Handle filter tab change
function handleFilterTabChange(e) {
    const tabId = e.currentTarget.dataset.filterTab;
    
    // Update active filter tab
    filterTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
    
    // Show corresponding filter section
    filterSections.forEach(section => {
        section.classList.remove('active');
    });
    const targetSection = document.getElementById(`${tabId}Filter`);
    if (targetSection) targetSection.classList.add('active');
}

// Handle filter search
function handleFilterSearch(e) {
    const filterType = e.currentTarget.dataset.filterType;
    const searchTerm = e.currentTarget.value.toLowerCase();
    
    // Filter items based on search term
    const gridId = `${filterType}Grid`;
    const grid = document.getElementById(gridId);
    
    if (grid) {
        const items = grid.querySelectorAll('.filter-item');
        items.forEach(item => {
            const nameElement = item.querySelector('.filter-name');
            if (nameElement) {
                const name = nameElement.textContent.toLowerCase();
                item.style.display = name.includes(searchTerm) ? 'block' : 'none';
            }
        });
    }
}

// Handle option selection (for version and group)
function handleOptionSelect(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const filterType = e.currentTarget.dataset.filterType;
    const value = e.currentTarget.dataset.value;
    
    if (!filterType || !value) return;
    
    // Toggle selection
    if (selectedFilters[filterType].includes(value)) {
        selectedFilters[filterType] = selectedFilters[filterType].filter(v => v !== value);
        e.currentTarget.classList.remove('selected');
    } else {
        selectedFilters[filterType].push(value);
        e.currentTarget.classList.add('selected');
    }
    
    // Update active filters and UI
    applyFilterChanges();
}

// Handle filter item selection
function selectFilterItem(filterType, value) {
    if (!filterType || !value) return;
    
    // Toggle selection
    if (selectedFilters[filterType].includes(value)) {
        selectedFilters[filterType] = selectedFilters[filterType].filter(v => v !== value);
    } else {
        selectedFilters[filterType].push(value);
    }
    
    // Update UI for all matching elements
    updateFilterItemUI(filterType, value);
    
    applyFilterChanges();
}

// Update UI for all filter items and option items
function updateFilterItemUI(filterType, value) {
    const isSelected = selectedFilters[filterType].includes(value);
    
    // Update filter items
    const filterItems = document.querySelectorAll(`.filter-item[data-value="${value}"]`);
    filterItems.forEach(item => {
        if (isSelected) {
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    });
    
    // Update option items
    const optionItems = document.querySelectorAll(`.option-item[data-filter-type="${filterType}"][data-value="${value}"]`);
    optionItems.forEach(item => {
        if (isSelected) {
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    });
}

// Common function to apply filter changes
function applyFilterChanges() {
    resetPageForActiveTab();
    updateActiveFilters();
    renderSelectedFilters();
    renderCurrentTab();
    updatePagination();
}

// Remove selected filter
function removeSelectedFilter(filterType, value) {
    if (!filterType || !value) return;
    
    selectedFilters[filterType] = selectedFilters[filterType].filter(v => v !== value);
    
    // Update UI for all matching elements
    updateFilterItemUI(filterType, value);
    
    applyFilterChanges();
}

// Update active filters from selectedFilters
function updateActiveFilters() {
    activeFilters = [];
    
    Object.keys(selectedFilters).forEach(filterType => {
        selectedFilters[filterType].forEach(value => {
            let displayName = value;
            
            // Format display name
            if (filterType === 'version' || filterType === 'group') {
                displayName = value.charAt(0).toUpperCase() + value.slice(1);
            }
            
            activeFilters.push(`${filterType.charAt(0).toUpperCase() + filterType.slice(1)}: ${displayName}`);
        });
    });
    
    renderActiveFilters();
}

// Remove a filter by its display text
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
        
        removeSelectedFilter(filterType, value);
    } else {
        // Handle non-standard filters (like search)
        activeFilters = activeFilters.filter(filter => filter !== filterText);
        renderActiveFilters();
    }
}

// Render active filters
function renderActiveFilters() {
    if (!activeFiltersContainer) return;
    
    activeFiltersContainer.innerHTML = '';
    
    activeFilters.forEach(filter => {
        const filterElement = document.createElement('div');
        filterElement.className = 'filter-tag';
        
        const safeFilter = filter.replace(/'/g, "\\'");
        filterElement.innerHTML = `
            <span>${filter}</span>
            <span class="remove" onclick="window.removeFilter('${safeFilter}')">
                <i class="fas fa-times"></i>
            </span>
        `;
        
        activeFiltersContainer.appendChild(filterElement);
    });
    
    // Show/hide filter container
    activeFiltersContainer.style.display = activeFilters.length === 0 ? 'none' : 'flex';
}

// Render selected filters in filter modal
function renderSelectedFilters() {
    if (!selectedFiltersContainer) return;
    
    selectedFiltersContainer.innerHTML = '';
    
    let hasSelectedFilters = false;
    
    Object.keys(selectedFilters).forEach(filterType => {
        if (selectedFilters[filterType].length > 0) {
            hasSelectedFilters = true;
            
            selectedFilters[filterType].forEach(value => {
                let displayName = value;
                
                // Format display name
                if (filterType === 'version' || filterType === 'group') {
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
                
                const removeBtn = filterItem.querySelector('.remove-selected');
                if (removeBtn) {
                    removeBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        removeSelectedFilter(filterType, value);
                    });
                }
                
                selectedFiltersContainer.appendChild(filterItem);
            });
        }
    });
    
    // Show/hide selected filters section
    selectedFiltersContainer.style.display = hasSelectedFilters ? 'flex' : 'none';
}

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
    if (!array || !Array.isArray(array)) return [];
    
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Render filter items for all filter types
function renderAllFilterItems() {
    Object.keys(filterData).forEach(filterType => {
        renderFilterItems(filterType, true);
    });
}

// Render filter items for a specific filter type with shuffling
function renderFilterItems(filterType, shouldShuffle = false) {
    const gridId = `${filterType}Grid`;
    const grid = document.getElementById(gridId);
    
    if (!grid || !filterData[filterType]) return;
    
    grid.innerHTML = '';
    
    // Get selected items for this filter type
    const selectedItems = selectedFilters[filterType] || [];
    
    // Get the filter data
    let filterItems = [...filterData[filterType]];
    
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
    
    const placeholderText = encodeURIComponent(itemData.name);
    item.innerHTML = `
        <img src="${itemData.image || ''}" alt="${itemData.name}" class="filter-image" style="--ratio: ${aspectRatio};" onerror="this.onerror=null; this.src='https://via.placeholder.com/300x300/7c3aed/ffffff?text=${placeholderText}'">
        <div class="filter-name">${itemData.name}</div>
    `;
    
    item.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        selectFilterItem(filterType, itemData.name);
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
    renderAllFilterItems();
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
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Update pagination buttons and display
function updatePagination() {
    // Calculate total pages for each content type
    const totalVideoPages = Math.max(1, Math.ceil(getFilteredVideos().length / itemsPerPage.videos));
    const totalAlbumPages = Math.max(1, Math.ceil(getFilteredAlbums().length / itemsPerPage.albums));
    const totalPicturePages = Math.max(1, Math.ceil(getFilteredPictures().length / itemsPerPage.pictures));
    
    // Ensure current page is within bounds
    if (currentVideoPage > totalVideoPages) currentVideoPage = totalVideoPages;
    if (currentAlbumPage > totalAlbumPages) currentAlbumPage = totalAlbumPages;
    if (currentPicturePage > totalPicturePages) currentPicturePage = totalPicturePages;
    
    // Update video pagination
    if (videosPageNumber) videosPageNumber.textContent = currentVideoPage;
    if (videosPrevBtn) videosPrevBtn.disabled = currentVideoPage <= 1;
    if (videosNextBtn) videosNextBtn.disabled = currentVideoPage >= totalVideoPages;
    
    // Update album pagination
    if (albumsPageNumber) albumsPageNumber.textContent = currentAlbumPage;
    if (albumsPrevBtn) albumsPrevBtn.disabled = currentAlbumPage <= 1;
    if (albumsNextBtn) albumsNextBtn.disabled = currentAlbumPage >= totalAlbumPages;
    
    // Update picture pagination
    if (picturesPageNumber) picturesPageNumber.textContent = currentPicturePage;
    if (picturesPrevBtn) picturesPrevBtn.disabled = currentPicturePage <= 1;
    if (picturesNextBtn) picturesNextBtn.disabled = currentPicturePage >= totalPicturePages;
}

// Get filtered videos with AND logic
function getFilteredVideos() {
    let filteredVideos = [...videoData];
    
    // Apply search filter if present
    if (currentSearchTerm) {
        const searchLower = currentSearchTerm.toLowerCase();
        filteredVideos = filteredVideos.filter(video => 
            (video.title && video.title.toLowerCase().includes(searchLower)) ||
            (video.actress && video.actress.toLowerCase().includes(searchLower)) ||
            (video.code && video.code.toLowerCase().includes(searchLower)) ||
            (video.tags && video.tags.some(tag => tag.toLowerCase().includes(searchLower)))
        );
    }
    
    // Apply ALL selected filters with AND logic
    Object.keys(selectedFilters).forEach(filterType => {
        if (selectedFilters[filterType].length > 0) {
            filteredVideos = filteredVideos.filter(video => {
                switch(filterType) {
                    case 'actress':
                        if (!video.actress) return false;
                        const videoActresses = video.actress.split(',').map(a => a.trim());
                        return selectedFilters[filterType].some(selected => 
                            videoActresses.includes(selected)
                        );
                    
                    case 'tags':
                        if (!video.tags || !Array.isArray(video.tags)) return false;
                        return selectedFilters[filterType].some(selected => 
                            video.tags.includes(selected)
                        );
                    
                    case 'studios':
                        return video.studio && selectedFilters[filterType].includes(video.studio);
                    
                    case 'tokens':
                        return video.token && selectedFilters[filterType].includes(video.token);
                    
                    case 'series':
                        return video.series && selectedFilters[filterType].includes(video.series);
                    
                    case 'version':
                        return video.version && selectedFilters[filterType].includes(video.version);
                    
                    case 'group':
                        return video.group && selectedFilters[filterType].includes(video.group.toLowerCase());
                    
                    default:
                        return true;
                }
            });
        }
    });
    
    return filteredVideos;
}

// Get filtered albums with AND logic
function getFilteredAlbums() {
    let filteredAlbums = [...albumData];
    
    // Apply search filter if present
    if (currentSearchTerm) {
        const searchLower = currentSearchTerm.toLowerCase();
        filteredAlbums = filteredAlbums.filter(album => 
            (album.title && album.title.toLowerCase().includes(searchLower)) ||
            (album.actress && album.actress.toLowerCase().includes(searchLower)) ||
            (album.tags && album.tags.some(tag => tag.toLowerCase().includes(searchLower)))
        );
    }
    
    // Apply relevant selected filters
    Object.keys(selectedFilters).forEach(filterType => {
        if (selectedFilters[filterType].length > 0) {
            filteredAlbums = filteredAlbums.filter(album => {
                switch(filterType) {
                    case 'actress':
                        if (!album.actress) return false;
                        const albumActresses = album.actress.split(',').map(a => a.trim());
                        return selectedFilters[filterType].some(selected => 
                            albumActresses.includes(selected)
                        );
                    
                    case 'tags':
                        if (!album.tags || !Array.isArray(album.tags)) return false;
                        return selectedFilters[filterType].some(selected => 
                            album.tags.includes(selected)
                        );
                    
                    // For other filter types that don't apply to albums, return true
                    default:
                        return true;
                }
            });
        }
    });
    
    return filteredAlbums;
}

// Get filtered pictures with AND logic
function getFilteredPictures() {
    let filteredPictures = [...pictureData];
    
    // Apply search filter if present
    if (currentSearchTerm) {
        const searchLower = currentSearchTerm.toLowerCase();
        filteredPictures = filteredPictures.filter(picture => 
            (picture.actress && picture.actress.toLowerCase().includes(searchLower)) ||
            (picture.tags && picture.tags.some(tag => tag.toLowerCase().includes(searchLower)))
        );
    }
    
    // Apply relevant selected filters
    Object.keys(selectedFilters).forEach(filterType => {
        if (selectedFilters[filterType].length > 0) {
            filteredPictures = filteredPictures.filter(picture => {
                switch(filterType) {
                    case 'actress':
                        if (!picture.actress) return false;
                        const pictureActresses = picture.actress.split(',').map(a => a.trim());
                        return selectedFilters[filterType].some(selected => 
                            pictureActresses.includes(selected)
                        );
                    
                    case 'tags':
                        if (!picture.tags || !Array.isArray(picture.tags)) return false;
                        return selectedFilters[filterType].some(selected => 
                            picture.tags.includes(selected)
                        );
                    
                    // For other filter types that don't apply to pictures, return true
                    default:
                        return true;
                }
            });
        }
    });
    
    return filteredPictures;
}

// Sort items based on currentSort
function sortItems(items, contentType) {
    if (!items || !Array.isArray(items)) return [];
    
    const sortedItems = [...items];
    
    switch(currentSort) {
        case 'shuffle':
            return shuffleArray(sortedItems);
            
        case 'latest':
            if (contentType === 'videos' || contentType === 'albums') {
                sortedItems.sort((a, b) => {
                    const dateA = a.release ? new Date(a.release) : new Date(0);
                    const dateB = b.release ? new Date(b.release) : new Date(0);
                    return dateB - dateA;
                });
            } else {
                sortedItems.sort((a, b) => (b.id || 0) - (a.id || 0));
            }
            break;
            
        case 'oldest':
            if (contentType === 'videos' || contentType === 'albums') {
                sortedItems.sort((a, b) => {
                    const dateA = a.release ? new Date(a.release) : new Date(0);
                    const dateB = b.release ? new Date(b.release) : new Date(0);
                    return dateA - dateB;
                });
            } else {
                sortedItems.sort((a, b) => (a.id || 0) - (b.id || 0));
            }
            break;
            
        case 'top-rated':
            if (contentType === 'videos') {
                sortedItems.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            } else if (contentType === 'albums') {
                sortedItems.sort((a, b) => (b.pages || 0) - (a.pages || 0));
            }
            break;
            
        case 'most-viewed':
            if (contentType === 'videos') {
                sortedItems.sort((a, b) => (b.views || 0) - (a.views || 0));
            } else if (contentType === 'albums') {
                sortedItems.sort((a, b) => (b.pages || 0) - (a.pages || 0));
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

// Load videos into the grid
function loadVideos() {
    if (!videosGrid) return;
    
    videosGrid.innerHTML = '';
    
    // Get filtered and sorted videos
    let filteredVideos = getFilteredVideos();
    filteredVideos = sortItems(filteredVideos, 'videos');
    
    // Calculate start and end indices for current page
    const startIndex = (currentVideoPage - 1) * itemsPerPage.videos;
    const endIndex = startIndex + itemsPerPage.videos;
    const pageVideos = filteredVideos.slice(startIndex, endIndex);
    
    // Create video cards
    pageVideos.forEach(video => {
        const videoCard = createVideoCard(video);
        videosGrid.appendChild(videoCard);
    });
    
    // Show empty state if no videos
    if (pageVideos.length === 0) {
        videosGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-video-slash"></i>
                <h3>No videos found</h3>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
    }
}

// Create a video card element
function createVideoCard(video) {
    const videoCard = document.createElement('div');
    videoCard.className = 'video-card';
    
    const thumbnail = video.thumbnail || 'https://via.placeholder.com/300x200/7c3aed/ffffff?text=No+Image';
    const title = video.title || 'Untitled';
    const code = video.code || 'N/A';
    const version = video.version || 'Standard';
    const duration = video.duration || '0';
    const rating = video.rating ? video.rating.toFixed(1) : '0.0';
    
    videoCard.innerHTML = `
        <img src="${thumbnail}" alt="${title}" class="video-thumbnail" onerror="this.onerror=null; this.src='https://via.placeholder.com/300x200/7c3aed/ffffff?text=Thumbnail'">
        <div class="video-info">
            <h3 class="video-title">${title}</h3>
            <div class="video-meta">
                <div class="video-meta-item">
                    <i class="fas fa-hashtag"></i>
                    <span>${code}</span>
                </div>
                <div class="video-meta-item">
                    <i class="fas fa-layer-group"></i>
                    <span>${version}</span>
                </div>
                <div class="video-meta-item">
                    <i class="fas fa-clock"></i>
                    <span>${duration} min</span>
                </div>
                <div class="video-meta-item">
                    <i class="fas fa-star"></i>
                    <span>${rating}</span>
                </div>
            </div>
        </div>
    `;
    
    videoCard.addEventListener('click', () => {
        openVideoModal(video);
    });
    
    return videoCard;
}

// Load albums into the grid
function loadAlbums() {
    if (!albumsGrid) return;
    
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
        const albumCard = createAlbumCard(album);
        albumsGrid.appendChild(albumCard);
    });
    
    // Show empty state if no albums
    if (pageAlbums.length === 0) {
        albumsGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-book-open"></i>
                <h3>No albums found</h3>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
    }
}

// Create an album card element
function createAlbumCard(album) {
    const albumCard = document.createElement('div');
    albumCard.className = 'album-card';
    
    const cover = album.cover || 'https://via.placeholder.com/300x400/8b5cf6/ffffff?text=No+Image';
    const title = album.title || 'Untitled';
    
    albumCard.innerHTML = `
        <img src="${cover}" alt="${title}" class="album-cover" onerror="this.onerror=null; this.src='https://via.placeholder.com/300x400/8b5cf6/ffffff?text=Album'">
        <div class="album-info">
            <h3 class="album-title">${title}</h3>
        </div>
    `;
    
    albumCard.addEventListener('click', () => {
        openAlbumModal(album);
    });
    
    return albumCard;
}

// Load pictures into the grid
function loadPictures() {
    if (!picturesGrid) return;
    
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
        const pictureCard = createPictureCard(picture);
        picturesGrid.appendChild(pictureCard);
    });
    
    // Show empty state if no pictures
    if (pagePictures.length === 0) {
        picturesGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-image"></i>
                <h3>No pictures found</h3>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
    }
}

// Create a picture card element
function createPictureCard(picture) {
    const pictureCard = document.createElement('div');
    pictureCard.className = 'picture-card';
    
    const image = picture.image || 'https://via.placeholder.com/300x375/a78bfa/ffffff?text=No+Image';
    
    pictureCard.innerHTML = `
        <img src="${image}" alt="Picture" class="picture-img" onerror="this.onerror=null; this.src='https://via.placeholder.com/300x375/a78bfa/ffffff?text=Picture'">
    `;
    
    pictureCard.addEventListener('click', () => {
        openImageModal(picture);
    });
    
    return pictureCard;
}

// Get videos featuring the same actress(es)
function getAlsoStarredVideos(currentVideo) {
    if (!currentVideo || !currentVideo.actress) return [];
    
    const currentActresses = currentVideo.actress.split(',').map(a => a.trim());
    const allVideos = [...videoData];
    
    // Filter out the current video
    const otherVideos = allVideos.filter(video => video.id !== currentVideo.id);
    
    // Find videos with matching actresses
    const matchingVideos = otherVideos.filter(video => {
        if (!video.actress) return false;
        const videoActresses = video.actress.split(',').map(a => a.trim());
        return videoActresses.some(actress => currentActresses.includes(actress));
    });
    
    // Sort by number of matching actresses, then by views
    matchingVideos.sort((a, b) => {
        const aActresses = a.actress ? a.actress.split(',').map(act => act.trim()) : [];
        const bActresses = b.actress ? b.actress.split(',').map(act => act.trim()) : [];
        
        const aMatches = aActresses.filter(act => currentActresses.includes(act)).length;
        const bMatches = bActresses.filter(act => currentActresses.includes(act)).length;
        
        if (bMatches !== aMatches) {
            return bMatches - aMatches;
        }
        
        return (b.views || 0) - (a.views || 0);
    });
    
    // Return up to 10 videos
    return matchingVideos.slice(0, 10);
}

// Get videos with similar tags
function getYouMayLikeVideos(currentVideo) {
    if (!currentVideo || !currentVideo.tags) return [];
    
    const allVideos = [...videoData];
    
    // Filter out the current video
    const otherVideos = allVideos.filter(video => video.id !== currentVideo.id);
    
    // Calculate tag similarity score
    const videosWithScore = otherVideos.map(video => {
        const commonTags = video.tags ? video.tags.filter(tag => currentVideo.tags.includes(tag)).length : 0;
        const totalTags = new Set([...(video.tags || []), ...(currentVideo.tags || [])]).size;
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
        return (b.views || 0) - (a.views || 0);
    });
    
    // Return up to 10 videos (without the similarityScore)
    return videosWithScore.slice(0, 10).map(video => {
        const { similarityScore, ...videoData } = video;
        return videoData;
    });
}

// Setup carousel touch support
function setupCarouselTouch() {
    const carousels = [alsoStarredCarousel, youMayLikeCarousel].filter(Boolean);
    
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
    if (!carousel) return;
    
    const scrollAmount = 300;
    carousel.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

// Load suggestion carousels
function loadSuggestionCarousels(video) {
    if (!video) return;
    
    // Clear existing content
    if (alsoStarredCarousel) alsoStarredCarousel.innerHTML = '';
    if (youMayLikeCarousel) youMayLikeCarousel.innerHTML = '';
    
    // Get suggested videos
    const alsoStarredVideos = getAlsoStarredVideos(video);
    const youMayLikeVideos = getYouMayLikeVideos(video);
    
    // Load "Also Starred In" carousel
    if (alsoStarredCarousel) {
        if (alsoStarredVideos.length > 0) {
            alsoStarredVideos.forEach(suggestedVideo => {
                const carouselItem = createCarouselItem(suggestedVideo, 'poster');
                alsoStarredCarousel.appendChild(carouselItem);
            });
        } else {
            alsoStarredCarousel.innerHTML = `
                <div class="carousel-empty">
                    <p>No other videos with the same actress(es)</p>
                </div>
            `;
        }
    }
    
    // Load "You May Also Like" carousel
    if (youMayLikeCarousel) {
        if (youMayLikeVideos.length > 0) {
            youMayLikeVideos.forEach(suggestedVideo => {
                const carouselItem = createCarouselItem(suggestedVideo, 'thumbnail');
                youMayLikeCarousel.appendChild(carouselItem);
            });
        } else {
            youMayLikeCarousel.innerHTML = `
                <div class="carousel-empty">
                    <p>No similar videos found</p>
                </div>
            `;
        }
    }
}

// Create a carousel item
function createCarouselItem(video, type) {
    const carouselItem = document.createElement('div');
    carouselItem.className = `carousel-item ${type}`;
    
    const imageUrl = type === 'poster' 
        ? (video.poster || 'https://via.placeholder.com/300x450/7c3aed/ffffff?text=Poster')
        : (video.thumbnail || 'https://via.placeholder.com/300x200/7c3aed/ffffff?text=Thumbnail');
    
    const code = video.code || 'N/A';
    
    carouselItem.innerHTML = `
        <img src="${imageUrl}" alt="${video.title || ''}" onerror="this.onerror=null; this.src='https://via.placeholder.com/300x450/7c3aed/ffffff?text=Poster'">
        <div class="carousel-code">${code}</div>
    `;
    
    carouselItem.addEventListener('click', () => {
        closeModal(videoModal);
        // Use setTimeout to ensure modal is fully closed before opening new one
        setTimeout(() => {
            openVideoModal(video);
        }, 50);
    });
    
    return carouselItem;
}

// Open video modal
function openVideoModal(video) {
    if (!video) return;
    
    console.log('Opening video modal for:', video.title);
    
    // Store current video for suggestions
    currentVideoForSuggestions = video;
    
    // Reset video player state
    resetVideoPlayer();
    
    // Reset preview page
    closePreviewPage();
    
    // Update modal content with video details
    updateVideoModalContent(video);
    
    // Load suggestion carousels
    loadSuggestionCarousels(video);
    
    // Open modal
    openModal(videoModal);
}

// Update video modal content
function updateVideoModalContent(video) {
    // Basic info
    if (modalTitle) modalTitle.textContent = video.title || 'Untitled';
    if (modalDesc) modalDesc.textContent = video.description || '';
    if (modalCode) modalCode.textContent = video.code || 'N/A';
    
    // Images
    if (modalThumb) {
        modalThumb.src = video.thumbnail || 'https://via.placeholder.com/600x400/7c3aed/ffffff?text=No+Image';
        modalThumb.alt = video.title || 'Video Thumbnail';
    }
    
    if (modalPoster) {
        modalPoster.src = video.poster || 'https://via.placeholder.com/300x450/7c3aed/ffffff?text=No+Image';
        modalPoster.alt = video.title || 'Video Poster';
    }
    
    // Details
    if (modalRating) modalRating.textContent = video.rating ? video.rating.toFixed(1) : '0.0';
    if (modalStudio) modalStudio.textContent = video.studio || 'N/A';
    if (modalLabel) modalLabel.textContent = video.label || 'N/A';
    if (modalRelease) modalRelease.textContent = video.release || 'N/A';
    if (modalDuration) modalDuration.textContent = video.duration || '0';
    if (modalVersions) modalVersions.textContent = video.version || 'Standard';
    if (modalGroup) modalGroup.textContent = video.group || 'N/A';
    if (modalViews) modalViews.textContent = video.views ? video.views.toLocaleString() : '0';
    if (modalSeries) modalSeries.textContent = video.series || 'N/A';
    
    // Reset description toggle
    if (modalDesc && toggleDesc) {
        modalDesc.classList.remove('expanded');
        toggleDesc.textContent = 'Show More';
    }
    
    // Update tags
    updateModalTags(video);
    
    // Update actresses
    updateModalActresses(video);
    
    // Update clickable metadata
    updateClickableMetadata(video);
    
    // Update preview images
    updatePreviewImages(video);
}

// Update modal tags
function updateModalTags(video) {
    if (!modalTags) return;
    
    modalTags.innerHTML = '';
    
    if (video.tags && video.tags.length > 0) {
        video.tags.forEach(tag => {
            const tagElement = document.createElement('div');
            tagElement.className = 'tag';
            tagElement.textContent = tag;
            tagElement.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                selectFilterItem('tags', tag);
                closeModal(videoModal);
            });
            modalTags.appendChild(tagElement);
        });
    }
}

// Update modal actresses
function updateModalActresses(video) {
    if (!modalActress) return;
    
    modalActress.innerHTML = '';
    
    if (video.actress) {
        const actressNames = video.actress.split(',').map(name => name.trim());
        
        actressNames.forEach(actressName => {
            const actressData = filterData.actress ? filterData.actress.find(a => a.name === actressName) : null;
            const actressImg = actressData ? actressData.image : '';
            
            const actressElement = document.createElement('div');
            actressElement.className = 'actress';
            
            const actressImgElement = document.createElement('img');
            actressImgElement.src = actressImg;
            actressImgElement.alt = actressName;
            actressImgElement.onerror = function() {
                this.onerror = null;
                this.src = `https://via.placeholder.com/200x300/7c3aed/ffffff?text=${encodeURIComponent(actressName)}`;
            };
            
            const actressNameElement = document.createElement('span');
            actressNameElement.textContent = actressName;
            
            actressElement.appendChild(actressImgElement);
            actressElement.appendChild(actressNameElement);
            
            actressElement.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                selectFilterItem('actress', actressName);
                closeModal(videoModal);
            });
            
            modalActress.appendChild(actressElement);
        });
    }
}

// Update clickable metadata
function updateClickableMetadata(video) {
    // Series
    if (modalSeries) {
        modalSeries.replaceWith(modalSeries.cloneNode(true));
        const newModalSeries = document.getElementById('modalSeries');
        if (newModalSeries && video.series) {
            newModalSeries.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                selectFilterItem('series', video.series);
                closeModal(videoModal);
            });
        }
    }
    
    // Studio
    if (modalStudio) {
        modalStudio.replaceWith(modalStudio.cloneNode(true));
        const newModalStudio = document.getElementById('modalStudio');
        if (newModalStudio && video.studio) {
            newModalStudio.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                selectFilterItem('studios', video.studio);
                closeModal(videoModal);
            });
        }
    }
    
    // Label
    if (modalLabel) {
        modalLabel.replaceWith(modalLabel.cloneNode(true));
        const newModalLabel = document.getElementById('modalLabel');
        if (newModalLabel && video.label) {
            newModalLabel.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const labelFilter = `Label: ${video.label}`;
                if (!activeFilters.includes(labelFilter)) {
                    activeFilters.push(labelFilter);
                    renderActiveFilters();
                }
                closeModal(videoModal);
            });
        }
    }
    
    // Versions
    if (modalVersions) {
        modalVersions.replaceWith(modalVersions.cloneNode(true));
        const newModalVersions = document.getElementById('modalVersions');
        if (newModalVersions && video.version) {
            newModalVersions.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                selectFilterItem('version', video.version);
                closeModal(videoModal);
            });
        }
    }
    
    // Group
    if (modalGroup) {
        modalGroup.replaceWith(modalGroup.cloneNode(true));
        const newModalGroup = document.getElementById('modalGroup');
        if (newModalGroup && video.group) {
            newModalGroup.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                selectFilterItem('group', video.group.toLowerCase());
                closeModal(videoModal);
            });
        }
    }
}

// Update preview images
function updatePreviewImages(video) {
    if (!previewImagesFull) return;
    
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
            <div class="empty-state">
                <i class="fas fa-image"></i>
                <h3>No preview images available</h3>
            </div>
        `;
    }
}

// Open album modal
function openAlbumModal(album) {
    if (!album) return;
    
    // Update modal content with album details
    if (albumModalTitle) albumModalTitle.textContent = album.title || 'Untitled';
    
    // Update tags
    if (albumModalTags) {
        albumModalTags.innerHTML = '';
        if (album.tags && album.tags.length > 0) {
            album.tags.forEach(tag => {
                const tagElement = document.createElement('div');
                tagElement.className = 'tag';
                tagElement.textContent = tag;
                tagElement.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    selectFilterItem('tags', tag);
                    closeModal(albumModal);
                });
                albumModalTags.appendChild(tagElement);
            });
        }
    }
    
    // Update actresses
    if (albumModalActress) {
        albumModalActress.innerHTML = '';
        if (album.actress) {
            const actressNames = album.actress.split(',').map(name => name.trim());
            
            actressNames.forEach(actressName => {
                const actressData = filterData.actress ? filterData.actress.find(a => a.name === actressName) : null;
                const actressImg = actressData ? actressData.image : '';
                
                const actressElement = document.createElement('div');
                actressElement.className = 'actress';
                
                const actressImgElement = document.createElement('img');
                actressImgElement.src = actressImg;
                actressImgElement.alt = actressName;
                actressImgElement.onerror = function() {
                    this.onerror = null;
                    this.src = `https://via.placeholder.com/200x300/8b5cf6/ffffff?text=${encodeURIComponent(actressName)}`;
                };
                
                const actressNameElement = document.createElement('span');
                actressNameElement.textContent = actressName;
                
                actressElement.appendChild(actressImgElement);
                actressElement.appendChild(actressNameElement);
                
                actressElement.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    selectFilterItem('actress', actressName);
                    closeModal(albumModal);
                });
                
                albumModalActress.appendChild(actressElement);
            });
        }
    }
    
    // Set image count
    if (albumModalImageCount) {
        const totalImages = album.albumImages && album.albumImages.length ? album.albumImages.length + 1 : 1;
        albumModalImageCount.textContent = `${totalImages} images (including cover)`;
    }
    
    // Set cover image
    if (albumMainCover) {
        albumMainCover.src = album.cover || 'https://via.placeholder.com/600x800/8b5cf6/ffffff?text=No+Image';
        albumMainCover.alt = album.title || 'Album Cover';
    }
    
    // Update album images
    if (albumImagesContainer) {
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
    }
    
    // Open modal
    openModal(albumModal);
}

// Open image modal
function openImageModal(picture) {
    if (!picture || !fullscreenImage) return;
    
    // Set the image
    fullscreenImage.src = picture.image || 'https://via.placeholder.com/800x1000/a78bfa/ffffff?text=No+Image';
    fullscreenImage.alt = 'Fullscreen Image';
    
    openModal(imageModal);
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Make functions available globally
window.removeFilter = removeFilter;
window.selectFilterItem = selectFilterItem;