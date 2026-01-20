// modal.js - Video Modal Logic

function initActressCarousel() {
    const container = document.getElementById('actressCarouselContainer');
    if (!container) return;
    
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
        isDown = false;
    });

    container.addEventListener('mouseup', () => {
        isDown = false;
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile
    container.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const x = e.touches[0].pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
    });
}

function updateActressCarousel() {
    const actressRow = document.getElementById('actresses');
    if (!actressRow) return;
    
    const container = document.getElementById('actressCarouselContainer');
    if (!container) return;
    
    const itemWidth = 90; // 80px width + 10px gap
    
    actressCarouselItems = actressRow.children.length;
    actressCarouselVisible = Math.floor(container.offsetWidth / itemWidth);
    
    // Reset position
    actressCarouselIndex = 0;
    updateCarouselPosition();
}

function prevActressSlide() {
    if (actressCarouselIndex > 0) {
        actressCarouselIndex--;
        updateCarouselPosition();
    }
}

function nextActressSlide() {
    if (actressCarouselIndex < actressCarouselItems - actressCarouselVisible) {
        actressCarouselIndex++;
        updateCarouselPosition();
    }
}

function updateCarouselPosition() {
    const actressRow = document.getElementById('actresses');
    if (!actressRow) return;
    
    const itemWidth = 90;
    const translateX = -actressCarouselIndex * itemWidth;
    actressRow.style.transform = `translateX(${translateX}px)`;
}

function openVideoModal(video) {
    currentVideo = video;
    
    document.body.style.overflow = 'hidden';
    const modal = document.getElementById('videoModal');
    if (modal) modal.classList.add('active');
    
    renderVideoDetails(video);
    
    // Reset video player
    const videoPlayer = document.getElementById('videoPlayer');
    if (videoPlayer) {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
        videoPlayer.style.display = 'none';
    }
    
    const playBtn = document.getElementById('playBtn');
    if (playBtn) playBtn.style.display = 'flex';
    
    const thumbnail = document.getElementById('videoThumbnail');
    if (thumbnail) thumbnail.style.display = 'block';
    
    // Ensure main content is visible
    const mainContent = document.getElementById('mainModalContent');
    const previewPage = document.getElementById('modalPreviewPage');
    
    if (mainContent) mainContent.style.display = 'block';
    if (previewPage) previewPage.classList.remove('active');
    
    // Initialize actress carousel
    setTimeout(() => {
        initActressCarousel();
        updateActressCarousel();
    }, 100);
    
    // Render suggestions
    renderNewSuggestions(video);
}

function closeVideoModal() {
    // Stop video if playing
    const videoPlayer = document.getElementById('videoPlayer');
    if (videoPlayer) {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    }
    
    document.body.style.overflow = '';
    const modal = document.getElementById('videoModal');
    if (modal) modal.classList.remove('active');
}

