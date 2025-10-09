const API_URL = window.location.origin;

let songs = [];
let currentSongIndex = 0;
const audio = document.getElementById('audio');
const cover = document.getElementById('cover');
const title = document.getElementById('title');
const description = document.getElementById('description');
const songList = document.getElementById('songList');
const playButton = document.getElementById('playButton');
const progressBar = document.getElementById('progressBar');
const currentTime = document.getElementById('currentTime');
const duration = document.getElementById('duration');
const toast = document.getElementById('toast');
const searchBar = document.getElementById('searchBar');
const loveButton = document.getElementById('loveButton');
const sidebar = document.getElementById('sidebar');
const myfavPage = document.getElementById('myfavPage');
const myfavList = document.getElementById('myfavList');

let lovedSongs = JSON.parse(localStorage.getItem('lovedSongs')) || [];

// Load songs from listlagu.js
fetch('/listlagu.js')
    .then(response => response.text())
    .then(data => {
        songs = JSON.parse(data);
        renderSongList();
        if (songs.length > 0) {
            loadSong(0);
        }
    })
    .catch(error => {
        console.error('Error loading songs:', error);
        // Fallback to direct initialization if fetch fails
        if (typeof songListData !== 'undefined') {
            songs = songListData;
            renderSongList();
            if (songs.length > 0) {
                loadSong(0);
            }
        }
    });

function updateLoveButton() {
    const currentSong = songs[currentSongIndex];
    const isLoved = lovedSongs.some(song => song.title === currentSong.title);
    if (isLoved) {
        loveButton.classList.add('loved');
    } else {
        loveButton.classList.remove('loved');
    }
}

function loadSong(index) {
    if (index < 0 || index >= songs.length) return;
    
    currentSongIndex = index;
    const song = songs[index];
    cover.src = song.image;
    title.textContent = song.title;
    description.textContent = song.description;
    audio.src = song.file;
    
    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log('Autoplay prevented:', error);
        });
    }
    
    playButton.classList.add('paused');
    document.body.style.backgroundImage = `url('${song.background}')`;
    updateLoveButton();

    const allSongItems = document.querySelectorAll('.song-item');
    allSongItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });

    showToast(`Memutar: ${song.title}`);

    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: song.title,
            artist: song.description,
            artwork: [
                { src: song.image, sizes: '512x512', type: 'image/jpg' }
            ]
        });

        navigator.mediaSession.setActionHandler('play', () => {
            audio.play();
            playButton.classList.add('paused');
        });

        navigator.mediaSession.setActionHandler('pause', () => {
            audio.pause();
            playButton.classList.remove('paused');
        });

        navigator.mediaSession.setActionHandler('previoustrack', () => {
            prevSong();
        });

        navigator.mediaSession.setActionHandler('nexttrack', () => {
            nextSong();
        });
    }
}

function togglePlay() {
    if (audio.paused) {
        audio.play();
        playButton.classList.add('paused');
    } else {
        audio.pause();
        playButton.classList.remove('paused');
    }
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
}

function toggleLove() {
    const song = songs[currentSongIndex];
    const index = lovedSongs.findIndex(s => s.title === song.title);
    
    if (index === -1) {
        lovedSongs.push(song);
        loveButton.classList.add('loved');
        showToast('Ditambahkan ke favorit!');
    } else {
        lovedSongs.splice(index, 1);
        loveButton.classList.remove('loved');
        showToast('Dihapus dari favorit!');
    }
    
    localStorage.setItem('lovedSongs', JSON.stringify(lovedSongs));
    renderMyFavList();
}

