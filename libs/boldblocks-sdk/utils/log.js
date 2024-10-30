export const log = (data, type = "log") => {
  if (!data) {
    return;
  }

  if (window?.BBLOG?.environmentType === "development") {
    if (
      ["log", "info", "warn", "error", "debug", "dir", "table"].includes(type)
    ) {
      console[type](data);
    } else {
      console.log(data);
    }
  }
};
