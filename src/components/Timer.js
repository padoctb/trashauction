import React, { useState } from 'react';
import styled from 'styled-components';
import Countdown from 'react-countdown';
import { formatMsDigits } from '../tools';
import playIcon from '../img/icons/play.svg';
import stopIcon from '../img/icons/stop.svg';
import timeUp from '../img/icons/timeup.svg';
import timeDown from '../img/icons/timedown.svg';
import timeUpx2 from '../img/icons/doubleup.svg';

const TimerWrapper = styled.div`
  display: flex;
  font-size: 62px;
  flex-direction: column;
  margin-top: 16px;
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

const TimerContent = ({ time }) => {
  const milliseconds = formatMsDigits(Math.floor(time.milliseconds / 10));
  const timeleft = `${time.formatted.minutes}:${time.formatted.seconds}:${milliseconds}`;

  return (
    <TimerWrapper>
      <TimeleftWrapper>
        <div>
          <TimerBtn className="timer-btn" alt="play" src={playIcon} />
        </div>
        <TimeleftText>{timeleft}</TimeleftText>
        <div>
          <TimerBtn className="timer-btn" alt="stop" src={stopIcon} />
        </div>
      </TimeleftWrapper>
      <TimeleftControl>
        <TimerBtn className="timer-btn" alt="timeup" src={timeUp} />
        <TimerBtn className="timer-btn" alt="timeupx2" src={timeUpx2} />
        <TimerBtn className="timer-btn" alt="timedown" src={timeDown} />
      </TimeleftControl>
    </TimerWrapper>
  );
};

const Timer = () => {
  const [timeleft, changeTimeleft] = useState(Date.now() + 1500000);

  return (
    <Countdown
      changeTimeleft={changeTimeleft}
      precision={3}
      intervalDelay={0}
      renderer={(props) => <TimerContent time={props} />}
      date={timeleft}
    />
  );
};

export default Timer;
