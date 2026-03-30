#!/bin/bash

# Exit on any error
set -e

PACKAGE_PATH="libs/ui/package.json"
DIST_PATH="dist/libs/ui"

echo "🚀 Starting publish process for @octave-org/ui..."

# 1. Increment version in libs/ui/package.json (patch version)
echo "📝 Incrementing version..."
if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS sed
  sed -i '' -E 's/"version": "([0-9]+)\.([0-9]+)\.([0-9]+)"/"version": "\1.\2.'$(($(sed -nE 's/.*"version": "[0-9]+\.[0-9]+\.([0-9]+)".*/\1/p' $PACKAGE_PATH) + 1))'"/' $PACKAGE_PATH
else
  # Linux sed
  CURRENT_VERSION=$(grep '"version":' $PACKAGE_PATH | cut -d'"' -f4)
  IFS='.' read -r major minor patch <<< "$CURRENT_VERSION"
  NEW_VERSION="$major.$minor.$((patch + 1))"
  sed -i "s/\"version\": \"$CURRENT_VERSION\"/\"version\": \"$NEW_VERSION\"/" $PACKAGE_PATH
fi

NEW_VERSION=$(grep '"version":' $PACKAGE_PATH | cut -d'"' -f4)
echo "✅ Version incremented to $NEW_VERSION"

# 2. Build the UI library
echo "🏗️ Building UI library with bun nx..."
bun nx build ui

# 3. Publish the library
echo "📦 Publishing to registry..."
# Note: Assuming the build output is in dist/libs/ui
# If bun nx build ui doesn't put it there, adjust this path
if [ -d "$DIST_PATH" ]; then
  cd "$DIST_PATH"
  bun publish
  echo "🎉 Successfully published @octave-org/ui@$NEW_VERSION"
else
  echo "❌ Error: Build output directory $DIST_PATH not found. Please check nx build configuration."
  exit 1
fi
