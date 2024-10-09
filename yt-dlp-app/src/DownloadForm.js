import React, { useState } from 'react';
import axios from 'axios';

const DownloadForm = () => {
    const [url, setUrl] = useState('');
    const [quality, setQuality] = useState('1080');
    const [type, setType] = useState('video');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleDownload = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage('');

        try {
            const response = await axios.post('http://localhost:5000/download', {
                url,
                quality,
                type,
            });
            setSuccessMessage('Download started: ' + response.data.message);
        } catch (error) {
            console.error(error);
            setError('Error downloading: ' + (error.response?.data?.error || 'Unknown error occurred'));
        } finally {
            setLoading(false);
        }
    };

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setUrl(text);
        } catch (error) {
            console.error('Failed to read clipboard contents: ', error);
        }
    };

    const handleClear = () => {
        setUrl('');
        setSuccessMessage('');
        setError(null);
    };

    return (
        <div className="download-form-container">
            <h2>Download Video</h2>
            <form onSubmit={handleDownload}>
                <input 
                    type="text" 
                    placeholder="Enter YouTube URL" 
                    value={url} 
                    onChange={(e) => setUrl(e.target.value)} 
                    required 
                />
                <div className="button-group">
                    <button type="button" onClick={handlePaste}>Paste</button>
                    <button type="button" onClick={handleClear}>X</button>
                </div>
                <select value={quality} onChange={(e) => setQuality(e.target.value)}>
                    <option value="360">360p</option>
                    <option value="720">720p</option>
                    <option value="1080">1080p</option>
                </select>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="video">Video</option>
                    <option value="audio">Audio</option>
                    <option value="both">Both</option>
                </select>
                <button type="submit" disabled={loading}>Download</button>
            </form>
            {loading && <p>Downloading...</p>}
            {error && <p style={{ color: 'red' }}>Downloading Failed: {error}</p>}
            {successMessage && <p style={{ color: 'green' }}>Downloaded...</p>}
        </div>
    );
};

export default DownloadForm;
