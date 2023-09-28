#!/bin/bash

SPACE_ID=$1
ALIAS_ID=$2
ENV_NAME=$3

echo "Script running..."
echo "Updating alias: $ALIAS_ID..."

contentful space environment-alias update \
  --space-id=$SPACE_ID \
  --alias-id=$ALIAS_ID \
  --target-environment-id=$ENV_NAME

echo "Script successful!"
