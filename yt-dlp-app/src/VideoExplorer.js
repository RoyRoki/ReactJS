import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VideoExplorer = () => {
    const [localVideos, setLocalVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get('http://localhost:5000/media');
                setLocalVideos(response.data);
            } catch (err) {
                setError('Error fetching videos');
                console.error(err);
            }
        };

        fetchVideos();
        const intervalId = setInterval(fetchVideos, 5000);

        return () => clearInterval(intervalId);
    }, []);

    const handleVideoSelect = (video) => {
        setSelectedVideo(video);
    };

    return (
        <div className="video-explorer-container">
            <h1>Downloaded Videos</h1>
            {error && <p>{error}</p>}
            <ul className="video-list">
                {localVideos.length > 0 ? (
                    localVideos.map((video, index) => (
                        <li key={index} className="video-item">
                            <button onClick={() => handleVideoSelect(video)}>
                                {video}
                            </button>
                        </li>
                    ))
                ) : (
                    <p>No videos found.</p>
                )}
            </ul>

            {selectedVideo && (
                <div className="video-player">
                    <h2>Now Playing: {selectedVideo}</h2>
                    <video key={selectedVideo} width="600" controls autoplay controlsList="download"> 
                        <source
                            src={`http://localhost:5000/media/${encodeURIComponent(selectedVideo)}`}
                            type="video/mp4"
                        />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}
        </div>
    );
};

export default VideoExplorer;
