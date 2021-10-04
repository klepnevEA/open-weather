import { Input } from "@mui/material";
import { useState } from "react";
import styles from "./index.module.css";

type TProps = {
  name: string;
  placeholder: string;
  onOutput: (text: string) => string;
};

export const InputSearch = ({ name, placeholder, onOutput }: TProps) => {
  const [valueInput, setValueInput] = useState<string>("");
  return (
    <div className={styles["input"]}>
      <div>{name}</div>
      <Input
        name={name}
        placeholder={placeholder}
        onChange={(e) => {
          setValueInput(e.target.value);
        }}
        value={valueInput}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onOutput(valueInput);
            setValueInput("");
          }
        }}
      />
    </div>
  );
};
