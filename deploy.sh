#!/bin/bash

echo "💻 Installing packages..."
npm install

echo "⚡ Building project..."
npm run build

echo "🚀 Starting server..."
npm run start
