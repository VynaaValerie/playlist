document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const audioPlayer = document.getElementById('audioPlayer');
    const playButton = document.getElementById('playButton');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const shuffleButton = document.getElementById('shuffleButton');
    const repeatButton = document.getElementById('repeatButton');
    const progressBar = document.getElementById('progressBar');
    const progress = document.getElementById('progress');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');
    const trackTitle = document.getElementById('trackTitle');
    const artistName = document.getElementById('artistName');
    const coverImage = document.getElementById('coverImage');
    const playlistModal = document.getElementById('playlistModal');
    const timerModal = document.getElementById('timerModal');
    const shareModal = document.getElementById('shareModal');
    const playlistItems = document.getElementById('playlistItems');
    const timerDisplay = document.getElementById('timerDisplay');
    const shareUrl = document.getElementById('shareUrl');
    const copyUrl = document.getElementById('copyUrl');
    const chatToggle = document.getElementById('chatToggle');
    const chatContainer = document.getElementById('chatContainer');
    
    // Buttons
    const playlistButtons = [document.getElementById('playlistButton'), document.getElementById('playlistButton2')];
    const timerButton = document.getElementById('timerButton');
    const shareButton = document.getElementById('shareButton');
    const closePlaylist = document.getElementById('closePlaylist');
    const closeTimer = document.getElementById('closeTimer');
    const closeShare = document.getElementById('closeShare');
    const cancelTimer = document.getElementById('cancelTimer');
    const startTimer = document.getElementById('startTimer');
    const timerOptions = document.querySelectorAll('.timer-option');
    
    // Player state
    let currentSongIndex = 0;
    let isPlaying = false;
    let isShuffled = false;
    let repeatMode = 'none'; // 'none', 'all', 'one'
    let timerInterval = null;
    let timerMinutes = 0;
    let originalPlaylist = [...songs];
    let shuffledPlaylist = [];
    let isChatVisible = true;
    
    // Initialize player
    function initPlayer() {
        loadSong(currentSongIndex);
        renderPlaylist();
        updateRepeatButton();
        setupMediaSession();
        
        // Event listeners
        playButton.addEventListener('click', togglePlay);
        prevButton.addEventListener('click', prevSong);
        nextButton.addEventListener('click', nextSong);
        shuffleButton.addEventListener('click', toggleShuffle);
        repeatButton.addEventListener('click', toggleRepeat);
        
        // Progress bar
        progressBar.addEventListener('click', setProgress);
        
        // Audio events
        audioPlayer.addEventListener('loadedmetadata', updateDuration);
        audioPlayer.addEventListener('timeupdate', updateProgress);
        audioPlayer.addEventListener('ended', handleSongEnd);
        
        // Modal buttons
        playlistButtons.forEach(btn => btn.addEventListener('click', openPlaylistModal));
        timerButton.addEventListener('click', openTimerModal);
        shareButton.addEventListener('click', openShareModal);
        closePlaylist.addEventListener('click', closePlaylistModal);
        closeTimer.addEventListener('click', closeTimerModal);
        closeShare.addEventListener('click', closeShareModal);
        cancelTimer.addEventListener('click', cancelTimerFunc);
        startTimer.addEventListener('click', startTimerFunc);
        
        // Timer options
        timerOptions.forEach(option => {
            option.addEventListener('click', function() {
                timerOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                timerMinutes = parseInt(this.getAttribute('data-minutes'));
                updateTimerDisplay();
            });
        });
        
        // Copy URL
        copyUrl.addEventListener('click', copyUrlToClipboard);
        
        // Chat toggle
        chatToggle.addEventListener('click', toggleChat);
    }
    
    // Setup Media Session API
    function setupMediaSession() {
        if ('mediaSession' in navigator) {
            // Set media session metadata
            updateMediaSession();
            
            // Set action handlers
            navigator.mediaSession.setActionHandler('play', function() {
                playSong();
            });
            
            navigator.mediaSession.setActionHandler('pause', function() {
                pauseSong();
            });
            
            navigator.mediaSession.setActionHandler('previoustrack', function() {
                prevSong();
            });
            
            navigator.mediaSession.setActionHandler('nexttrack', function() {
                nextSong();
            });
            
            navigator.mediaSession.setActionHandler('seekbackward', function(details) {
                const skipTime = details.seekOffset || 10;
                audioPlayer.currentTime = Math.max(audioPlayer.currentTime - skipTime, 0);
            });
            
            navigator.mediaSession.setActionHandler('seekforward', function(details) {
                const skipTime = details.seekOffset || 10;
                audioPlayer.currentTime = Math.min(audioPlayer.currentTime + skipTime, audioPlayer.duration);
            });
            
            navigator.mediaSession.setActionHandler('seekto', function(details) {
                if (details.fastSeek && 'fastSeek' in audioPlayer) {
                    audioPlayer.fastSeek(details.seekTime);
                } else {
                    audioPlayer.currentTime = details.seekTime;
                }
            });
        }
    }
    
    // Update Media Session metadata
    function updateMediaSession() {
        if ('mediaSession' in navigator) {
            const song = songs[currentSongIndex];
            
            navigator.mediaSession.metadata = new MediaMetadata({
                title: song.title,
                artist: song.description,
                album: 'PlayListku',
                artwork: [
                    { src: song.image, sizes: '96x96', type: 'image/jpeg' },
                    { src: song.image, sizes: '128x128', type: 'image/jpeg' },
                    { src: song.image, sizes: '192x192', type: 'image/jpeg' },
                    { src: song.image, sizes: '256x256', type: 'image/jpeg' },
                    { src: song.image, sizes: '384x384', type: 'image/jpeg' },
                    { src: song.image, sizes: '512x512', type: 'image/jpeg' }
                ]
            });
            
            // Update playback state
            navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';
        }
    }
    
    // Load song
    function loadSong(index) {
        const song = songs[index];
        audioPlayer.src = song.file;
        trackTitle.textContent = song.title;
        artistName.textContent = song.description;
        coverImage.src = song.image;
        
        // Update share URL
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('track', encodeURIComponent(song.title));
        shareUrl.textContent = currentUrl.toString();
        
        // Update Media Session
        updateMediaSession();
        
        // Update playlist active state
        updatePlaylistActiveState();
    }
    
    // Toggle play/pause
    function togglePlay() {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    }
    
    // Play song
    function playSong() {
        audioPlayer.play();
        isPlaying = true;
        playButton.innerHTML = '<svg class="icon" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
        playButton.setAttribute('aria-label', 'Pause');
        
        // Update Media Session
        if ('mediaSession' in navigator) {
            navigator.mediaSession.playbackState = 'playing';
        }
    }
    
    // Pause song
    function pauseSong() {
        audioPlayer.pause();
        isPlaying = false;
        playButton.innerHTML = '<svg class="icon" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
        playButton.setAttribute('aria-label', 'Play');
        
        // Update Media Session
        if ('mediaSession' in navigator) {
            navigator.mediaSession.playbackState = 'paused';
        }
    }
    
    // Previous song
    function prevSong() {
        currentSongIndex--;
        if (currentSongIndex < 0) {
            currentSongIndex = songs.length - 1;
        }
        loadSong(currentSongIndex);
        if (isPlaying) {
            playSong();
        }
    }
    
    // Next song
    function nextSong() {
        currentSongIndex++;
        if (currentSongIndex >= songs.length) {
            currentSongIndex = 0;
        }
        loadSong(currentSongIndex);
        if (isPlaying) {
            playSong();
        }
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
            // Find current song in shuffled playlist
            const currentSong = songs[currentSongIndex];
            const newIndex = shuffledPlaylist.findIndex(song => song.title === currentSong.title);
            if (newIndex !== -1) {
                // Move current song to the beginning
                shuffledPlaylist.splice(newIndex, 1);
                shuffledPlaylist.unshift(currentSong);
                currentSongIndex = 0;
            }
        } else {
            shuffleButton.style.color = 'white';
            // Restore original order
            const currentSong = songs[currentSongIndex];
            currentSongIndex = originalPlaylist.findIndex(song => song.title === currentSong.title);
        }
    }
    
    // Toggle repeat
    function toggleRepeat() {
        if (repeatMode === 'none') {
            repeatMode = 'all';
        } else if (repeatMode === 'all') {
            repeatMode = 'one';
        } else {
            repeatMode = 'none';
        }
        updateRepeatButton();
    }
    
    // Update repeat button appearance
    function updateRepeatButton() {
        repeatButton.classList.remove('repeat-one', 'repeat-all');
        
        if (repeatMode === 'all') {
            repeatButton.classList.add('repeat-all');
            repeatButton.style.color = '#19d36e';
        } else if (repeatMode === 'one') {
            repeatButton.classList.add('repeat-one');
            repeatButton.style.color = '#19d36e';
        } else {
            repeatButton.style.color = 'white';
        }
    }
    
    // Handle song end
    function handleSongEnd() {
        if (repeatMode === 'one') {
            audioPlayer.currentTime = 0;
            audioPlayer.play();
        } else {
            nextSong();
        }
    }
    
    // Update progress bar
    function updateProgress() {
        const { currentTime, duration } = audioPlayer;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        
        // Update time display
        currentTimeEl.textContent = formatTime(currentTime);
        
        // Update Media Session position state
        if ('mediaSession' in navigator && !isNaN(duration)) {
            navigator.mediaSession.setPositionState({
                duration: duration,
                playbackRate: audioPlayer.playbackRate,
                position: currentTime
            });
        }
    }
    
    // Update duration
    function updateDuration() {
        durationEl.textContent = formatTime(audioPlayer.duration);
    }
    
    // Set progress on click
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audioPlayer.duration;
        
        audioPlayer.currentTime = (clickX / width) * duration;
    }
    
    // Format time (seconds to MM:SS)
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    // Render playlist
    function renderPlaylist() {
        playlistItems.innerHTML = '';
        
        songs.forEach((song, index) => {
            const item = document.createElement('div');
            item.className = 'playlist-item';
            if (index === currentSongIndex) {
                item.classList.add('active');
            }
            
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
                closePlaylistModal();
            });
            
            playlistItems.appendChild(item);
        });
    }
    
    // Update playlist active state
    function updatePlaylistActiveState() {
        const items = document.querySelectorAll('.playlist-item');
        items.forEach((item, index) => {
            if (index === currentSongIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    // Open playlist modal
    function openPlaylistModal() {
        playlistModal.style.display = 'flex';
        renderPlaylist();
    }
    
    // Close playlist modal
    function closePlaylistModal() {
        playlistModal.style.display = 'none';
    }
    
    // Open timer modal
    function openTimerModal() {
        timerModal.style.display = 'flex';
    }
    
    // Close timer modal
    function closeTimerModal() {
        timerModal.style.display = 'none';
    }
    
    // Open share modal
    function openShareModal() {
        shareModal.style.display = 'flex';
        
        // Generate share URL for current song
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('track', encodeURIComponent(songs[currentSongIndex].title));
        shareUrl.textContent = currentUrl.toString();
    }
    
    // Close share modal
    function closeShareModal() {
        shareModal.style.display = 'none';
    }
    
    // Cancel timer
    function cancelTimerFunc() {
        clearInterval(timerInterval);
        timerMinutes = 0;
        timerDisplay.textContent = 'Off';
        timerOptions.forEach(opt => opt.classList.remove('active'));
    }
    
    // Start timer
    function startTimerFunc() {
        if (timerMinutes > 0) {
            timerDisplay.textContent = `${timerMinutes}:00`;
            
            let seconds = timerMinutes * 60;
            
            timerInterval = setInterval(() => {
                seconds--;
                
                const mins = Math.floor(seconds / 60);
                const secs = seconds % 60;
                
                if (seconds <= 0) {
                    clearInterval(timerInterval);
                    pauseSong();
                    timerDisplay.textContent = 'Off';
                    timerMinutes = 0;
                } else {
                    timerDisplay.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
                }
            }, 1000);
            
            closeTimerModal();
        }
    }
    
    // Update timer display
    function updateTimerDisplay() {
        if (timerMinutes > 0) {
            timerDisplay.textContent = `${timerMinutes}:00`;
        } else {
            timerDisplay.textContent = 'Off';
        }
    }
    
    // Copy URL to clipboard
    function copyUrlToClipboard() {
        const url = shareUrl.textContent;
        
        navigator.clipboard.writeText(url).then(() => {
            const originalText = copyUrl.textContent;
            copyUrl.textContent = 'Copied!';
            
            setTimeout(() => {
                copyUrl.textContent = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }
    
    // Toggle chat visibility
    function toggleChat() {
        isChatVisible = !isChatVisible;
        if (isChatVisible) {
            chatContainer.style.display = 'flex';
            chatToggle.innerHTML = '<svg class="icon" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';
        } else {
            chatContainer.style.display = 'none';
            chatToggle.innerHTML = '<svg class="icon" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>';
        }
    }
    
    // Check URL parameters for track
    function checkUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const trackParam = urlParams.get('track');
        
        if (trackParam) {
            const decodedTrack = decodeURIComponent(trackParam);
            const trackIndex = songs.findIndex(song => 
                song.title.toLowerCase() === decodedTrack.toLowerCase()
            );
            
            if (trackIndex !== -1) {
                currentSongIndex = trackIndex;
                loadSong(currentSongIndex);
                
                // Auto-play if user came from a share link
                if (urlParams.get('autoplay') === 'true') {
                    playSong();
                }
            }
        }
    }
    
    // Initialize the player
    initPlayer();
    
    // Check URL parameters on load
    checkUrlParams();
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === playlistModal) {
            closePlaylistModal();
        }
        if (e.target === timerModal) {
            closeTimerModal();
        }
        if (e.target === shareModal) {
            closeShareModal();
        }
    });
});