// App.js
import React, { useState, useEffect } from 'react';
import './Anim.css';
import Basketball from './image/Basketball.png';
import Football from './image/Football.png';
import Volleyball from './image/Volleyball.png';
import HumanImg from './image/Human.jpg';
import Cartoon from './image/Cartoon.jpg';
import Logo from './image/Logo.png';

const App = () => {
  const fieldWidth = 700;
  const fieldHeight = 400;
  const ballDiameter = 100;
  const maxX = fieldWidth - ballDiameter - 2;
  const maxY = fieldHeight - ballDiameter - 2;

  // state
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [goRight, setGoRight] = useState(true);
  const [goDown, setGoDown] = useState(true);
  const [running, setRunning] = useState(false);
  const [selectedBall, setSelectedBall] = useState('none');

  // Ball images (imported so the bundler/Vite resolves them)
  const ballImages = {
    none: '',
    basketball: Basketball,
    football: Football,
    volleyball: Volleyball,
    human: HumanImg,
    cartoon: Cartoon,
    logo: Logo
  };

  // move ball
  useEffect(() => {
    const interval = setInterval(() => {
      if (!running) return;

      setX(prevX => {
        if (goRight) {
          if (prevX + 5 >= maxX) {
            setGoRight(false);
            return maxX;
          }
          return prevX + 5;
        } else {
          if (prevX - 5 <= 0) {
            setGoRight(true);
            return 0;
          }
          return prevX - 5;
        }
      });

      setY(prevY => {
        if (goDown) {
          if (prevY + 5 >= maxY) {
            setGoDown(false);
            return maxY;
          }
          return prevY + 5;
        } else {
          if (prevY - 5 <= 0) {
            setGoDown(true);
            return 0;
          }
          return prevY - 5;
        }
      });

    }, 25);

    return () => clearInterval(interval);
  }, [running, goRight, goDown, maxX, maxY]);

  // keyboard support
  useEffect(() => {
    const handleKeyDown = e => {
      switch(e.key) {
        case '0': setSelectedBall('none'); break;
        case '1': setSelectedBall('basketball'); break;
        case '2': setSelectedBall('football'); break;
        case '3': setSelectedBall('volleyball'); break;
        case '4': setSelectedBall('human'); break;
        case '5': setSelectedBall('cartoon'); break;
        case '6': setSelectedBall('logo'); break;
        case ' ': setRunning(prev => !prev); break;
        default: return;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleRunning = () => setRunning(prev => !prev);

  const balls = [
    { id: 'none', name: 'None' },
    { id: 'basketball', name: 'Basketball' },
    { id: 'football', name: 'Football' },
    { id: 'volleyball', name: 'Volleyball' },
    { id: 'human', name: 'Human' },
    { id: 'cartoon', name: 'Cartoon' },
    { id: 'logo', name: 'Logo' }
  ];

  const getBallStyle = () => {
    if (selectedBall === 'none') {
      return {
        background: 'radial-gradient(circle at 30% 30%, #ff7e5f, #feb47b)',
        border: '2px dashed #333'
      };
    }
    return {
      backgroundImage: `url('${ballImages[selectedBall]}')`
    };
  };

  return (
    <div className="app">
      <h1 className="title">Bouncing Ball Animation</h1>
      
      <div className="anim-container">
        {/* Field */}
        <div
          className="anim-field"
          style={{ width: fieldWidth, height: fieldHeight }}
        >
          {/* Ball */}
          <div
            className={`anim-ball ${selectedBall === 'none' ? 'ball-none' : ''}`}
            style={{
              width: ballDiameter,
              height: ballDiameter,
              left: x,
              top: y,
              ...getBallStyle()
            }}
          />
        </div>

        {/* Controls */}
        <div className="controls-container">
          <div className="control-row">
            <button
              className={`btn ${running ? 'btn-warning' : 'btn-success'} toggle-btn`}
              onClick={toggleRunning}
            >
              <span className={`bi ${running ? 'bi-pause-fill' : 'bi-play-fill'}`}></span>
              {running ? ' PAUSE' : ' RUN'}
            </button>

            <div className="current-ball">
              <span className="label">Current Ball:</span>
              <span className="badge bg-primary">
                {selectedBall.charAt(0).toUpperCase() + selectedBall.slice(1)}
              </span>
            </div>
          </div>

          <div className="ball-buttons">
            {balls.map(ball => (
              <button
                key={ball.id}
                className={`btn ${
                  selectedBall === ball.id
                    ? (ball.id === 'none' ? 'btn-secondary' : 'btn-primary')
                    : (ball.id === 'none' ? 'btn-outline-secondary' : 'btn-outline-primary')
                } ball-btn`}
                onClick={() => setSelectedBall(ball.id)}
              >
                {ball.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="instructions">
        <h5><i className="bi bi-keyboard"></i> Keyboard Shortcuts</h5>
        <p>Press number keys to select balls: 
          <span className="keyboard-key">0</span> - None, 
          <span className="keyboard-key">1</span> - Basketball, 
          <span className="keyboard-key">2</span> - Football, 
          <span className="keyboard-key">3</span> - Volleyball, 
          <span className="keyboard-key">4</span> - Human, 
          <span className="keyboard-key">5</span> - Cartoon, 
          <span className="keyboard-key">6</span> - Logo
        </p>
        <p>Press <span className="keyboard-key">Space</span> to Play/Pause the animation</p>
      </div>
    </div>
  );
};

export default App;