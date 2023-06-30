import { Flex, TextInput, IconButton, Box } from '@contentful/f36-components';
import { DeleteIcon, ErrorCircleIcon } from '@contentful/f36-icons';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

const re = /^#(?:[0-9a-f]{3}){1,2}$/i;

const Color = ({ fields, item, onChangeHandler, deleteItem }) => {
  const [isColorValid, setIsColorValid] = useState(false);
  useEffect(() => {
    setIsColorValid(re.test(item.color));
  }, [item.color]);

  const storeValue = (target, name, value) => {
    if (name === 'color') {
      setIsColorValid(re.test(value));
    }
    onChangeHandler(target, name, value);
  };

  const renderColor = (target) => (
    <>
      {!isColorValid && (
        <Box
          as="span"
          style={{
            display: 'block',
            width: '50px',
            height: '100%',
            textAlign: 'center',
          }}
        >
          <ErrorCircleIcon size="large" variant="negative" />
        </Box>
      )}
      {isColorValid && (
        <Box
          as="span"
          style={{
            display: 'block',
            width: '50px',
            height: '100%',
            backgroundColor: target.color ? target.color : '#F7F9FA',
          }}
        />
      )}
    </>
  );

  const renderField = (field) => (
    <Flex
      style={{ width: '30%' }}
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

      {field.name === 'color' && renderColor(item)}
    </Flex>
  );

  const renderList = (list) => list.map(renderField);

  return (
    <Flex>
      {renderList(fields)}
      <Box style={{ width: '10%' }}>
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

Color.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ),
  item: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
    }),
  ),
  onChangeHandler: PropTypes.func,
  deleteItem: PropTypes.bool,
};

export default Color;
