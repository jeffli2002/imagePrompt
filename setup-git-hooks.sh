#!/bin/sh

echo "Setting up Git hooks..."

# Configure Git to use the .githooks directory
git config core.hooksPath .githooks

echo "✅ Git hooks configured successfully!"
echo "Type checking will now run automatically before each push."