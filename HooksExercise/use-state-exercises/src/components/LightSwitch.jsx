//LightSwitch component using useState to toggle light on and off
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

function LightSwitch() {
  //Giữ nguyên logic
  const [isLightOn, setIsLightOn] = useState(false);
  const toggleLight = () => setIsLightOn(!isLightOn);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
    
      <h2>Công Tắc Đèn</h2>

      {/* Bóng đèn (icon SVG + hiệu ứng) */}
      <div className="light-box">
        <svg
          className={`bulb ${isLightOn ? 'on' : ''}`}
          viewBox="0 0 64 64"
          aria-hidden="true"
        >
          {/* Bóng chính */}
          <circle cx="32" cy="28" r="18" className="glass" />
          {/* Tia sáng */}
          <g className="ray">
            <line x1="32" y1="3"  x2="32" y2="12" />
            <line x1="32" y1="44" x2="32" y2="53" />
            <line x1="9"  y1="28" x2="18" y2="28" />
            <line x1="46" y1="28" x2="55" y2="28" />
            <line x1="14" y1="14" x2="20" y2="20" />
            <line x1="44" y1="14" x2="38" y2="20" />
            <line x1="14" y1="42" x2="20" y2="36" />
            <line x1="44" y1="42" x2="38" y2="36" />
          </g>
          {/* Đui đèn */}
          <rect x="26" y="44" width="12" height="6" rx="2" className="base" />
          <rect x="24" y="50" width="16" height="6" rx="3" className="cap" />
        </svg>
      </div>

      {/* Công tắc (dùng Button, giữ nguyên onClick) */}
      <Button
        onClick={toggleLight}
        aria-pressed={isLightOn}
        className={`switch-btn ${isLightOn ? 'on' : ''}`}
        variant="light"
      >
        <span className="knob" />
        <span className="sr-only">{isLightOn ? 'Tắt đèn' : 'Bật đèn'}</span>
      </Button>

      {/* Trạng thái (giữ nguyên nội dung hiển thị) */}
      <p style={{ fontSize: '18px', marginTop: 12 }}>
        Đèn hiện đang: <strong>{isLightOn ? 'Bật' : 'Tắt'}</strong>
      </p>
    </div>
  );
}

export default LightSwitch;
