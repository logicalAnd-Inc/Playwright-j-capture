import * as XLSX from 'xlsx';

const path = require('path');

/**
 * テスト用オブジェクト定義
 */
export interface TargetUrls {
    name: string;
    path: string;
    orgPath: string;
}

export function get_target_url(sheetName: any) {
    const docroot = path.join(__dirname, '..');

    const workbook = XLSX.readFile(docroot + '/seeds/target_urls.xlsx');
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, blankrows: false });  // 1行目ヘッダー設定、空欄の行を含めない
    jsonData.shift(); // Remove header row
    const targetUrls: TargetUrls[] = jsonData.map((row: any) => {
        return {
            path: (<any[]>row)[0],
        };
    });

    return targetUrls;
}