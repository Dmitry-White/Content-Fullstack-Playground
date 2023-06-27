#!/bin/bash

SPACE_ID=$1
FILE_PATH=$2

echo "Script running..."
echo "Generate: $FILE_PATH..."

contentful space generate migration \
  --space-id=$SPACE_ID \
  --filename=$FILE_PATH

echo "Script successful!"
