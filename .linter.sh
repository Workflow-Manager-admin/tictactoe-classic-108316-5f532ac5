#!/bin/bash
cd /home/kavia/workspace/code-generation/tictactoe-classic-108316-5f532ac5/tic_tac_toe
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

