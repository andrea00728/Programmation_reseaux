// src/styles/styles.ts
export const textFieldStyles = {
    input: {
      color: "cyan", 
    },
    label: {
      color: "cyan",
    },
    "& label.Mui-focused": {
      color: "cyan",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "cyan", 
      },
      "&:hover fieldset": {
        borderColor: "#00FFFF", 
      },
      "&.Mui-focused fieldset": {
        borderColor: "#00FFFF", 
        boxShadow: "0 0 10px cyan", 
      },
    },
    backgroundColor: "black", 
    borderRadius: "12px", 
  };
  