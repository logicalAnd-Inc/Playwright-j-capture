#!/bin/bash

# 実行環境の判定
SCRIPT_DIR=$(cd $(dirname $0); pwd)
BASE_DIR="$(cd $(dirname ${SCRIPT_DIR}); pwd)"

TARGET=pc_game SUFFIX=7 npx playwright test --headed --config ${BASE_DIR}/config/playwright.config.ts
TARGET=sp_game SUFFIX=7 npx playwright test --headed --config ${BASE_DIR}/config/playwright_sp.config.ts
