# PlaylistKu - Music Player

## Overview
PlaylistKu is a modern, responsive web-based music player application that allows users to play, organize, and favorite Indonesian music tracks. The application features a clean, dark-themed UI with playlist management, search functionality, and favorites system.

## Project Information
- **Author**: Xwby268 (@xwbytech)
- **Type**: Static Web Application
- **Language**: HTML, CSS, JavaScript
- **Last Updated**: October 9, 2025

## Architecture
- **Frontend**: Pure vanilla JavaScript (no frameworks)
- **Styling**: Embedded CSS in HTML
- **Audio Storage**: Local `/audio` directory with MP3 files
- **Playlist Data**: `listlagu.js` - JSON array of song metadata
- **Storage**: LocalStorage for favorites persistence

## Features
- Music playback with custom controls
- Progress bar with seek functionality
- Next/Previous track navigation
- Favorite songs (saved to localStorage)
- Search functionality
- Responsive design
- Media Session API integration for mobile/browser controls
- Background image changes per song
- Toast notifications

## File Structure
```
/
├── index.html          # Main application file
├── listlagu.js         # Song playlist data (JSON)
├── audio/              # MP3 audio files directory
└── README.md           # Project credits
```

## Recent Changes
- 2025-10-09: Initial Replit setup completed
- Configured Python HTTP server for local file serving
- Set up workflow on port 5000 for frontend

## Technical Notes
- Uses Python's built-in HTTP server to serve static files and audio
- Audio files are referenced with absolute paths from `/audio/` directory
- LocalStorage used for persisting favorite songs
- Media Session API provides native browser/OS media controls
