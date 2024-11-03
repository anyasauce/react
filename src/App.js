import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Countdown = () => {
  const targetDate = new Date("2024-12-31T11:59:00"); // Target date

  const [timeLeft, setTimeLeft] = useState({});
  const [message, setMessage] = useState("NEW YEAR COUNTDOWN"); // Initial message

  useEffect(() => {
    const countdown = setInterval(() => {
      const now = new Date();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(countdown);
        setMessage("HAPPY NEW YEAR!!!"); // Change message when countdown ends
        localStorage.setItem("message", "HAPPY NEW YEAR!!!");
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(countdown);
  }, [targetDate]);

  // Retrieve message from local storage
  useEffect(() => {
    const storedMessage = localStorage.getItem("message");
    if (storedMessage) {
      setMessage(storedMessage);
    }
  }, []);

  return (
    <div className="container text-center">
      <h1 className="mt-5">{message}</h1>
      <h2 className="mt-3">
        {message === "HAPPY NEW YEAR!!!" ? (
          <span>{message}</span>
        ) : (
          <span>
            {timeLeft.days} Days {timeLeft.hours} Hours {timeLeft.minutes}{" "}
            Minutes {timeLeft.seconds} Seconds
          </span>
        )}
      </h2>
    </div>
  );
};

export default Countdown;
