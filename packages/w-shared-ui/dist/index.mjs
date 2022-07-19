"use strict";

// src/Button.tsx
import * as React2 from "react";
var Button = () => {
  return /* @__PURE__ */ React2.createElement("button", null, "Boop");
};

// src/InfoCard.tsx
var InfoCard = () => {
  return /* @__PURE__ */ React.createElement("a", {
    href: "#",
    className: "block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
  }, /* @__PURE__ */ React.createElement("h5", {
    className: "mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
  }, "Noteworthy technology acquisitions 2021"), /* @__PURE__ */ React.createElement("p", {
    className: "font-normal text-gray-700 dark:text-gray-400"
  }, "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."));
};
export {
  Button,
  InfoCard
};
