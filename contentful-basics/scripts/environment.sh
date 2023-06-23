#!/bin/bash

SPACE_ID=$1
ENV_NAME=$2

echo "Script running..."
echo "Creating environment: $ENV_NAME..."

contentful space environment create \
    --space-id=$SPACE_ID \
    --environment-id=$ENV_NAME \
    --name=$ENV_NAME

echo "Script successful!"
