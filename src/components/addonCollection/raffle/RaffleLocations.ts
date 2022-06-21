// P stands for position and number stands for the 3x3 grid from 0-2 on both axis

interface positionTypes {
  justifyContent: string;
  alignItems: string;
}

export const P00: positionTypes = {
  justifyContent: "left",
  alignItems: "flex-start",
};

export const P10: positionTypes = {
  justifyContent: "center",
  alignItems: "flex-start",
};

export const P20: positionTypes = {
  justifyContent: "right",
  alignItems: "flex-start",
};

export const P01: positionTypes = {
  justifyContent: "left",
  alignItems: "center",
};

export const P11: positionTypes = {
  justifyContent: "center",
  alignItems: "center",
};

export const P21: positionTypes = {
  justifyContent: "right",
  alignItems: "center",
};

export const P02: positionTypes = {
  justifyContent: "left",
  alignItems: "flex-end",
};

export const P12: positionTypes = {
  justifyContent: "center",
  alignItems: "flex-end",
};

export const P22: positionTypes = {
  justifyContent: "right",
  alignItems: "flex-end",
};
