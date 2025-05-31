#!/bin/bash
cd /home/kavia/workspace/code-generation/autosparehub-26360-b977da9f/auto_sparehub
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

