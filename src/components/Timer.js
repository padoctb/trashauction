import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useInterval } from '../tools/hooks';
import { formatTime } from '../tools';
import playIcon from '../img/icons/play.svg';
import stopIcon from '../img/icons/stop.svg';
import timeUp from '../img/icons/timeup.svg';
import timeDown from '../img/icons/timedown.svg';
import timeUpx2 from '../img/icons/doubleup.svg';
import pauseIcon from '../img/icons/pause.svg';

const TimerWrapper = styled.div`
  display: flex;
  font-size: 62px;
  flex-direction: column;
  &:hover .timer-btn {
    opacity: 0.7;
  }
`;

const TimeleftWrapper = styled.div`
  display: flex;
`;

const TimeleftText = styled.div`
  margin: 0 10px;
`;

const TimeleftControl = styled.div`
  display: flex;
  justify-content: center;
`;

const TimerBtn = styled.img`
  cursor: pointer;
  transition: 0.2s ease;
  opacity: 0;
  &:hover {
    opacity: 1 !important;
    transform: scale(1.3);
  }
  &:active {
    transform: scale(1);
  }
`;

const interval = 10;

const Timer = ({ initialTime, onTimeEnd }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [prevTime, setPrevTime] = useState(null);
  const [currentMs, setCurrentMs] = useState(initialTime);
  const [timeleft, setTimeleft] = useState(formatTime(initialTime));

  const timeleftTextRef = useRef(null);

  const changeTime = (ms) => {
    const newTime = formatTime(ms);
    setPrevTime(Date.now());
    setCurrentMs(ms);
    setTimeleft(newTime);
  };

  const endTimeAnimate = () => {
    const timeleftText = timeleftTextRef.current;
    const timeleftTextParent = timeleftText.parentNode;
    const timeleftTextCopy = timeleftText.cloneNode(true);

    timeleftTextCopy.className = 'timeleft-copy';

    timeleftTextParent.append(timeleftTextCopy);

    setTimeout(() => timeleftTextCopy.remove(), 1200); //1.2s - transition time
  }

  const endTimeHandler = () => {
    stopTimer();
    endTimeAnimate()
    onTimeEnd();
  }

  useInterval(
    () => {
      let prev = prevTime ? prevTime : Date.now();
      let diffTime = Date.now() - prev;
      let newMs = currentMs - diffTime;

      if (newMs <= 10) endTimeHandler();
      else changeTime(newMs);
    },
    isRunning ? interval : null,
  );

  const handleTime = () => {
    if (!currentMs) return;
    setIsRunning(!isRunning);
    setPrevTime(null);
  };

  const increaseMinute = (e) => {
    const increaseNumber = Number(e.target.getAttribute('data-increase-number'));
    const newMs = currentMs + 60000 * increaseNumber;

    requestAnimationFrame(() => changeTime(newMs))
  };

  const decreaseMinute = () => {
    if (currentMs <= 60000) return;
    const newMs = currentMs - 60000;

    requestAnimationFrame(() => changeTime(newMs))
  };

  const stopTimer = () => {
    changeTime(0);
    setIsRunning(false);
  };

  return (
    <TimerWrapper>
      <TimeleftWrapper>
        <div>
          <TimerBtn
            draggable='false'
            onClick={handleTime}
            className="timer-btn"
            alt="play"
            src={!isRunning ? playIcon : pauseIcon}
          />
        </div>
        <TimeleftText ref={timeleftTextRef}>
          {timeleft && `${timeleft.minutes}:${timeleft.seconds}:${timeleft.milliseconds}`}
        </TimeleftText>
        <div>
          <TimerBtn draggable='false' onClick={stopTimer} className="timer-btn" alt="stop" src={stopIcon} />
        </div>
      </TimeleftWrapper>
      <TimeleftControl>
        <TimerBtn
          onClick={increaseMinute}
          data-increase-number="1"
          className="timer-btn"
          alt="timeup"
          src={timeUp}
          draggable='false'
        />
        <TimerBtn
          onClick={increaseMinute}
          data-increase-number="2"
          className="timer-btn"
          alt="timeupx2"
          src={timeUpx2}
          draggable='false'
        />
        <TimerBtn draggable='false' onClick={decreaseMinute} className="timer-btn" alt="timedown" src={timeDown} />
      </TimeleftControl>
    </TimerWrapper>
  );
};

export default Timer;
