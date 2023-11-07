import { FC } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import {Button, useTheme} from "@mui/material";
import {Theme} from "@mui/system"

interface MatchingLoadingProps {
  onCancel: () => void;
}

const CircularWithValueLabel: FC<MatchingLoadingProps> = ({onCancel}) => {
  const theme: Theme = useTheme();
  const primaryLight = theme.palette.primary.light;
  const primaryMain = theme.palette.primary.main;
  const renderTime = ({ remainingTime }: { remainingTime: number }) => {
    if (remainingTime === 0) {
      return (
        <div className="timer">
          <div className="text">Sorry!</div>
          <div className="text">Unable to find match.</div>
          <div className="text">Please try again!</div>
        </div>
      );
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
    <div className="timer-wrapper" > 
      <div style={{borderRadius:"100%", display:"inline-block",
      boxShadow: "0 0 25px " + primaryLight + ", 0 0 0 0.2px" + primaryLight}}>
      <CountdownCircleTimer
        trailColor={primaryMain}
        isPlaying
        duration={30}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[30, 20, 10, 0]}
        onComplete={() => ({ shouldRepeat: false, delay: 1 })}
      >
        {renderTime}
      </CountdownCircleTimer>
      </div>
      <p className="info">
        Waiting to be matched...
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