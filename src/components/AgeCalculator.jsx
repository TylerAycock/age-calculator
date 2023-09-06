import arrow from "../assets/images/icon-arrow.svg";
import "./AgeCalculator.css";
import { useState } from "react";

const AgeCalculator = () => {

  const [age, setAge] = useState({
    year: "- -",
    month: "- -",
    day: "- -",
  });

  const [bDay, setBDay] = useState("");
  const [bMonth, setBMonth] = useState("");
  const [bYear, setBYear] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    let birthDate = new Date(`${bMonth}/${bDay}/${bYear}`);
    let today = new Date();

    if (today.getFullYear() < birthDate.getFullYear()) {
      alert("date must be in the past");
    }

    let yearsDiff = today.getFullYear() - birthDate.getFullYear();
    let monthsDiff = today.getMonth() - birthDate.getMonth();
    let daysDiff = today.getDate() - birthDate.getDate();

    if (daysDiff < 0) {
      let lastDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      ).getDate();
      monthsDiff--;
      daysDiff += lastDayOfMonth;
    }

    if (monthsDiff < 0) {
      yearsDiff--;
      monthsDiff += 12;
    }

    setAge({
      year: yearsDiff,
      month: monthsDiff,
      day: daysDiff,
    });
    
  };
  return (
    <div className="main-container">
      <form className="input-group" onSubmit={submitHandler}>
        <div className="ind-input">
          <label htmlFor="day">DAY</label>
          <input
            type="text"
            className="input day"
            id="day"
            placeholder="DD"
            maxLength={2}
            required
            onChange={(e) => setBDay(e.target.value)}
          />
          <span className="req-field">This field is required</span>
        </div>
        <div className="ind-input error">
          <label htmlFor="month">MONTH</label>
          <input
            type="text"
            className="input month"
            id="month"
            placeholder="MM"
            maxLength={2}
            required
            onChange={(e) => setBMonth(e.target.value)}
          />
        </div>
        <div className="ind-input">
          <label htmlFor="year">YEAR</label>
          <input
            type="text"
            className="input year"
            id="year"
            placeholder="YYYY"
            maxLength={4}
            required
            onChange={(e) => setBYear(e.target.value)}
          />
        </div>
        <button type="submit" className="btn">
          <img src={arrow} alt="arrow" />
        </button>
      </form>
      <div className="output-container">
        <div className="ind-output">
          <span className="output">{age.year}</span>
          <h1 className="title">years</h1>
        </div>
        <div className="ind-output">
          <span className="output">{age.month}</span>
          <h1 className="title">months</h1>
        </div>
        <div className="ind-output">
          <span className="output">{age.day}</span>
          <h1 className="title">days</h1>
        </div>
      </div>
    </div>
  );
};

export default AgeCalculator;
