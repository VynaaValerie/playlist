class SpotifyPlayer {
    constructor() {
        this.audio = document.getElementById('audioPlayer');
        this.currentTrack = null;
        this.currentPlaylist = [];
        this.currentTrackIndex = 0;
        this.isPlaying = false;
        this.isShuffled = false;
        this.isRepeating = false;
        this.favorites = JSON.parse(localStorage.getItem('spotifyFavorites')) || [];
        
        this.initializeElements();
        this.initializeEventListeners();
        this.loadFavorites();
    }

    initializeElements() {
        // Player elements
        this.playButton = document.getElementById('playButton');
        this.prevButton = document.getElementById('prevBtn');
        this.nextButton = document.getElementById('nextBtn');
        this.shuffleButton = document.getElementById('shuffleBtn');
        this.repeatButton = document.getElementById('repeatBtn');
        this.favoriteButton = document.getElementById('favoriteBtn');
        
        // Progress elements
        this.progressBar = document.getElementById('progressBar');
        this.progress = document.getElementById('progress');
        this.currentTimeEl = document.getElementById('currentTime');
        this.durationEl = document.getElementById('duration');
        
        // Track info elements
        this.trackTitle = document.getElementById('trackTitle');
        this.artistName = document.getElementById('artistName');
        this.coverImage = document.getElementById('coverImage');
        
        // Search elements
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.searchResults = document.getElementById('searchResults');
        
        // Section elements
        this.searchSection = document.getElementById('searchSection');
        this.playerSection = document.getElementById('playerSection');
        this.favoritesSection = document.getElementById('favoritesSection');
        
        // Tab buttons
        this.homeBtn = document.getElementById('homeBtn');
        this.searchTabBtn = document.getElementById('searchTabBtn');
        this.favoritesTabBtn = document.getElementById('favoritesTabBtn');
        this.backBtn = document.getElementById('backBtn');
        
        // Playlist info
        this.playlistSubtitle = document.getElementById('playlistSubtitle');
        this.playlistTitle = document.getElementById('playlistTitle');
    }

    initializeEventListeners() {
        // Player controls
        this.playButton.addEventListener('click', () => this.togglePlay());
        this.prevButton.addEventListener('click', () => this.previousTrack());
        this.nextButton.addEventListener('click', () => this.nextTrack());
        this.shuffleButton.addEventListener('click', () => this.toggleShuffle());
        this.repeatButton.addEventListener('click', () => this.toggleRepeat());
        this.favoriteButton.addEventListener('click', () => this.toggleFavorite());

        // Progress bar
        this.progressBar.addEventListener('click', (e) => this.seek(e));
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
        this.audio.addEventListener('ended', () => this.handleTrackEnd());

        // Search
        this.searchBtn.addEventListener('click', () => this.search());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.search();
        });

        // Navigation
        this.homeBtn.addEventListener('click', () => this.showHome());
        this.searchTabBtn.addEventListener('click', () => this.showSearch());
        this.favoritesTabBtn.addEventListener('click', () => this.showFavorites());
        this.backBtn.addEventListener('click', () => this.goBack());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                this.togglePlay();
            } else if (e.code === 'ArrowLeft') {
                e.preventDefault();
                this.seekBackward();
            } else if (e.code === 'ArrowRight') {
                e.preventDefault();
                this.seekForward();
            }
        });

        // Drag progress bar
        this.setupProgressDrag();
    }

    setupProgressDrag() {
        let isDragging = false;

        const startDrag = (e) => {
            isDragging = true;
            this.updateProgressDrag(e);
            document.addEventListener('mousemove', this.updateProgressDrag.bind(this));
            document.addEventListener('touchmove', this.updateProgressDrag.bind(this));
            document.addEventListener('mouseup', stopDrag);
            document.addEventListener('touchend', stopDrag);
        };

        const stopDrag = () => {
            isDragging = false;
            document.removeEventListener('mousemove', this.updateProgressDrag.bind(this));
            document.removeEventListener('touchmove', this.updateProgressDrag.bind(this));
            document.removeEventListener('mouseup', stopDrag);
            document.removeEventListener('touchend', stopDrag);
        };

        this.progressBar.addEventListener('mousedown', startDrag);
        this.progressBar.addEventListener('touchstart', startDrag);
    }

    updateProgressDrag(e) {
        if (!this.audio.src) return;
        
        const rect = this.progressBar.getBoundingClientRect();
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        let percentage = (clientX - rect.left) / rect.width;
        percentage = Math.max(0, Math.min(1, percentage));
        
        this.progress.style.width = `${percentage * 100}%`;
        this.audio.currentTime = percentage * this.audio.duration;
        this.updateTimeDisplay();
    }

    async search() {
        const query = this.searchInput.value.trim();
        if (!query) return;

        this.searchResults.innerHTML = '<div class="loading">Mencari...</div>';

        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&limit=20`);
            const data = await response.json();

            if (data.tracks && data.tracks.items) {
                this.displaySearchResults(data.tracks.items);
            } else {
                this.searchResults.innerHTML = '<div class="loading">Tidak ada hasil ditemukan</div>';
            }
        } catch (error) {
            console.error('Search error:', error);
            this.searchResults.innerHTML = '<div class="loading">Error saat mencari</div>';
        }
    }

    displaySearchResults(tracks) {
        this.searchResults.innerHTML = '';
        this.currentPlaylist = tracks;

        if (tracks.length === 0) {
            this.searchResults.innerHTML = '<div class="loading">Tidak ada hasil ditemukan</div>';
            return;
        }

        tracks.forEach((track, index) => {
            const trackElement = document.createElement('div');
            trackElement.className = 'track-item';
            trackElement.innerHTML = `
                <img src="${track.album.images[2]?.url || track.album.images[1]?.url || track.album.images[0]?.url || ''}" 
                     alt="${track.album.name}"
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjMzMzIi8+CjxwYXRoIGQ9Ik0yNSAyNUwxOCAyMFYzMEwyNSAyNVoiIGZpbGw9IiM2NjYiLz4KPC9zdmc+'">
                <div class="track-info-small">
                    <div class="track-title-small">${this.escapeHtml(track.name)}</div>
                    <div class="artist-name-small">${this.escapeHtml(track.artists.map(artist => artist.name).join(', '))}</div>
                </div>
            `;
            
            trackElement.addEventListener('click', () => {
                this.playTrack(track, index);
                this.showPlayer();
                this.playlistSubtitle.textContent = 'HASIL PENCARIAN';
                this.playlistTitle.textContent = `"${this.searchInput.value}"`;
            });

            this.searchResults.appendChild(trackElement);
        });
    }

    playTrack(track, index = 0) {
        this.currentTrack = track;
        this.currentTrackIndex = index;

        // Update UI
        this.trackTitle.textContent = track.name;
        this.artistName.textContent = track.artists.map(artist => artist.name).join(', ');
        
        const imageUrl = track.album.images[1]?.url || track.album.images[0]?.url;
        if (imageUrl) {
            this.coverImage.src = imageUrl;
            this.coverImage.style.display = 'block';
        } else {
            this.coverImage.style.display = 'none';
        }

        // Set audio source (using preview URL)
        if (track.preview_url) {
            this.audio.src = track.preview_url;
            this.audio.load();
            this.play();
        } else {
            // If no preview, show message and don't play
            this.trackTitle.textContent = track.name + ' (No Preview)';
            this.audio.src = '';
            this.pause();
        }

        // Update favorite button
        this.updateFavoriteButton();

        // Get recommendations based on this track
        this.getRecommendations(track.id);
    }

    async getRecommendations(trackId) {
        try {
            const response = await fetch(`/api/recommendations?seed_tracks=${trackId}&limit=10`);
            const data = await response.json();
            
            if (data.tracks) {
                // Store recommendations for radio feature
                this.recommendations = data.tracks;
            }
        } catch (error) {
            console.error('Recommendations error:', error);
        }
    }

    togglePlay() {
        if (!this.audio.src) {
            if (this.currentPlaylist.length > 0) {
                this.playTrack(this.currentPlaylist[0], 0);
            }
            return;
        }

        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    play() {
        if (this.audio.src) {
            this.audio.play().then(() => {
                this.isPlaying = true;
                this.playButton.innerHTML = '<svg class="icon" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
                this.playButton.setAttribute('aria-label', 'Pause');
            }).catch(error => {
                console.error('Play error:', error);
            });
        }
    }

    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.playButton.innerHTML = '<svg class="icon" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
        this.playButton.setAttribute('aria-label', 'Play');
    }

    nextTrack() {
        if (this.currentPlaylist.length > 0) {
            let nextIndex;
            
            if (this.isShuffled) {
                do {
                    nextIndex = Math.floor(Math.random() * this.currentPlaylist.length);
                } while (nextIndex === this.currentTrackIndex && this.currentPlaylist.length > 1);
            } else {
                nextIndex = (this.currentTrackIndex + 1) % this.currentPlaylist.length;
            }
            
            this.playTrack(this.currentPlaylist[nextIndex], nextIndex);
        }
    }

    previousTrack() {
        if (this.currentPlaylist.length > 0) {
            let prevIndex;
            
            if (this.isShuffled) {
                do {
                    prevIndex = Math.floor(Math.random() * this.currentPlaylist.length);
                } while (prevIndex === this.currentTrackIndex && this.currentPlaylist.length > 1);
            } else {
                prevIndex = (this.currentTrackIndex - 1 + this.currentPlaylist.length) % this.currentPlaylist.length;
            }
            
            this.playTrack(this.currentPlaylist[prevIndex], prevIndex);
        }
    }

    toggleShuffle() {
        this.isShuffled = !this.isShuffled;
        this.shuffleButton.classList.toggle('active', this.isShuffled);
    }

    toggleRepeat() {
        this.isRepeating = !this.isRepeating;
        this.repeatButton.classList.toggle('active', this.isRepeating);
        this.audio.loop = this.isRepeating;
    }

    toggleFavorite() {
        if (!this.currentTrack) return;

        const trackId = this.currentTrack.id;
        const isFavorite = this.favorites.some(fav => fav.id === trackId);

        if (isFavorite) {
            this.favorites = this.favorites.filter(fav => fav.id !== trackId);
        } else {
            this.favorites.push({
                ...this.currentTrack,
                addedAt: new Date().toISOString()
            });
        }

        localStorage.setItem('spotifyFavorites', JSON.stringify(this.favorites));
        this.updateFavoriteButton();
        this.loadFavorites(); // Refresh favorites list
    }

    updateFavoriteButton() {
        if (!this.currentTrack) return;

        const isFavorite = this.favorites.some(fav => fav.id === this.currentTrack.id);
        this.favoriteButton.classList.toggle('active', isFavorite);
        
        if (isFavorite) {
            this.favoriteButton.innerHTML = '<svg class="icon" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
        } else {
            this.favoriteButton.innerHTML = '<svg class="icon" viewBox="0 0 24 24"><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>';
        }
    }

    seek(e) {
        if (!this.audio.src) return;
        
        const rect = this.progressBar.getBoundingClientRect();
        const percentage = (e.clientX - rect.left) / rect.width;
        this.audio.currentTime = percentage * this.audio.duration;
    }

    seekBackward() {
        if (!this.audio.src) return;
        this.audio.currentTime = Math.max(0, this.audio.currentTime - 10);
    }

    seekForward() {
        if (!this.audio.src) return;
        this.audio.currentTime = Math.min(this.audio.duration, this.audio.currentTime + 10);
    }

    updateProgress() {
        if (!this.audio.src) return;
        
        const percentage = (this.audio.currentTime / this.audio.duration) * 100;
        this.progress.style.width = `${percentage}%`;
        this.updateTimeDisplay();
    }

    updateDuration() {
        this.updateTimeDisplay();
    }

    updateTimeDisplay() {
        if (!this.audio.src) return;
        
        this.currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
        this.durationEl.textContent = this.formatTime(this.audio.duration);
    }

    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    handleTrackEnd() {
        if (this.isRepeating) {
            this.audio.currentTime = 0;
            this.audio.play();
        } else {
            this.nextTrack();
        }
    }

    loadFavorites() {
        const favoritesList = document.getElementById('favoritesList');
        favoritesList.innerHTML = '';

        if (this.favorites.length === 0) {
            favoritesList.innerHTML = '<div class="loading">Belum ada lagu favorit</div>';
            return;
        }

        this.favorites.forEach((track, index) => {
            const trackElement = document.createElement('div');
            trackElement.className = 'track-item';
            trackElement.innerHTML = `
                <img src="${track.album.images[2]?.url || track.album.images[1]?.url || track.album.images[0]?.url || ''}" 
                     alt="${track.album.name}"
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjMzMzIi8+CjxwYXRoIGQ9Ik0yNSAyNUwxOCAyMFYzMEwyNSAyNVoiIGZpbGw9IiM2NjYiLz4KPC9zdmc+='">
                <div class="track-info-small">
                    <div class="track-title-small">${this.escapeHtml(track.name)}</div>
                    <div class="artist-name-small">${this.escapeHtml(track.artists.map(artist => artist.name).join(', '))}</div>
                </div>
            `;
            
            trackElement.addEventListener('click', () => {
                this.currentPlaylist = this.favorites;
                this.playTrack(track, index);
                this.showPlayer();
                this.playlistSubtitle.textContent = 'LAGU FAVORIT';
                this.playlistTitle.textContent = `Favorites (${this.favorites.length} lagu)`;
            });

            favoritesList.appendChild(trackElement);
        });
    }

    showHome() {
        this.hideAllSections();
        this.searchSection.style.display = 'block';
        this.playerSection.style.display = 'block';
        this.updateActiveTab(this.homeBtn);
    }

    showSearch() {
        this.hideAllSections();
        this.searchSection.style.display = 'block';
        this.updateActiveTab(this.searchTabBtn);
    }

    showPlayer() {
        this.hideAllSections();
        this.playerSection.style.display = 'block';
    }

    showFavorites() {
        this.hideAllSections();
        this.favoritesSection.style.display = 'block';
        this.updateActiveTab(this.favoritesTabBtn);
    }

    hideAllSections() {
        this.searchSection.style.display = 'none';
        this.playerSection.style.display = 'none';
        this.favoritesSection.style.display = 'none';
    }

    updateActiveTab(activeBtn) {
        [this.homeBtn, this.searchTabBtn, this.favoritesTabBtn].forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }

    goBack() {
        if (this.favoritesSection.style.display !== 'none') {
            this.showHome();
        } else if (this.searchSection.style.display !== 'none' && this.playerSection.style.display === 'none') {
            this.showHome();
        } else {
            this.showSearch();
        }
    }

    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}

// Initialize the player when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SpotifyPlayer();
});

// Service Worker for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}