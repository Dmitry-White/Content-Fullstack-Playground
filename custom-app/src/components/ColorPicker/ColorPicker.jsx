import { TextInput } from "@contentful/f36-components";
import { useSDK } from "@contentful/react-apps-toolkit";
import React, { useEffect, useState } from "react";
import s from "./ColorPicker.module.css";

const re = /^#(?:[0-9a-f]{3}){1,2}$/i;
const ColorPicker = () => {
  const sdk = useSDK();

  const [selectedColor, setSelectedColor] = useState(sdk.field.getValue());

  useEffect(() => {
    const storedValue = sdk.field.getValue();
    setSelectedColor(storedValue);

    return () => {};
  }, [selectedColor, sdk.field]);

  const handleColorFieldChange = (e) => {
    let value = e ? e.target.value : null;
    try {
      if (!value || !re.test(value)) return; // validate value
      setSelectedColor(value);
      sdk.field.setValue(value);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <TextInput
        style={{
          backgroundColor: selectedColor,
        }}
        className={s.colorTextInput}
        id={"color-picker"}
        name={"color-picker"}
        type="color"
        value={selectedColor}
        onChange={handleColorFieldChange}
      />
    </>
  );
};

export default ColorPicker;
