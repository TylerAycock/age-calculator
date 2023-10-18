import "./AgeCalculator.css";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const AgeCalculator = () => {
  let current = new Date();
  let year = current.getFullYear();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      day: "",
      year: "",
      month: "",
    },
  });

  const [age, setAge] = useState({
    day: "- -",
    month: "- -",
    year: "- -",
  });

  const submitHandler = (data) => {
    let { day, month, year } = data;
    let birthDate = new Date(`${month}/${day}/${year}`);
    let today = new Date();
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
    reset();
  };

  return (
    <div className="main-container">
      <div className="content__container">
        <form className="input-group" onSubmit={handleSubmit(submitHandler)}>
          <div className={errors.day ? "ind-input error " : "ind-input"}>
            <label htmlFor="day">DAY</label>
            <input
              type="text"
              className="input day"
              id="day"
              placeholder="DD"
              maxLength={2}
              name="day"
              {...register("day", {
                required: "This field is required",
                max: { value: 31, message: "Must be a valid day" },
              })}
            />
            <span className="error-field">{errors.day?.message}</span>
          </div>
          <div className={errors.month ? "ind-input error" : "ind-input"}>
            <label htmlFor="month">MONTH</label>
            <input
              type="text"
              className="input month"
              id="month"
              placeholder="MM"
              maxLength={2}
              name="month"
              {...register("month", {
                required: "This field is required",
                max: { value: 12, message: "Must be a valid month" },
              })}
            />
            <span className="error-field">{errors.month?.message}</span>
          </div>
          <div className={errors.year ? "ind-input error" : "ind-input"}>
            <label htmlFor="year">YEAR</label>
            <input
              type="text"
              className="input year"
              id="year"
              placeholder="YYYY"
              maxLength={4}
              name="year"
              {...register("year", {
                required: "This field is required",
                max: { value: year, message: "Must be in the past" },
              })}
            />
            <span className="error-field">{errors.year?.message}</span>
          </div>
          <button type="submit" className="btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="46"
              height="44"
              viewBox="0 0 46 44"
            >
              <g fill="none" stroke="#FFF" stroke-width="2">
                <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" />
              </g>
            </svg>
          </button>
        </form>
        <div className="output-container">
          <div className="ind-output">
            <span className="output">{age.year}</span>
            <h2 className="title">years</h2>
          </div>
          <div className="ind-output">
            <span className="output">{age.month}</span>
            <h2 className="title">months</h2>
          </div>
          <div className="ind-output">
            <span className="output">{age.day}</span>
            <h2 className="title">days</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgeCalculator;
