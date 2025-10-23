document.addEventListener('DOMContentLoaded', function() {
    // Elemen DOM
    const audioPlayer = document.getElementById('audioPlayer');
    const playButton = document.getElementById('playButton');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const shuffleButton = document.getElementById('shuffleButton');
    const progressBar = document.getElementById('progressBar');
    const progress = document.getElementById('progress');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');
    const trackTitle = document.getElementById('trackTitle');
    const artistName = document.getElementById('artistName');
    const coverImage = document.getElementById('coverImage');
    const playlistButton = document.getElementById('playlistButton');
    const playlistButton2 = document.getElementById('playlistButton2');
    const playlistModal = document.getElementById('playlistModal');
    const closePlaylist = document.getElementById('closePlaylist');
    const playlistItems = document.getElementById('playlistItems');

    // Variabel state
    let isPlaying = false;
    let isDragging = false;
    let currentSongIndex = 0;
    let isShuffled = false;
    let originalPlaylist = [...songs];
    let shuffledPlaylist = [];

    // Inisialisasi
    function init() {
        loadSong(currentSongIndex);
        renderPlaylist();
        
        // Event listeners
        playButton.addEventListener('click', togglePlay);
        prevButton.addEventListener('click', prevSong);
        nextButton.addEventListener('click', nextSong);
        shuffleButton.addEventListener('click', toggleShuffle);
        
        // Progress bar events
        progressBar.addEventListener('mousedown', startDrag);
        progressBar.addEventListener('touchstart', startDrag);
        
        // Playlist modal events
        playlistButton.addEventListener('click', openPlaylist);
        playlistButton2.addEventListener('click', openPlaylist);
        closePlaylist.addEventListener('click', closePlaylistModal);
        
        // Audio events
        audioPlayer.addEventListener('loadedmetadata', updateDuration);
        audioPlayer.addEventListener('timeupdate', updateProgress);
        audioPlayer.addEventListener('ended', nextSong);
        
        // Keyboard support
        document.addEventListener('keydown', handleKeydown);
        
        // Enable buttons
        prevButton.disabled = false;
        nextButton.disabled = false;
    }

    // Load song
    function loadSong(index) {
        const song = songs[index];
        audioPlayer.src = song.file;
        trackTitle.textContent = song.title;
        
        // Extract artist name from title (assuming format "Song - Artist")
        const titleParts = song.title.split(' - ');
        if (titleParts.length > 1) {
            artistName.textContent = titleParts[1];
        } else {
            artistName.textContent = "Unknown Artist";
        }
        
        coverImage.src = song.image;
        coverImage.alt = `${song.title} Cover`;
        
        // Reset progress
        progress.style.width = '0%';
        currentTimeEl.textContent = '0:00';
        
        // Auto play if already playing
        if (isPlaying) {
            audioPlayer.play();
        }
    }

    // Toggle play/pause
    function togglePlay() {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
        
        // Animation
        playButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            playButton.style.transform = 'scale(1)';
        }, 150);
    }

    function playSong() {
        isPlaying = true;
        audioPlayer.play();
        playButton.innerHTML = `<svg class="icon" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
        playButton.setAttribute('aria-label', 'Pause');
    }

    function pauseSong() {
        isPlaying = false;
        audioPlayer.pause();
        playButton.innerHTML = `<svg class="icon" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`;
        playButton.setAttribute('aria-label', 'Play');
    }

    // Previous song
    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(currentSongIndex);
        if (isPlaying) {
            playSong();
        }
        updateActivePlaylistItem();
    }

    // Next song
    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);
        if (isPlaying) {
            playSong();
        }
        updateActivePlaylistItem();
    }

    // Toggle shuffle
    function toggleShuffle() {
        isShuffled = !isShuffled;
        
        if (isShuffled) {
            shuffleButton.style.color = '#19d36e';
            // Create shuffled playlist
            shuffledPlaylist = [...songs];
            for (let i = shuffledPlaylist.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledPlaylist[i], shuffledPlaylist[j]] = [shuffledPlaylist[j], shuffledPlaylist[i]];
            }
            // Update current index in shuffled playlist
            const currentSong = songs[currentSongIndex];
            currentSongIndex = shuffledPlaylist.findIndex(song => song.title === currentSong.title);
            songs.splice(0, songs.length, ...shuffledPlaylist);
        } else {
            shuffleButton.style.color = 'white';
            // Restore original order
            const currentSong = songs[currentSongIndex];
            songs.splice(0, songs.length, ...originalPlaylist);
            currentSongIndex = songs.findIndex(song => song.title === currentSong.title);
        }
        
        renderPlaylist();
        updateActivePlaylistItem();
    }

    // Update progress bar
    function updateProgress() {
        if (isDragging) return;
        
        const { currentTime, duration } = audioPlayer;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        
        currentTimeEl.textContent = formatTime(currentTime);
    }

    // Update duration
    function updateDuration() {
        durationEl.textContent = formatTime(audioPlayer.duration);
    }

    // Format time (seconds to mm:ss)
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Progress bar dragging
    function startDrag(e) {
        isDragging = true;
        updateProgressPosition(e);
        document.addEventListener('mousemove', updateProgressPosition);
        document.addEventListener('touchmove', updateProgressPosition);
        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('touchend', stopDrag);
    }

    function stopDrag() {
        isDragging = false;
        document.removeEventListener('mousemove', updateProgressPosition);
        document.removeEventListener('touchmove', updateProgressPosition);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchend', stopDrag);
    }

    function updateProgressPosition(e) {
        if (!isDragging) return;
        
        const rect = progressBar.getBoundingClientRect();
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        let percentage = (clientX - rect.left) / rect.width;
        percentage = Math.max(0, Math.min(1, percentage));
        
        progress.style.width = `${percentage * 100}%`;
        
        // Update audio time
        if (audioPlayer.duration) {
            audioPlayer.currentTime = percentage * audioPlayer.duration;
        }
    }

    // Playlist modal
    function openPlaylist() {
        playlistModal.style.display = 'flex';
    }

    function closePlaylistModal() {
        playlistModal.style.display = 'none';
    }

    // Render playlist items
    function renderPlaylist() {
        playlistItems.innerHTML = '';
        
        songs.forEach((song, index) => {
            const item = document.createElement('div');
            item.className = `playlist-item ${index === currentSongIndex ? 'active' : ''}`;
            item.innerHTML = `
                <img src="${song.image}" alt="${song.title}">
                <div class="playlist-item-info">
                    <div class="playlist-item-title">${song.title}</div>
                    <div class="playlist-item-artist">${song.description}</div>
                </div>
            `;
            
            item.addEventListener('click', () => {
                currentSongIndex = index;
                loadSong(currentSongIndex);
                if (isPlaying) {
                    playSong();
                }
                updateActivePlaylistItem();
                closePlaylistModal();
            });
            
            playlistItems.appendChild(item);
        });
    }

    // Update active playlist item
    function updateActivePlaylistItem() {
        const items = document.querySelectorAll('.playlist-item');
        items.forEach((item, index) => {
            if (index === currentSongIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // Keyboard support
    function handleKeydown(e) {
        if (e.code === 'Space') {
            e.preventDefault();
            togglePlay();
        } else if (e.code === 'ArrowLeft') {
            e.preventDefault();
            // Seek backward
            if (audioPlayer.duration) {
                audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 5);
            }
        } else if (e.code === 'ArrowRight') {
            e.preventDefault();
            // Seek forward
            if (audioPlayer.duration) {
                audioPlayer.currentTime = Math.min(audioPlayer.duration, audioPlayer.currentTime + 5);
            }
        } else if (e.code === 'ArrowUp') {
            e.preventDefault();
            prevSong();
        } else if (e.code === 'ArrowDown') {
            e.preventDefault();
            nextSong();
        }
    }

    // Initialize the player
    init();
});