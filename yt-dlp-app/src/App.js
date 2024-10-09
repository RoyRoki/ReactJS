import React from 'react';
import DownloadForm from './DownloadForm';
import AudioExplorer from './AudioExplorer';
import VideoExplorer from './VideoExplorer';

const App = () => {
    return (
        <div className="app-container">
            <h1 className="text">
                <span className="letter letter-1">R</span>
                <span className="letter letter-2">O</span>
                <span className="letter letter-3">C</span>
                <span className="letter letter-4">K</span>
                <span className="letter letter-5">E</span>
                <span className="letter letter-6">T</span>
                <span className="letter letter-7">-</span>
                <span className="letter letter-8">D</span>
                <span className="letter letter-9">L</span>
            </h1>

            <div className="content">
                <div className="left">
                    <DownloadForm />
                    <AudioExplorer />
                </div>
                <div className="right">
                    <VideoExplorer />
                </div>
            </div>
        </div>
    );
};

export default App;
