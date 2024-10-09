const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg'); // Import fluent-ffmpeg
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/media', express.static('/home/roki/Downloads/yt-dlp')); // Serve media files

// Route to download video or audio
app.post('/download', (req, res) => {
    const { url, quality, type } = req.body;

    // Set format based on user selection
    let format = type === 'video' 
        ? `bestvideo[height<=${quality}]+bestaudio/best` 
        : type === 'audio' 
            ? 'bestaudio[ext=m4a]/bestaudio' 
            : `bestvideo[height<=${quality}]+bestaudio/best`;

    // Execute yt-dlp command
    const command = `yt-dlp -f "${format}" "${url}" -o "/home/roki/Downloads/yt-dlp/%(title)s.%(ext)s"`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).json({ error: stderr });
        }
        // Respond with the URL to the downloaded file
        res.json({ message: `Download completed: `});
    });
});


// Route to list media files
app.get('/media', (req, res) => {
    const directoryPath = '/home/roki/Downloads/yt-dlp'; 
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Filter to include audio and video formats
        const mediaFiles = files.filter(file => {
            return /\.(mp4|mkv|webm|flv|avi|mov|mp3|wav|ogg|m4a)$/.test(file); // Include audio formats
        });

        res.json(mediaFiles); // Return the filtered media files
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
