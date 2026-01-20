// app.js - Main Application Logic

// ========================
// GLOBAL VARIABLES
// ========================
let currentPage = 'discover';
let currentContentType = 'video';
let currentStyle = 1;
let videoCollection = [];
let photobookCollection = [];
let pictureCollection = [];
let websiteCollection = [];
let shortsCollection = [];
let currentContent = [];
let activeFilters = {
    category: ['Japanese'],
    actress: [],
    tags: [],
    studio: [],
    label: [],
    series: [],
    release: [],
    duration: [],
    rating: [],
    version: [],
    quality: [],
    collab: []
};
let currentFilterType = null;
let selectedFilterOptions = [];
let currentVideo = null;

// Actress carousel
let actressCarouselIndex = 0;
let actressCarouselItems = 0;
let actressCarouselVisible = 3;

// ========================
// UTILITY FUNCTIONS
// ========================
async function loadComponent(url, containerId) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to load ${url}`);
        const html = await response.text();
        document.getElementById(containerId).innerHTML += html;
    } catch (error) {
        console.error('Error loading component:', error);
    }
}

async function loadPage(pageName) {
    try {
        const response = await fetch(`${pageName}.html`);
        if (!response.ok) throw new Error(`Failed to load ${pageName}.html`);
        const html = await response.text();
        document.getElementById('page-container').innerHTML = html;
        
        // Load page-specific CSS
        loadPageCSS(pageName);
        
        // Initialize page
        if (pageName === 'discover' && typeof initializeDiscoverPage === 'function') {
            initializeDiscoverPage();
        } else if (pageName === 'featured' && typeof initializeFeaturedPage === 'function') {
            initializeFeaturedPage();
        } else if (pageName === 'collection' && typeof initializeCollectionPage === 'function') {
            initializeCollectionPage();
        }
        
        currentPage = pageName;
        updateActiveTab();
    } catch (error) {
        console.error('Error loading page:', error);
    }
}

function loadPageCSS(pageName) {
    // Remove existing page-specific CSS
    const existingLink = document.querySelector(`link[data-page="${pageName}"]`);
    if (existingLink) {
        existingLink.remove();
    }
    
    // Add new CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `css/${pageName}.css`;
    link.dataset.page = pageName;
    document.head.appendChild(link);
}

function updateActiveTab() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === currentPage) {
            btn.classList.add('active');
        }
    });
}

// ========================
// INITIALIZATION
// ========================
async function initializeApp() {
    console.log('Initializing app...');
    
    // Load data
    await loadData();
    
    // Set default filter
    if (!localStorage.getItem('filtersSet')) {
        resetFilters();
        localStorage.setItem('filtersSet', 'true');
    }
    
    // Update UI
    updateContentTypeUI();
    renderActiveFilters();
    
    // Apply filters
    applyFilters();
    
    console.log('App initialized');
}

async function loadData() {
    try {
        // Data should already be loaded via script tags in main.html
        console.log('Checking data availability...');
        
        // Verify data is loaded
        if (typeof window.videoCollection === 'undefined') {
            console.warn('videoCollection not loaded, using fallback');
            loadFallbackData();
        } else {
            videoCollection = window.videoCollection;
            console.log(`Loaded ${videoCollection.length} videos`);
        }
        
        if (typeof window.photobookCollection !== 'undefined') {
            photobookCollection = window.photobookCollection;
            console.log(`Loaded ${photobookCollection.length} photobooks`);
        }
        
        if (typeof window.pictureCollection !== 'undefined') {
            pictureCollection = window.pictureCollection;
            console.log(`Loaded ${pictureCollection.length} pictures`);
        }
        
        if (typeof window.websiteCollection !== 'undefined') {
            websiteCollection = window.websiteCollection;
            console.log(`Loaded ${websiteCollection.length} websites`);
        }
        
        if (typeof window.shortsCollection !== 'undefined') {
            shortsCollection = window.shortsCollection;
            console.log(`Loaded ${shortsCollection.length} shorts`);
        }
        
    } catch (error) {
        console.error('Error loading data:', error);
        loadFallbackData();
    }
}

function loadFallbackData() {
    console.log('Loading fallback data...');
    
    // Minimal fallback data
    videoCollection = [
        {
            id: 1,
            title: "Sample Video",
            code: "SV-2024-001",
            thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&auto=format&fit=crop",
            poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&auto=format&fit=crop",
            rating: 4.5,
            studio: "Sample Studio",
            label: "Sample Label",
            release: "2024-01-01",
            duration: "120",
            versions: ["Censored", "Uncensored"],
            series: "Sample Series",
            actresses: ["Sakura"],
            tags: ["Drama", "Romance"],
            category: "Japanese",
            quality: "1080p",
            description: "Sample description",
            featured: true,
            collab: false,
            links: {
                trailer: "#"
            }
        }
    ];
    
    photobookCollection = [];
    pictureCollection = [];
    websiteCollection = [];
    shortsCollection = [];
}

// ========================
// PAGE NAVIGATION
// ========================
function switchTab(tabId) {
    if (tabId === currentPage) return;
    
    // Update URL hash
    window.location.hash = tabId;
    
    // Load the page
    loadPage(tabId);
}

// Handle hash changes
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1) || 'discover';
    if (hash !== currentPage) {
        loadPage(hash);
    }
});

// ========================
// CONTENT TYPE MANAGEMENT
// ========================
function toggleContentType() {
    const dropdown = document.getElementById('contentTypeDropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

function setContentType(type) {
    currentContentType = type;
    
    // Update dropdown UI
    const options = document.querySelectorAll('.content-type-option');
    options.forEach(option => {
        option.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update icon
    const icon = document.getElementById('contentTypeIcon');
    const icons = {
        video: '📹',
        photobook: '📚',
        pictures: '🖼️',
        website: '🌐',
        shorts: '🎬'
    };
    if (icon) icon.textContent = icons[type] || '📹';
    
    // Close dropdown
    const dropdown = document.getElementById('contentTypeDropdown');
    if (dropdown) dropdown.classList.remove('show');
    
    // Re-render content
    if (currentPage === 'discover' && typeof renderDiscoverGrid === 'function') {
        updateStyleSelector();
        renderDiscoverGrid();
    }
}

function updateContentTypeUI() {
    const icon = document.getElementById('contentTypeIcon');
    if (icon) {
        const icons = {
            video: '📹',
            photobook: '📚',
            pictures: '🖼️',
            website: '🌐',
            shorts: '🎬'
        };
        icon.textContent = icons[currentContentType] || '📹';
    }
}

// ========================
// SEARCH FUNCTIONALITY
// ========================
function triggerSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchContent(searchInput.value);
    }
}

function searchContent(query) {
    if (!query.trim()) {
        if (currentContentType === 'video') {
            applyFilters();
            if (typeof renderDiscoverGrid === 'function') {
                renderDiscoverGrid();
            }
        } else if (typeof renderDiscoverGrid === 'function') {
            renderDiscoverGrid();
        }
        return;
    }
    
    query = query.toLowerCase();
    
    let collection;
    if (currentContentType === 'video') collection = currentContent;
    else if (currentContentType === 'photobook') collection = photobookCollection;
    else if (currentContentType === 'pictures') collection = pictureCollection;
    else if (currentContentType === 'website') collection = websiteCollection;
    else if (currentContentType === 'shorts') collection = shortsCollection;
    else collection = [];
    
    if (collection && collection.length > 0) {
        if (currentContentType === 'video') {
            currentContent = collection.filter(video => 
                video.title.toLowerCase().includes(query) ||
                video.code.toLowerCase().includes(query) ||
                video.series.toLowerCase().includes(query) ||
                video.tags?.some(tag => tag.toLowerCase().includes(query)) ||
                video.actresses?.some(actress => actress.toLowerCase().includes(query))
            );
        } else {
            currentContent = collection.filter(item => 
                item.title.toLowerCase().includes(query) ||
                (item.description && item.description.toLowerCase().includes(query)) ||
                (item.category && item.category.toLowerCase().includes(query))
            );
        }
    }
    
    if (typeof renderDiscoverGrid === 'function') {
        renderDiscoverGrid();
    }
}

function shuffleContent() {
    if (currentContentType === 'video') {
        currentContent = [...currentContent.sort(() => Math.random() - .5)];
    } else if (currentContentType === 'photobook') {
        currentContent = [...photobookCollection.sort(() => Math.random() - .5)];
    } else if (currentContentType === 'pictures') {
        currentContent = [...pictureCollection.sort(() => Math.random() - .5)];
    } else if (currentContentType === 'website') {
        currentContent = [...websiteCollection.sort(() => Math.random() - .5)];
    } else if (currentContentType === 'shorts') {
        currentContent = [...shortsCollection.sort(() => Math.random() - .5)];
    }
    
    if (typeof renderDiscoverGrid === 'function') {
        renderDiscoverGrid();
    }
}

// Close dropdowns when clicking outside
document.addEventListener('click', (event) => {
    const dropdown = document.getElementById('contentTypeDropdown');
    const button = document.querySelector('.content-type-btn');
    
    if (dropdown && dropdown.classList.contains('show') && 
        !dropdown.contains(event.target) && 
        !button.contains(event.target)) {
        dropdown.classList.remove('show');
    }
});

// Handle escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (typeof closeVideoModal === 'function') closeVideoModal();
        if (typeof closeFilterModal === 'function') closeFilterModal();
        if (typeof closePhotobookViewer === 'function') closePhotobookViewer();
        if (typeof closeImageViewer === 'function') closeImageViewer();
        
        const dropdown = document.getElementById('contentTypeDropdown');
        if (dropdown && dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
        }
    }
});
