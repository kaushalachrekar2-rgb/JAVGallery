// discover.js - Discover Page Logic

function initializeDiscoverPage() {
    console.log('Initializing discover page...');
    
    // Setup search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                triggerSearch();
            }
        });
    }
    
    updateStyleSelector();
    renderDiscoverGrid();
}

function updateStyleSelector() {
    const styleSelector = document.getElementById('styleSelector');
    if (!styleSelector) return;
    
    styleSelector.innerHTML = '';
    
    let styles = [];
    
    if (currentContentType === 'video') {
        styles = [1, 2, 3, 4, 5, 6, 7, 8];
    } else if (currentContentType === 'photobook') {
        styles = [1];
    } else if (currentContentType === 'pictures') {
        styles = [1];
    } else if (currentContentType === 'website' || currentContentType === 'shorts') {
        styles = [1];
        styleSelector.style.display = 'none';
        return;
    }
    
    styles.forEach(styleNum => {
        const btn = document.createElement('button');
        btn.className = `style-btn ${currentStyle === styleNum ? 'active' : ''}`;
        btn.textContent = styleNum;
        btn.onclick = () => {
            currentStyle = styleNum;
            document.querySelectorAll('.style-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderDiscoverGrid();
        };
        styleSelector.appendChild(btn);
    });
    
    styleSelector.style.display = 'flex';
}

function renderDiscoverGrid() {
    const grid = document.getElementById('grid');
    if (!grid) return;
    
    if (currentContentType === 'video') {
        renderVideoGrid(grid);
    } else if (currentContentType === 'photobook') {
        renderPhotobookGrid(grid);
    } else if (currentContentType === 'pictures') {
        renderPictureGrid(grid);
    } else if (currentContentType === 'website' || currentContentType === 'shorts') {
        renderWebShortGrid(grid);
    }
}

function renderVideoGrid(grid) {
    if (!currentContent || currentContent.length === 0) {
        grid.innerHTML = `
            <div class="loading" style="grid-column:1/-1">
                <i class="fas fa-search"></i>
                <p>No videos match your filters</p>
                <button onclick="resetFilters()" style="margin-top:16px;padding:8px 16px;background:var(--primary);color:white;border:none;border-radius:var(--radius);cursor:pointer">
                    Reset Filters
                </button>
            </div>
        `;
        return;
    }
    
    grid.className = `grid style-${currentStyle}`;
    grid.innerHTML = '';
    
    currentContent.forEach(video => {
        const card = createVideoCard(video);
        grid.appendChild(card);
    });
}

function createVideoCard(video) {
    const card = document.createElement('div');
    card.className = 'card';
    card.onclick = () => {
        if (typeof openVideoModal === 'function') {
            openVideoModal(video);
        }
    };
    
    let html = '';
    
    switch(currentStyle) {
        case 1:
            html = `
                <img src="${video.thumbnail || video.poster}">
                <div class="info">
                    <div class="title">${video.title}</div>
                    <div class="meta">
                        🆔 ${video.code} 📅 ${video.release} 🕒 ${video.duration}m ⭐ ${video.rating}
                    </div>
                </div>`;
            break;
            
        case 2:
            html = `
                <img src="${video.poster || video.thumbnail}">
                <div class="info">
                    <div class="title">${video.title}</div>
                    <div class="row"><span>🆔 ${video.code}</span><span>⭐ ${video.rating}</span></div>
                    <div class="row"><span>🕒 ${video.duration}m</span><span>${video.versions ? video.versions[0] : ''}</span></div>
                </div>`;
            break;
            
        case 3:
            html = `
                <img src="${video.poster || video.thumbnail}">
                <div class="row">
                    <span>🆔 ${video.code}</span><span>⭐ ${video.rating}</span>
                </div>`;
            break;
            
        case 4:
            html = `
                <img src="${video.thumbnail || video.poster}">
                <div class="info">
                    <div class="title">${video.title}</div>
                    <div class="row"><span>🆔 ${video.code}</span><span>⭐ ${video.rating}</span></div>
                    <div class="row"><span>🕒 ${video.duration}m</span><span>${video.versions ? video.versions[0] : ''}</span></div>
                </div>`;
            break;
            
        case 5:
            html = `
                <img src="${video.poster || video.thumbnail}">
                <div class="info">
                    <div class="title">${video.title}</div>
                    <div class="meta">
                        🆔 ${video.code} 📅 ${video.release} 🕒 ${video.duration}m ⭐ ${video.rating}
                    </div>
                </div>`;
            break;
            
        case 6:
            html = `
                <img src="${video.thumbnail || video.poster}">
                <div class="info">
                    <div>🆔 ${video.code}</div>
                    <div>🕒 ${video.duration}m</div>
                    <div>⭐ ${video.rating}</div>
                </div>`;
            break;
            
        case 7:
            html = `
                <img src="${video.poster || video.thumbnail}">
                <div class="info">
                    <div class="title">${video.title}</div>
                    <div>🆔 ${video.code}</div>
                    <div>📅 ${video.release}</div>
                    <div>🕒 ${video.duration}m</div>
                    <div>${video.versions ? video.versions.join(' ') : ''}</div>
                    <div>⭐ ${video.rating}</div>
                </div>`;
            break;
            
        case 8:
            html = `
                <div class="media">
                    <img class="poster" src="${video.poster || video.thumbnail}">
                    <div class="preview">
                        <img src="${video.thumbnail || video.poster}">
                        <img src="${video.thumbnail || video.poster}">
                    </div>
                </div>
                <div class="info">
                    <div class="title">${video.title}</div>
                    <div class="meta">
                        🆔 ${video.code} 📅 ${video.release} 🕒 ${video.duration}m ⭐ ${video.rating}
                    </div>
                </div>`;
            break;
    }
    
    card.innerHTML = html;
    return card;
}

function renderPhotobookGrid(grid) {
    const collection = photobookCollection;
    if (!collection || collection.length === 0) {
        grid.innerHTML = '<div class="loading"><i class="fas fa-book"></i><p>No photobooks available</p></div>';
        return;
    }
    
    grid.className = `grid pb-style-${currentStyle}`;
    grid.innerHTML = '';
    
    collection.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => {
            if (typeof openPhotobook === 'function') {
                openPhotobook(item);
            }
        };
        card.innerHTML = `
            <img src="${item.cover}">
            <div class="info">
                <div class="title">${item.title}</div>
                <div class="meta" style="text-align:center;font-size:12px;color:var(--text-muted);">
                    ${item.count} photos • ${item.category}
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function renderPictureGrid(grid) {
    const collection = pictureCollection;
    if (!collection || collection.length === 0) {
        grid.innerHTML = '<div class="loading"><i class="fas fa-images"></i><p>No pictures available</p></div>';
        return;
    }
    
    grid.className = `grid pic-style-${currentStyle}`;
    grid.innerHTML = '';
    
    collection.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => {
            if (typeof openPicture === 'function') {
                openPicture(item);
            }
        };
        card.innerHTML = `<img src="${item.url}" alt="${item.title}">`;
        grid.appendChild(card);
    });
}

function renderWebShortGrid(grid) {
    const collection = currentContentType === 'website' ? websiteCollection : shortsCollection;
    if (!collection || collection.length === 0) {
        grid.innerHTML = `<div class="loading"><i class="fas fa-${currentContentType === 'website' ? 'globe' : 'film'}"></i><p>No ${currentContentType} available</p></div>`;
        return;
    }
    
    grid.className = `grid ws-style-1`;
    grid.innerHTML = '';
    
    collection.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => window.open(item.url, '_blank');
        card.innerHTML = `
            <img src="${item.image}">
            <div class="info">
                <div class="title">${item.title}</div>
                ${item.duration ? `<div class="meta" style="text-align:center;font-size:12px;color:var(--text-muted);">${item.duration}</div>` : ''}
            </div>
        `;
        grid.appendChild(card);
    });
}
