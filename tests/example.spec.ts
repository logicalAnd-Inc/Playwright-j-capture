const { test, expect } = require('@playwright/test');
import { BaseUrls, get_base_url } from '../lib/get_base_url';
import { TargetUrls, get_target_url } from '../lib/target_urls';

const fs = require('fs');
const path = require('path');

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });
test.describe('Test suite', () => {

    const baseUrls: BaseUrls[] = get_base_url();
    const docroot = path.join(__dirname, '..');
    const targetUrls: TargetUrls[] = get_target_url(process.env.TARGET);
    console.log(targetUrls);

    var dir_name = process.env.TARGET;
    if (process.env.SUFFIX != undefined) {
        dir_name = dir_name+'_'+process.env.SUFFIX;
    }
 
    // タイムアウト時間の設定
    test.setTimeout(6000000); // 6000秒に設定

    test.beforeEach(async ({ page }) => {
      // ここにテストの前処理を記述
    });
  
    test.afterEach(async ({ page }) => {
      // ここにテストの後処理を記述
    });
  
    test.beforeAll(async () => {
      // ここにテストスイート全体の前処理を記述
    });
  
    test.afterAll(async () => {
      // ここにテストスイート全体の後処理を記述
    });
    
    // test.use({
    //     timeout: 120000, // タイムアウト時間を120秒に設定
    // });
    
    test('Test case', async ({ browserName, page}) => {
        console.log(`Current browser: ${browserName}`);
        
        // 外部ファイル読み込み
        // const { base } = require('./baseurl.json');
        const base = baseUrls;

        // const { urls } = require('./'+test_name);
        const urls = targetUrls;

        for (let i=0; urls[i]; i++) {
            for (let j=0; base[j]; j++) {
                var dirpath = docroot+'/capture-results/'+base[j].name;
                // 結果格納先ディレクトリ作成
                if (!fs.existsSync(docroot+'/capture-results/')){
                    fs.mkdirSync(docroot+'/capture-results/');
                }
                // 環境用ディレクトリが存在しない場合は、作成する
                if (!fs.existsSync(dirpath)){
                    fs.mkdirSync(dirpath);
                }
                // テスト別格納先ディレクトリ作成
                if (!fs.existsSync(dirpath+'/'+dir_name)){
                    fs.mkdirSync(dirpath+'/'+dir_name);
                }
                var targetUrl = base[j].path+urls[i].path;
                try {
                    await page.goto(targetUrl);
                } catch (error) {
                    console.error('画面遷移中にエラーが発生しました:', error);
                    continue;
                }
                // await page.waitForLoadState('networkidle');
                var stringHtml = await page.content();
                // scriptタグの削除
                stringHtml = removeScriptTags(stringHtml);
                stringHtml = removeIframeTags(stringHtml);
                stringHtml = trimUnwantedString(stringHtml);
                // ドメインを共通化して差分を減らす
                stringHtml = stringHtml.replace(new RegExp(base[j].orgPath, 'g'), 'domainPath');
                stringHtml = stringHtml.replace(new RegExp(base[j].orgPath.replace('https://'), 'g'), '__domainPath');
                stringHtml = stringHtml.replace(new RegExp(base[j].orgPath.replace('http://'), 'g'), '__domainPath');

                stringHtml = stringHtml.replace(new RegExp("https://www.jleague.jp", 'g'), 'hon_domainPath');

                // 基本整形
                stringHtml = processString(stringHtml);
                
                var filePath = path.join(dirpath+'/'+dir_name, i + '.html');

                fs.writeFileSync(filePath, stringHtml);

                var imgfilePath = path.join(dirpath+'/'+dir_name, i + '.jpg');

                try {
                  await page.screenshot({ path: imgfilePath , fullPage: true});
                } catch (error) {
                  console.error('スクリーンショットの取得中にエラーが発生しました:', error);
                }

            }
        }

        // Expects page to have a heading with the name of Installation.
        //  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
    });
});

function waitSync(ms) {
    const start = Date.now();
    while (Date.now() - start < ms) {}
}

function processString(inputString) {
    // 1. 改行の排除
    var step1 = inputString.replace(/\r?\n|\r/g, '');

    // 2. <>で囲まれていない部分の空白を排除
    var step2 = '';
    var insideTag = false;

    for (var i = 0; i < step1.length; i++) {
        if (step1[i] === '<') {
            insideTag = true;
            step2 += step1[i];
        } else if (step1[i] === '>') {
            insideTag = false;
            step2 += step1[i];
        } else {
            if (!insideTag && step1[i] !== ' ') {
                step2 += step1[i];
            } else if (insideTag) {
                step2 += step1[i]; // タグ内の文字を追加
            }
        }
    }

    // 3. <>で囲まれている部分の前に改行を挿入
    var step3 = '';
    insideTag = false;

    for (var j = 0; j < step2.length; j++) {
        if (step2[j] === '<') {
            insideTag = true;
            step3 += '\n' + step2[j];
        } else if (step2[j] === '>') {
            insideTag = false;
            step3 += step2[j];
        } else {
            step3 += step2[j];
        }
    }

    return step3;
}

function removeScriptTags(inputString) {
    return inputString.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}

function removeIframeTags(inputString) {
    return inputString.replace(/<iframe.*?<\/iframe>/gi, '');
}

function trimUnwantedString(inputString) {
    var string =  inputString.replace('<meta http-equiv="origin-trial" content="AymqwRC7u88Y4JPvfIF2F37QKylC04248hLCdJAsh8xgOfe/dVJPV3XS3wLFca1ZMVOtnBfVjaCMTVudWM//5g4AAAB7eyJvcmlnaW4iOiJodHRwczovL3d3dy5nb29nbGV0YWdtYW5hZ2VyLmNvbTo0NDMiLCJmZWF0dXJlIjoiUHJpdmFjeVNhbmRib3hBZHNBUElzIiwiZXhwaXJ5IjoxNjk1MTY3OTk5LCJpc1RoaXJkUGFydHkiOnRydWV9">' , '');
    // string =  string.replace(/<style\s+type="text\/css"\s+data-fbcssmodules[^>]*>[\s\S]*?<\/style>/gi, '');
    // string =  string.replace(/<img\s+src="https:\/\/log\.popin\.cc\/log\/popin_media\/discoverylogs[^>]*">/gi, '');
    // string =  string.replace(/<img\s+src="https:\/\/analytics\.twitter\.com\/i\/adsct[^>]*">/gi, '');
    return string;
}