function shareSong() {
    const song = songs[currentSongIndex];
    const shareUrl = `${window.location.origin}/?song=${encodeURIComponent(song.title)}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
        showToast('Link lagu disalin!');
    });
}

function renderSongList(songsArray = songs) {
    songList.innerHTML = '';
    songsArray.forEach((song, index) => {
        const songItem = document.createElement('div');
        songItem.className = 'song-item';
        songItem.innerHTML = `
            <img src="${song.image}" alt="${song.title}">
            <div>
                <p>${song.title}</p>
            </div>
        `;
        songItem.addEventListener('click', () => {
            currentSongIndex = songs.indexOf(song);
            loadSong(currentSongIndex);
        });
        songList.appendChild(songItem);
    });
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

function toggleSidebar() {
    sidebar.classList.toggle('open');
}

function openMyFav() {
    myfavPage.classList.add('open');
    renderMyFavList();
}

function closeMyFav() {
    myfavPage.classList.remove('open');
}

function renderMyFavList() {
    myfavList.innerHTML = '';
    if (lovedSongs.length === 0) {
        myfavList.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 40px;">Belum ada lagu favorit. Klik ❤️ untuk menambahkan!</p>';
        return;
    }
    lovedSongs.forEach((song) => {
        const songItem = document.createElement('div');
        songItem.className = 'song-item';
        songItem.innerHTML = `
            <img src="${song.image}" alt="${song.title}">
            <div>
                <p>${song.title}</p>
            </div>
        `;
        songItem.addEventListener('click', () => {
            const songIndex = songs.findIndex(s => s.title === song.title);
            if (songIndex !== -1) {
                currentSongIndex = songIndex;
                loadSong(currentSongIndex);
                closeMyFav();
            }
        });
        myfavList.appendChild(songItem);
    });
}

progressBar.parentElement.addEventListener('click', (e) => {
    const progressWidth = e.target.clientWidth;
    const clickedOffsetX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickedOffsetX / progressWidth) * duration;
});

audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;
    
    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60);
    currentTime.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
});

audio.addEventListener('loadedmetadata', () => {
    const minutes = Math.floor(audio.duration / 60);
    const seconds = Math.floor(audio.duration % 60);
    duration.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
});

audio.addEventListener('ended', () => {
    nextSong();
});

searchBar.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = songs.filter(song => 
        song.title.toLowerCase().includes(query) || 
        song.description.toLowerCase().includes(query)
    );
    renderSongList(filtered);
});

let chatOpen = false;
let lastMessageTime = 0;

function toggleChat() {
    chatOpen = !chatOpen;
    document.getElementById('chatBox').classList.toggle('open');
    if (chatOpen) {
        loadMessages();
        document.getElementById('chatInput').focus();
    }
}

async function loadMessages() {
    try {
        const response = await fetch(`${API_URL}/api/chat/messages`);
        const data = await response.json();
        
        if (data.success) {
            const messagesContainer = document.getElementById('chatMessages');
            messagesContainer.innerHTML = '<div class="chat-message"><div class="chat-message-name">System</div><div class="chat-message-text">Selamat datang di Live Chat! Diskusikan atau request lagu di sini. 🎵</div></div>';
            
            data.messages.forEach(msg => {
                const msgEl = document.createElement('div');
                msgEl.className = 'chat-message';
                const time = new Date(msg.timestamp).toLocaleString('id-ID', {
                    hour: '2-digit',
                    minute: '2-digit'
                });
                msgEl.innerHTML = `
                    <div class="chat-message-name">${msg.name}</div>
                    <div class="chat-message-text">${msg.message}</div>
                    <div class="chat-message-time">${time}</div>
                `;
                messagesContainer.appendChild(msgEl);
            });
            
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    } catch (error) {
        console.error('Error loading messages:', error);
    }
}

async function sendMessage() {
    const nameInput = document.getElementById('chatName');
    const messageInput = document.getElementById('chatInput');
    const name = nameInput.value.trim() || 'Anonymous';
    const message = messageInput.value.trim();

    if (!message) {
        showToast('Pesan tidak boleh kosong!');
        return;
    }

    const now = Date.now();
    if (now - lastMessageTime < 3000) {
        const waitTime = Math.ceil((3000 - (now - lastMessageTime)) / 1000);
        showToast(`Tunggu ${waitTime} detik lagi!`);
        return;
    }

    try {
        const response = await fetch(`${API_URL}/api/chat/send`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, message })
        });

        const data = await response.json();

        if (data.success) {
            messageInput.value = '';
            lastMessageTime = now;
            showToast('Pesan terkirim!');
            setTimeout(loadMessages, 500);
        } else {
            showToast(data.error);
        }
    } catch (error) {
        showToast('Gagal mengirim pesan!');
        console.error('Error sending message:', error);
    }
}

document.getElementById('chatInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

setInterval(() => {
    if (chatOpen) {
        loadMessages();
    }
}, 10000);

const urlParams = new URLSearchParams(window.location.search);
const songParam = urlParams.get('song');
if (songParam && songs.length > 0) {
    const songIndex = songs.findIndex(s => s.title === decodeURIComponent(songParam));
    if (songIndex !== -1) {
        loadSong(songIndex);
    }
}