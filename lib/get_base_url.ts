import * as XLSX from 'xlsx';

const path = require('path');

/**
 * テスト用オブジェクト定義
 */
export interface BaseUrls {
    name: string;
    path: string;
    orgPath: string;
}

export function get_base_url() {
    const docroot = path.join(__dirname, '..');

    const workbook = XLSX.readFile(docroot + '/seeds/base_urls.xlsx');
    const worksheet = workbook.Sheets['condition'];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, blankrows: false });  // 1行目ヘッダー設定、空欄の行を含めない
    jsonData.shift(); // Remove header row
    const baseUrls: BaseUrls[] = jsonData.map((row: any) => {
        return {
            name: (<any[]>row)[0],
            path: (<any[]>row)[1],
            orgPath: (<any[]>row)[2],
        };
    });

    return baseUrls;
}