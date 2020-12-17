import React, { useRef, useState } from "react";
import styled from "styled-components";
import "./styles.css";

const StyledButton = styled.button`
  padding: 10px 20px;
  color: black;
  border: none;
  outline: none;
  background-color: #fff3b2;
  margin: 2px;
  cursor: pointer;
`;
const H1 = styled.h1`
  color: white;
`;
export default function App() {
  const [timerActive, setTimerActive] = useState(false);
  const [timerPaused, setTimerPaused] = useState(false);
  const [time, setTime] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const ref = useRef(null);

  const handleStart = () => {
    console.log("Timer Started");
    setTimerActive(true);
    setTimerPaused(false);
    ref.current = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
  };
  if (time === 60) {
    setTime(0);
    setMinutes((minutes) => minutes + 1);
  } else if (minutes === 60) {
    setTime(0);
    setMinutes(0);
    setHours((hours) => hours + 1);
  }

  const handleResume = () => {
    console.log("Timer Resumed");
    setTimerPaused(false);
    setTimerActive(true);
    ref.current = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
  };
  const handlePause = () => {
    console.log("Timer Paused");
    setTimerPaused(true);
    setTimerActive(false);
    clearInterval(ref.current);
  };
  const handleReset = () => {
    console.log("Timer Reset");
    setTimerActive(false);
    setTimerPaused(false);
    handlePause();
    setTime(0);
    setMinutes(0);
    setHours(0);
  };
  return (
    <div className="App">
      <H1>Timer</H1>
      <H1>
        {`0${hours}`.slice(-2)}: {`0${minutes}`.slice(-2)}:{" "}
        {`0${time}`.slice(-2)}
      </H1>
      <StyledButton onClick={handleStart} disabled={timerActive}>
        Start
      </StyledButton>
      <StyledButton onClick={timerPaused ? handleResume : handlePause}>
        {timerActive ? "Pause" : "Resume"}
      </StyledButton>
      <StyledButton onClick={handleReset}>Reset</StyledButton>
    </div>
  );
}