function renderVideoDetails(video) {
    // Set basic details
    const elements = {
        'videoThumbnail': video.thumbnail || video.poster,
        'poster': video.poster || video.thumbnail,
        'title': video.title,
        'desc': video.description,
        'code': video.code,
        'rating': video.rating?.toFixed(2) || '-',
        'studio': video.studio || '-',
        'label': video.label || '-',
        'category': video.category || '-',
        'release': video.release || '-',
        'duration': video.duration ? `${video.duration}m` : '-',
        'versions': video.versions?.join(', ') || '-',
        'quality': video.quality || '-',
        'series': video.series || '-'
    };
    
    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            if (id === 'videoThumbnail' || id === 'poster') {
                element.src = value;
            } else {
                element.textContent = value;
            }
        }
    });
    
    // Make series field clickable for filtering
    const seriesField = document.getElementById('series');
    if (seriesField && seriesField.textContent && seriesField.textContent !== '-') {
        seriesField.classList.add('filterable');
        seriesField.onclick = () => applyFilterFromModal('series', seriesField.textContent);
    }
    
    // Add click handlers to filterable fields
    document.querySelectorAll('.filterable').forEach(field => {
        const filterType = field.dataset.filterType;
        const value = field.textContent;
        if (value && value !== '-') {
            field.onclick = () => applyFilterFromModal(filterType, value);
        }
    });
    
    // Render tags
    const tagsContainer = document.getElementById('tags');
    if (tagsContainer) {
        tagsContainer.innerHTML = '';
        if (video.tags && video.tags.length > 0) {
            video.tags.forEach(tag => {
                const tagElement = document.createElement('div');
                tagElement.className = 'tag';
                tagElement.textContent = tag;
                tagElement.onclick = () => applyFilterFromModal('tags', tag);
                tagsContainer.appendChild(tagElement);
            });
        }
    }
    
    // Render actresses with carousel
    const actressesContainer = document.getElementById('actresses');
    if (actressesContainer) {
        actressesContainer.innerHTML = '';
        if (video.actresses && video.actresses.length > 0) {
            video.actresses.forEach(actress => {
                const actressElement = document.createElement('div');
                actressElement.className = 'actress';
                actressElement.innerHTML = `
                    <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png">
                    <span>${actress}</span>
                `;
                actressElement.onclick = () => applyFilterFromModal('actress', actress);
                actressesContainer.appendChild(actressElement);
            });
        }
    }
    
    // Render video links
    const linksContainer = document.getElementById('videoLinks');
    if (linksContainer) {
        linksContainer.innerHTML = '';
        
        if (video.links) {
            const linkLabels = {
                trailer: '🎬 Trailer',
                censored: '🔞 Censored',
                decensored: '👁️ Decensored',
                uncensored: '👁️ Uncensored',
                subbed: '💬 Subbed'
            };
            
            Object.entries(video.links).forEach(([type, url]) => {
                if (url) {
                    const button = document.createElement('button');
                    button.className = 'action-btn';
                    button.innerHTML = linkLabels[type] || type;
                    button.onclick = (e) => {
                        e.stopPropagation();
                        playVideoLink(url, type);
                    };
                    linksContainer.appendChild(button);
                }
            });
        }
    }
    
    // Render preview images in preview page
    const previewContainer = document.getElementById('previewImagesContainer');
    if (previewContainer) {
        previewContainer.innerHTML = '';
        
        if (video.previews && video.previews.length > 0) {
            video.previews.forEach((preview, index) => {
                const img = document.createElement('img');
                img.className = 'preview-image';
                img.src = preview;
                img.alt = `Preview ${index + 1}`;
                previewContainer.appendChild(img);
            });
        }
    }
}

function applyFilterFromModal(filterType, value) {
    activeFilters[filterType] = [value];
    applyFilters();
    closeVideoModal();
    renderActiveFilters();
    
    if (typeof renderDiscoverGrid === 'function') {
        renderDiscoverGrid();
    }
}

function playVideoLink(url, type) {
    const videoPlayer = document.getElementById('videoPlayer');
    const thumbnail = document.getElementById('videoThumbnail');
    const playBtn = document.getElementById('playBtn');
    
    if (videoPlayer && thumbnail && playBtn) {
        videoPlayer.src = url;
        videoPlayer.style.display = 'block';
        thumbnail.style.display = 'none';
        playBtn.style.display = 'none';
        
        videoPlayer.play().then(() => {
            console.log('Video playing:', url);
        }).catch(error => {
            console.error('Error playing video:', error);
            alert('Unable to play video. Please check the URL.');
        });
    }
}

function playVideo() {
    // Play trailer if available, otherwise play first available link
    if (currentVideo && currentVideo.links) {
        const url = currentVideo.links.trailer || 
                    currentVideo.links.censored || 
                    currentVideo.links.decensored || 
                    currentVideo.links.uncensored || 
                    currentVideo.links.subbed;
        
        if (url) {
            playVideoLink(url, 'trailer');
        }
    }
}

function toggleDescription() {
    const desc = document.getElementById('desc');
    const toggle = document.getElementById('toggleDesc');
    
    if (desc && toggle) {
        desc.classList.toggle('expanded');
        toggle.textContent = desc.classList.contains('expanded') ? 'Show Less' : 'Show More';
    }
}

function showPreviewPage() {
    if (currentVideo && currentVideo.previews && currentVideo.previews.length > 0) {
        const mainContent = document.getElementById('mainModalContent');
        const previewPage = document.getElementById('modalPreviewPage');
        
        if (mainContent) mainContent.style.display = 'none';
        if (previewPage) previewPage.classList.add('active');
    }
}

