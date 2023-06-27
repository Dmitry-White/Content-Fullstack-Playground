#!/bin/bash

SPACE_ID=$1
ENV_ID=$2
FILE_PATH=$3

echo "Script running..."
echo "Migration: $FILE_PATH..."

contentful space migration \
  --space-id=$SPACE_ID \
  --environment-id=$ENV_ID \
  --yes \
  $FILE_PATH

echo "Script successful!"
