"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var src_exports = {};
__export(src_exports, {
  Button: () => Button,
  InfoCard: () => InfoCard
});
module.exports = __toCommonJS(src_exports);

// src/Button.tsx
var React2 = __toESM(require("react"));
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Button,
  InfoCard
});
