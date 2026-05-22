/* eslint-disable*/

const inputElements = document.querySelectorAll(".card__input");
const calcBtn = document.querySelector(".card__button");

const validateday = (day) => {
  if (day && day > 0 && day <= 31) {
    return true;
  }
  return false;
};
const validatemonth = (month) => {
  if (month && month > 0 && month <= 12) {
    return true;
  }
  return false;
};
const validateyear = (year) => {
  const currentYear = new Date().getFullYear();
  if (year && year > 0 && year <= currentYear) {
    return true;
  }
  return false;
};

const isDatevalid = (dayElement, monthElement, yearElement) => {
  let isValid = [false, false, false];

  if (!validateday(dayElement.value)) {
    dayElement.classList.add("card__input--error");
  } else {
    isValid[0] = true;
    dayElement.classList.remove("card__input--error");
  }

  if (!validatemonth(monthElement.value)) {
    monthElement.classList.add("card__input--error");
  } else {
    isValid[1] = true;
    monthElement.classList.remove("card__input--error");
  }

  if (!validateyear(yearElement.value)) {
    yearElement.classList.add("card__input--error");
  } else {
    isValid[2] = true;
    yearElement.classList.remove("card__input--error");
  }

  return isValid.every((items) => items === true);
};

const ageCalc = (year, month, day) => {
  const today = new Date();
  const barithday = new Date(year, month - 1, day);
  let age = today.getFullYear() - barithday.getFullYear();
  const monthDiff = today.getMonth() - barithday.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < barithday.getDate())
  ) {
    return (age -= 1);
  }

  return age;
};

const onClickHandlar = () => {
  const dayElement = document.querySelector("#day");
  const monthElement = document.querySelector("#month");
  const yearElement = document.querySelector("#year");
  const resultElement = document.querySelector(".card__resultValue");

  if (!isDatevalid(dayElement, monthElement, yearElement)) {
    resultElement.textContent = "--";
    return;
  }

  resultElement.textContent = ageCalc(
    yearElement.value,
    monthElement.value,
    dayElement.value,
  );
};

calcBtn.addEventListener("click", onClickHandlar);
inputElements.forEach((element) =>
  element.addEventListener("keydown", (event) => {
    event.key === "Enter" && onClickHandlar();
  }),
);
