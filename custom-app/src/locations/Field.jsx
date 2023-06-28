import { /* useCMA, */ useSDK } from "@contentful/react-apps-toolkit";
import React, { useEffect, useState } from "react";
import ColorPicker from "../components/ColorPicker/ColorPicker";

const Field = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const sdk = useSDK();

  useEffect(() => {
    // This ensures our app has enough space to render
    // @TODO startAutoResizer does not work great with the react-select component, is there a better way?
    // Currently change the widget height based on open/close as a workaround
    sdk.window.updateHeight(60);

    // Get current value of the field so we can display it
  }, [sdk.field, sdk.window]);

  return (
    <>
      <ColorPicker key={"colorwheel-1"} />
    </>
  );
};

export default Field;
