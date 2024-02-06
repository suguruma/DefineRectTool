import React, { useState, useEffect, useRef } from 'react';
import './VideoPlayer.css';

const VideoPlayer = () => {
  const [videoSrc, setVideoSrc] = useState('');
  const [videoSize, setVideoSize] = useState(50);
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(300);
  const canvasRef = useRef(null as any);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        const videoURL = URL.createObjectURL(file);
        setVideoSrc(videoURL);
      }
    }
  };

  const handleVideoSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(e.target.value);
    if (size >= 10 && size <= 100) {
      setVideoSize(size);
    }
  };

  const handleVideoLoad = () => {
    const video = document.querySelector('video');
    if (video) {
      setWidth(video.videoWidth);
      setHeight(video.videoHeight);
    }
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const w = parseInt(e.target.value);
    if (w > 0) {
      setWidth(w);
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const h = parseInt(e.target.value);
    if (h > 0) {
      setHeight(h);
    }
  };

  const handleUpdateDimensions = () => {
    const video = document.querySelector('video');
    if (video) {
      setWidth(video.videoWidth);
      setHeight(video.videoHeight);
    }
  };

  const handleCaptureButtonClick = () => {
    const video = document.querySelector('video');
    if (video && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = width;
      canvasRef.current.height = height;

      context.drawImage(video, 0, 0, width, height);

      const link = document.createElement('a');
      link.href = canvasRef.current.toDataURL('image/png');
      link.download = 'capture.png';
      link.click();
    }
  };

  useEffect(() => {
    handleVideoLoad();
  }, [videoSrc]);

  return (
    <div>
      <h2>■ 映像データを入力してください</h2>
      <input type="file" accept="video/*" onChange={handleVideoChange} />
      <br />
      <div style={{ display: 'flex', alignItems: 'center' }}>
　      <label htmlFor="width">スケール調整：</label>
        <input
          type="range"
          min="10"
          max="100"
          value={videoSize}
          onChange={handleVideoSizeChange}
        />
        <span style={{ marginLeft: '10px' }}>{`${videoSize}%`}</span>
      </div>
      <br />
      <video controls src={videoSrc} style={{ width: `${videoSize}%`, height: `${videoSize}%` }} onLoad={handleVideoLoad} />
      <br />
      <div style={{ alignItems: 'center' }}>
        <label htmlFor="width"> 横幅：</label>
        <input type="number" id="width" value={width} onChange={handleWidthChange} style={{ width: '100px' }} />
        <label htmlFor="height"> 高さ：</label>
        <input type="number" id="height" value={height} onChange={handleHeightChange} style={{ width: '100px' }} />
        <button onClick={handleUpdateDimensions}>更新</button>
        <label htmlFor="width">（入力動画サイズ）</label>
      </div>

      <br />
      <button onClick={handleCaptureButtonClick}>キャプチャ</button>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default VideoPlayer;