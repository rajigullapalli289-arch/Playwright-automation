const ExcelJS = require('exceljs');
const { test, expect } = require('@playwright/test');


async function readExcel(worksheet, searchValue) {
    let match;
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchValue && !match) {
                match = { row: rowNumber, col: colNumber };
            }
        });
    });
    return match;
}

async function writeExcel(searchValue, replacementValue, change, filePath) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet("Sheet1");
    if (!worksheet) {
        throw new Error('Worksheet "Sheet1" was not found in the workbook.');
    }

    const location = await readExcel(worksheet, searchValue);
    if (!location) {
        throw new Error(`Could not find "${searchValue}" in the worksheet.`);
    }

    const cell = worksheet.getCell(
        location.row + change.rowChange,
        location.col + change.colChange,
    );
    cell.value = replacementValue;
    await workbook.xlsx.writeFile(filePath);
};



test("Write Excel", async ({ page }, testInfo) => {
      const textSearch = 'Mango';
  const updateValue = '350';

    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
    const downloadWait = page.waitForEvent('download');
    await page.locator('#downloadButton').click();
    const download = await downloadWait;
    const filePath = testInfo.outputPath(download.suggestedFilename());
    await download.saveAs(filePath);
    // await writeExcel("Yellow", "Green", filePath);
    // await page.locator('#fileinput').click();
    // await page.locator('input[type="file"]').setInputFiles(filePath);

     await writeExcel(textSearch, updateValue, { rowChange: 0, colChange: 2 }, filePath);
 
  await page.locator('#fileinput').setInputFiles(filePath);
 
  const desiredRow = page.getByRole('row').filter({ has: page.getByText(textSearch) });
  await expect(desiredRow.getByRole('cell').nth(3)).toContainText(updateValue);

    
});