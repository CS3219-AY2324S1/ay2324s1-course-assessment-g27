import { FC } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import {Button} from "@mui/material";

interface MatchingLoadingProps {
  onCancel: () => void;
}

const CircularWithValueLabel: FC<MatchingLoadingProps> = ({onCancel}) => {
  const renderTime = ({ remainingTime }: { remainingTime: number }) => {
    if (remainingTime === 0) {
      return <div className="timer">Sorry unable to find match. Please try again!</div>;
    }

    return (
      <div className="timer">
        <div className="text">Remaining</div>
        <div className="value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
  };

  return (
    <div className="timer-wrapper">
      <CountdownCircleTimer
        isPlaying
        duration={30}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[30, 20, 10, 0]}
        onComplete={() => ({ shouldRepeat: false, delay: 1 })}
      >
        {renderTime}
      </CountdownCircleTimer>
      <p className="info">
        Waiting to be match... 
      </p>
      <Button
        onClick={onCancel}
      >
        Cancel
      </Button>
    </div>
  );
};

export default CircularWithValueLabel;