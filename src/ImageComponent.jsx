import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import './ImageComponent.css';

function ImageComponent() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [rect, setRect] = useState(null);
    const [startPoint, setStartPoint] = useState(null);
    const hiddenLinkRef = useRef(null);
  
    const handleImageChange = (e) => {
        if (e.target.files[0].type.startsWith('image/')) {
          setSelectedImage(URL.createObjectURL(e.target.files[0]));
        } else {
          alert('Please select an image file.');
        }
      };
  
      const handleImageDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files[0].type.startsWith('image/')) {
          setSelectedImage(URL.createObjectURL(e.dataTransfer.files[0]));
        } else {
          alert('Please drop an image file.');
        }
      };

    const handleMouseDown = (e) => {
      e.preventDefault();
      const rect = e.target.getBoundingClientRect();
      const x = Math.round(e.clientX - rect.left);
      const y = Math.round(e.clientY - rect.top);
      setStartPoint({ x, y });
    };
  
    const handleMouseUp = (e) => {
        if (startPoint) {
            e.preventDefault();
            const rect = e.target.getBoundingClientRect();
            const x = Math.round(e.clientX - rect.left);
            const y = Math.round(e.clientY - rect.top);
            setRect({ x1: startPoint.x, y1: startPoint.y, x2: x, y2: y });
            setStartPoint(null);
        }
    };

    const saveToFile = () => {
        const data = `Top Left: (${rect.x1}, ${rect.y1})
Bottom Right: (${rect.x2}, ${rect.y2})
Width: (${rect.x2-rect.x1})
Height: (${rect.y2-rect.y1})`;
        const blob = new Blob([data], {type: 'text/plain'});
        const url = URL.createObjectURL(blob);
        hiddenLinkRef.current.href = url;
        hiddenLinkRef.current.download = 'rectangle_coordinates.txt';
        hiddenLinkRef.current.click();
    };

    return (
      <div>
        <h2>■ 画像データを入力してください</h2>
        <input type="file" onChange={handleImageChange} />
        <h4>画像入力後、マウスを使って四角形を書いて下さい</h4>
        <div 
        onDrop={handleImageDrop} 
        onDragOver={(e) => e.preventDefault()} 
        style={{ position: 'relative', width: '100%', height: '100%' }}
        >
        {selectedImage && (
          <div style={{ position: 'relative' }}>
            <img src={selectedImage} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} alt="Selected" />
            {rect && (
              <div
                style={{
                  position: 'absolute',
                  top: rect.y1,
                  left: rect.x1,
                  width: rect.x2 - rect.x1,
                  height: rect.y2 - rect.y1,
                  border: '1px solid red',
                }}
              />
            )}
          </div>
        )}
        </div>
        {rect && (
          <div>
            <h2>■ 矩形データ一覧</h2>
            <p>Top Left: ({rect.x1}, {rect.y1})</p>
            <p>Bottom Right: ({rect.x2}, {rect.y2})</p>
            <p>Width: ({rect.x2-rect.x1})</p>
            <p>Height: ({rect.y2-rect.y1})</p>
            <button onClick={saveToFile}>矩形データ保存</button>
          </div>
        )}
        <a ref={hiddenLinkRef} style={{display: 'none'}}/>
      </div>
    );
  }
ReactDOM.render(<ImageComponent />, document.getElementById('root'));

export default ImageComponent ;
