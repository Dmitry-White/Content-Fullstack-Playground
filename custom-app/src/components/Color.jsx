import React, { useState, useEffect } from "react";
import {
  Flex,
  TextInput,
  IconButton,
  Box,
  Paragraph,
} from "@contentful/f36-components";
import { DeleteIcon, ErrorCircleIcon } from "@contentful/f36-icons";

const re = /^#(?:[0-9a-f]{3}){1,2}$/i;
const Color = ({ fields, item, onChangeHandler, deleteItem }) => {
  const [isColorValid, setIsColorValid] = useState(false);
  useEffect(() => {
    setIsColorValid(re.test(item.color));
  }, [item.color]);

  const storeValue = (item, name, value) => {
    if (name === "color") {
      setIsColorValid(re.test(value));
    }
    onChangeHandler(item, name, value);
  };

  return (
    <Flex>
      {fields.map((field) => (
        <Flex
          style={{ width: "30%" }}
          marginRight="spacingS"
          marginBottom="spacingS"
          key={field.name}
        >
          <TextInput
            id={field.name}
            name={field.name}
            value={item[field.name]}
            onChange={(e) => storeValue(item, field.name, e.target.value)}
          />

          {field.name === "color" && (
            <>
              {!isColorValid && (
                <Box
                  as="span"
                  style={{
                    display: "block",
                    width: "50px",
                    height: "100%",
                    textAlign: "center",
                  }}
                >
                  <ErrorCircleIcon size="large" variant="negative" />
                </Box>
              )}
              {isColorValid && (
                <Box
                  as="span"
                  style={{
                    display: "block",
                    width: "50px",
                    height: "100%",
                    backgroundColor: item.color ? item.color : "#F7F9FA",
                  }}
                />
              )}
            </>
          )}
        </Flex>
      ))}
      <Box style={{ width: "10%" }}>
        <IconButton
          variant="secondary"
          aria-label="Delete"
          icon={<DeleteIcon />}
          onClick={() => deleteItem(item)}
        />
      </Box>
    </Flex>
  );
};

export default Color;
