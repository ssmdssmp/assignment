export const defaultStyleWrapper = {
  filter: "blur(0px)",
  transition: "filter 0.2s ease-in-out",
};
export const transitionStylesWrapper = {
  entering: { filter: "blur(0px)" },
  entered: { filter: "blur(2px)" },
  exiting: { filter: "blur(2px)" },
  exited: { filter: "blur(0px)" },
};
export const defaultStylePopup = {
  bottom: "-200vh",
  display: "none",
  transition: "bottom 0.3s ease-in-out",
};
export const transitionStylesPopop = {
  entering: { display: "block", bottom: "-200vh" },
  entered: { display: "block", bottom: 0 },
  exiting: { display: "block", bottom: "0vh" },
  exited: { bottom: "-200vh", display: "block" },
};