function goBackFromPreview() {
    const previewPage = document.getElementById('modalPreviewPage');
    const mainContent = document.getElementById('mainModalContent');
    
    if (previewPage) {
        previewPage.classList.add('slide-out');
        setTimeout(() => {
            previewPage.classList.remove('active');
            previewPage.classList.remove('slide-out');
            if (mainContent) mainContent.style.display = 'block';
        }, 300);
    }
}

function renderNewSuggestions(video) {
    // (1) "They Are Also Starred In" - 10 videos featuring the same actress(es)
    const alsoStarredInContainer = document.getElementById('alsoStarredIn');
    if (alsoStarredInContainer) {
        alsoStarredInContainer.innerHTML = '';
        
        if (video.actresses && video.actresses.length > 0) {
            // Find videos with same actresses (excluding current video)
            const alsoStarredIn = videoCollection
                .filter(v => v.id !== video.id && 
                    v.actresses && 
                    v.actresses.some(actress => video.actresses.includes(actress)))
                .slice(0, 10);
            
            if (alsoStarredIn.length > 0) {
                alsoStarredIn.forEach(suggestion => {
                    const item = document.createElement('div');
                    item.className = 'suggestion-item';
                    item.onclick = () => {
                        closeVideoModal();
                        setTimeout(() => openVideoModal(suggestion), 300);
                    };
                    item.innerHTML = `
                        <img class="suggestion-poster" src="${suggestion.poster || suggestion.thumbnail}">
                        <div class="suggestion-code">${suggestion.code}</div>
                    `;
                    alsoStarredInContainer.appendChild(item);
                });
            } else {
                alsoStarredInContainer.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text-muted)">No similar videos found</div>';
            }
        }
    }
    
    // (2) "You May Also Like" - 10 videos from the same studio
    const youMayAlsoLikeContainer = document.getElementById('youMayAlsoLike');
    if (youMayAlsoLikeContainer) {
        youMayAlsoLikeContainer.innerHTML = '';
        
        if (video.studio) {
            const sameStudioVideos = videoCollection
                .filter(v => v.id !== video.id && v.studio === video.studio)
                .slice(0, 10);
            
            if (sameStudioVideos.length > 0) {
                sameStudioVideos.forEach(suggestion => {
                    const item = document.createElement('div');
                    item.className = 'suggestion-item';
                    item.onclick = () => {
                        closeVideoModal();
                        setTimeout(() => openVideoModal(suggestion), 300);
                    };
                    item.innerHTML = `
                        <img class="suggestion-thumbnail" src="${suggestion.thumbnail || suggestion.poster}">
                        <div class="suggestion-code">${suggestion.code}</div>
                    `;
                    youMayAlsoLikeContainer.appendChild(item);
                });
            } else {
                youMayAlsoLikeContainer.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text-muted)">No studio videos found</div>';
            }
        }
    }
}

function openPhotobook(photobook) {
    currentPhotobook = photobook;
    currentPhotobookIndex = 0;
    
    const titleEl = document.getElementById('photobookTitle');
    const imageEl = document.getElementById('currentPhotobookImage');
    const viewer = document.getElementById('photobookViewer');
    
    if (titleEl) titleEl.textContent = photobook.title;
    if (imageEl) imageEl.src = photobook.images[0];
    if (viewer) {
        viewer.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closePhotobookViewer() {
    const viewer = document.getElementById('photobookViewer');
    if (viewer) {
        viewer.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function prevPhotobookImage() {
    if (!currentPhotobook) return;
    currentPhotobookIndex = (currentPhotobookIndex - 1 + currentPhotobook.images.length) % currentPhotobook.images.length;
    const imageEl = document.getElementById('currentPhotobookImage');
    if (imageEl) imageEl.src = currentPhotobook.images[currentPhotobookIndex];
}

function nextPhotobookImage() {
    if (!currentPhotobook) return;
    currentPhotobookIndex = (currentPhotobookIndex + 1) % currentPhotobook.images.length;
    const imageEl = document.getElementById('currentPhotobookImage');
    if (imageEl) imageEl.src = currentPhotobook.images[currentPhotobookIndex];
}

function openPicture(picture) {
    const imageEl = document.getElementById('fullSizeImage');
    const viewer = document.getElementById('imageViewer');
    
    if (imageEl) imageEl.src = picture.url;
    if (viewer) {
        viewer.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeImageViewer() {
    const viewer = document.getElementById('imageViewer');
    if (viewer) {
        viewer.classList.remove('active');
        document.body.style.overflow = '';
    }
}
