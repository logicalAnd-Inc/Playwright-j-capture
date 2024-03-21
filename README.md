Windows WSL上で実行するとVPNがつながった状態の場合表示できない
メモリが消費しすぎた後だと、回復した状態でもうまく動かないことがあるのでPC立ち上げなおした方がいいかも

TARGET={target_urls.xlsx内sheet名} SUFFIX={結果吐き出し先ディレクトリに付与する識別子（指定しなくても動く）} npx playwright test --headed --config {root_path}/config/playwright.config.ts
TARGET={target_urls.xlsx内sheet名} npx playwright test --headed --config {root_path}/config/playwright_sp.config.ts
例
SP
TARGET=test npx playwright test --headed --config {root_path}/config/playwright_sp.config.ts
TARGET=sp_tv npx playwright test --headed --config {root_path}/config/playwright_sp.config.ts
PC
TARGET=test npx playwright test --headed --config {root_path}/config/playwright.config.ts
TARGET=pc_tv npx playwright test --headed --config {root_path}/config/playwright.config.ts

capture-resultsに結果が吐かれる
