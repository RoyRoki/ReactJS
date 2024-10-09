import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AudioExplorer = () => {
    const [audioFiles, setAudioFiles] = useState([]);
    const [selectedAudio, setSelectedAudio] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAudioFiles = async () => {
            try {
                const response = await axios.get('http://localhost:5000/media');
                const filteredAudioFiles = response.data.filter(file => /\.(m4a|mp3)$/.test(file));
                setAudioFiles(filteredAudioFiles);
            } catch (err) {
                setError('Error fetching audio files');
                console.error(err);
            }
        };

        fetchAudioFiles();
        const intervalId = setInterval(fetchAudioFiles, 5000);

        return () => clearInterval(intervalId);
    }, []);

    const handleAudioSelect = (audio) => {
        setSelectedAudio(audio);
    };

    return (
        <div className="audio-explorer-container">
            <h1>Downloaded Audio</h1>
            {error && <p>{error}</p>}
            <ul className="audio-list">
                {audioFiles.length > 0 ? (
                    audioFiles.map((audio, index) => (
                        <li key={index} className="audio-item">
                            <button onClick={() => handleAudioSelect(audio)}>
                                {audio}
                            </button>
                        </li>
                    ))
                ) : (
                    <p>No audio files found.</p>
                )}
            </ul>

            {selectedAudio && (
                <div className="audio-player">
                    <h2>Now Playing: {selectedAudio}</h2>
                    <audio controls key={selectedAudio}>
                        <source
                            src={`http://localhost:5000/media/${encodeURIComponent(selectedAudio)}`}
                            type="audio/mp4"
                        />
                        Your browser does not support the audio tag.
                    </audio>
                </div>
            )}
        </div>
    );
};

export default AudioExplorer;
