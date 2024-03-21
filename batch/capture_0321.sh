#!/bin/bash

# 実行環境の判定
SCRIPT_DIR=$(cd $(dirname $0); pwd)
BASE_DIR="$(cd $(dirname ${SCRIPT_DIR}); pwd)"

#TARGET=pc_game SUFFIX=1 npx playwright test --headed --config ${BASE_DIR}/config/playwright.config.ts
#TARGET=pc_game SUFFIX=2 npx playwright test --headed --config ${BASE_DIR}/config/playwright_sp.config.ts

#echo "xvfb-run --auto-servernum --server-args=\"-screen 0 1920x1080x24\" \"TARGET=pc_game SUFFIX=1 npx playwright test --headed --config ${BASE_DIR}/config/playwright.config.ts\" >> /home/yhabazaki/workspace/ism/playwright-j-capture/logs/at_log 2>&1"|at 16:50 today
echo "xvfb-run --auto-servernum --server-args=\"-screen 0 1920x1080x24\" ${BASE_DIR}/batch/game_test_1.sh >> ${BASE_DIR}/logs/at_log 2>&1"|at 21:35 today
echo "xvfb-run --auto-servernum --server-args=\"-screen 0 1920x1080x24\" ${BASE_DIR}/batch/game_test_2.sh >> ${BASE_DIR}/logs/at_log 2>&1"|at 21:36 today
echo "xvfb-run --auto-servernum --server-args=\"-screen 0 1920x1080x24\" ${BASE_DIR}/batch/game_test_3.sh >> ${BASE_DIR}/logs/at_log 2>&1"|at 21:37 today
echo "xvfb-run --auto-servernum --server-args=\"-screen 0 1920x1080x24\" ${BASE_DIR}/batch/game_test_4.sh >> ${BASE_DIR}/logs/at_log 2>&1"|at 21:38 today
echo "xvfb-run --auto-servernum --server-args=\"-screen 0 1920x1080x24\" ${BASE_DIR}/batch/game_test_5.sh >> ${BASE_DIR}/logs/at_log 2>&1"|at 21:39 today
echo "xvfb-run --auto-servernum --server-args=\"-screen 0 1920x1080x24\" ${BASE_DIR}/batch/game_test_6.sh >> ${BASE_DIR}/logs/at_log 2>&1"|at 21:40 today
echo "xvfb-run --auto-servernum --server-args=\"-screen 0 1920x1080x24\" ${BASE_DIR}/batch/game_test_7.sh >> ${BASE_DIR}/logs/at_log 2>&1"|at 21:41 today
echo "xvfb-run --auto-servernum --server-args=\"-screen 0 1920x1080x24\" ${BASE_DIR}/batch/game_test_8.sh >> ${BASE_DIR}/logs/at_log 2>&1"|at 21:42 today
echo "xvfb-run --auto-servernum --server-args=\"-screen 0 1920x1080x24\" ${BASE_DIR}/batch/game_test_9.sh >> ${BASE_DIR}/logs/at_log 2>&1"|at 21:43 today


