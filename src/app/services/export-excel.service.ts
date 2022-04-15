import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import { Subject } from 'rxjs';
import * as fs from 'file-saver';
import * as XLSX from 'xlsx';


@Injectable({
  providedIn: 'root'
})
export class ExportExcelService {

  importedJson = new Subject();
  constructor() { }

  exportExcel(excelData: any) {
    //Title, Header & Data
    const title = excelData.title;
    const header = excelData.headers
    const data = excelData.data;

    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Sheet1');

    //Adding Header Row
    let headerRow = worksheet.addRow(header);
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4167B8' },
        bgColor: { argb: '' }
      }
      cell.font = {
        bold: true,
        color: { argb: 'FFFFFF' },
        size: 12
      }
    });

    data.forEach((d: any) => {
      worksheet.addRow(d);
    });

    worksheet.addRow([]);

    //Generate & Save Excel File
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, title + '.xlsx');
    })
  }

  importExcel(file: any): any {
    let workBook: any;
    let jsonData = null;
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial:any, name: any) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      this.importedJson.next(jsonData);
    }
    reader.readAsBinaryString(file);
  }
}
