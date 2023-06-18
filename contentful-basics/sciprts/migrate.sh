#!/bin/bash

SPACE_ID=$1
FILE_PATH=$2

echo "Script running..."
echo "Migration: $FILE_PATH..."

contentful space migration \
    --space-id=$SPACE_ID \
    -y \
    $FILE_PATH

echo "Script successful!"
