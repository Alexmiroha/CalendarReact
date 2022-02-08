import React from "../../../../snowpack/pkg/react.js";
export const Day = (props) => {
  const className = `day ${props.day.value === "padding" ? "padding" : ""} ${props.day.isCurrentDay ? "currentDay" : ""}`;
  return /* @__PURE__ */ React.createElement("div", {
    onClick: props.onClick,
    className
  }, props.day.value === "padding" ? "" : props.day.value, props.day.event && /* @__PURE__ */ React.createElement("div", {
    className: "event"
  }, props.day.event.title));
};
