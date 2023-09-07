import arrow from "../assets/images/icon-arrow.svg";
import "./AgeCalculator.css";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const AgeCalculator = () => {
  const [empty, setEmpty] = useState(false);

  let current = new Date
  let year = current.getFullYear()

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm({
    defaultValues: {
      day: "",
      year: "",
      month: ""
    }
  });

  const initialValues = {
    day: "",
    year: "",
    month: ""
  };

  const [birthday, setBirthDay] = useState(initialValues);

  const [age, setAge] = useState({
    day: "- -",
    month: "- -",
    year: "- -",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setBirthDay({
      ...birthday,
      [name]: value,
    });
  };

  const submitHandler = (data) => {
    console.log(data)
    
    // setBirthDay(initialValues);
    // let birthDate = new Date(
    //   `${+birthday.month}/${+birthday.day}/${+birthday.year}`
    // );
    // let today = new Date();
    // if (birthDate.toString() === "Invalid Date") {
    //   alert("invalid entry!");
    // } else {
    //   let yearsDiff = today.getFullYear() - birthDate.getFullYear();
    //   let monthsDiff = today.getMonth() - birthDate.getMonth();
    //   let daysDiff = today.getDate() - birthDate.getDate();

    //   if (daysDiff < 0) {
    //     let lastDayOfMonth = new Date(
    //       today.getFullYear(),
    //       today.getMonth(),
    //       0
    //     ).getDate();
    //     monthsDiff--;
    //     daysDiff += lastDayOfMonth;
    //   }

    //   if (monthsDiff < 0) {
    //     yearsDiff--;
    //     monthsDiff += 12;
    //   }

    //   setAge({
    //     year: yearsDiff,
    //     month: monthsDiff,
    //     day: daysDiff,
    //   });
    // }
  };

  return (
    <div className="main-container">
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
            defaultValue={birthday.day}
            onChange={changeHandler}
            {...register('day', {required: "This field is required", max: { value: 31, message: 'Must be a valid day'}})}
          />
          <span className="error-field" >{errors.day?.message}</span>
        </div>
        <div className={!empty ? "ind-input" : "ind-input error"}>
          <label htmlFor="month">MONTH</label>
          <input
            type="text"
            className="input month"
            id="month"
            placeholder="MM"
            maxLength={2}
            name="month"
            defaultValue={birthday.month}
            onChange={changeHandler}
            {...register('month', {required: "This field is required" , max:{value: 12, message: "Must be a valid month"}})}
          />
          <span className="error-field">{errors.month?.message}</span>
        </div>
        <div className={!empty ? "ind-input" : "ind-input error"}>
          <label htmlFor="year">YEAR</label>
          <input
            type="text"
            className="input year"
            id="year"
            placeholder="YYYY"
            maxLength={4}
            name="year"
            defaultValue={birthday.year}
            onChange={changeHandler}
            {...register('year', {required: 'This field is required', max: {value: year, message: "Must be in the past"}})}
          />
          <span className="error-field">{errors.year?.message}</span>
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
