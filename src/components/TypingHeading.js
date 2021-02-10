import { makeStyles, ThemeProvider } from "@material-ui/core";
import React from "react";
console.log("1st load");
const useStyles = makeStyles((theme) => ({
  h1: {
    fontWeight: 200,
    margin: "0.4em 0",
    fontSize: "3vw",
    color: "#fff",
    fontFamily: "Raleway",
  },
  h2: {
    fontWeight: 200,
    margin: "0.4em 0",
    color: "#888",
    fontSize: "2em",
  },
}));
const theLoop = (TxtType) => {
  console.log("theloops");
  let elements = document.getElementsByClassName("typewrite");

  for (let i = 0; i < elements.length; i++) {
    console.log("loop");
    let toRotate = elements[i].getAttribute("data-type");
    console.log("dataTypes", { toRotate, i });
    let period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
};

const TypingHeading = () => {
  console.log("called");

  const classes = useStyles();
  let TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = "";
    this.tick();
    this.isDeleting = false;
  };

  TxtType.prototype.tick = function () {
    let i = this.loopNum % this.toRotate.length;
    let fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span className="wrap">' + this.txt + "</span>";

    let that = this;
    let delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }
    theLoop(TxtType);
    // setTimeout(function () {
    //   that.tick();
    // }, delta);
  };

  return (
    <ThemeProvider>
      <h1 className={classes.h1}>
        Goose is
        <span
          className="typewrite"
          data-period="2000"
          data-type='[ " sophisticated.", " nostalgia.", " minimalist.", " peaceful."]'
        >
          <span
            className="wrap"
            style={{ borderRight: "0.08em solid #fff" }}
          ></span>
        </span>
      </h1>
    </ThemeProvider>
  );
};

export default TypingHeading;
