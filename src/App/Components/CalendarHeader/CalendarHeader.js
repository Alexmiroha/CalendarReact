import React from "../../../../snowpack/pkg/react.js";
export const CalendarHeader = ({onNext, onBack, dateDisplay}) => {
  return /* @__PURE__ */ React.createElement("div", {
    id: "header"
  }, /* @__PURE__ */ React.createElement("div", {
    id: "monthDisplay"
  }, dateDisplay), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("button", {
    onClick: onBack,
    id: "backButton"
  }, "Previous"), /* @__PURE__ */ React.createElement("button", {
    onClick: onNext,
    id: "nextButton"
  }, "Next")));
};
