import { Injectable } from '@angular/core';
import { ImagePosition, Workbook, Worksheet } from 'exceljs';
import * as fs from 'file-saver';
import { Observable } from 'rxjs';
import { IDataFacturaExcel } from '../interfaces/excel.interface';
import { HttpClient } from '@angular/common/http';



@Injectable({ providedIn: 'root' })
export class ExcelService {

  constructor(
    private http:HttpClient
  ) { }

  private _workbook!: Workbook;

  async dowloadExcel(detalles:object, cliente:object): Promise<void> {
   
    this._workbook = new Workbook();

    this._workbook.creator = 'MTV';

   /* await this._createDetalleTable(detalles,cliente);

    this._workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data]);
      fs.saveAs(blob, 'Prefactura.xlsx');
    });*/
  }


  private async _createDetalleTable(detalles:object,cliente:object): Promise<void> {
    // CREAMOS LA PRIMERA HOJA
    const sheet = this._workbook.addWorksheet('PreFactura');

    // ESTABLECEMOS EL ANCHO Y ESTILO DE LAS COLUMNAS
    /*sheet.getColumn('B').width = 21;
    sheet.getColumn('C').width = 38;
    sheet.getColumn('D').width = 20;
    sheet.getColumn('E').width = 20;
    sheet.getColumn('F').width = 29;*/

    sheet.columns.forEach((column) => {
      column.alignment = { vertical: 'middle', wrapText: true };
    });

    //AGREGAMOS UN TITULO
    const titleCell = sheet.getCell('B2');
    titleCell.value = 'Prefactura';
    titleCell.style.font = { bold: true, size: 24 };

    //CREAMOS LOS TITULOS PARA LA CABECERA
    const B4 = sheet.getCell('B4');
  

    const headerRow = sheet.getRow(10);
    // ESTAMOS JALANDO TODAS LAS COLUMNAS DE ESA FILA, "A","B","C"..etc
    headerRow.values = [
      '#', // column A
      'Tarifa', // column B
      'Descripcion', // column C
      'Total', // column D
    ];

    headerRow.font = { bold: true, size: 12 };

    // INSERTAMOS LOS DATOS EN LAS RESPECTIVAS COLUMNAS
  /*  const rowsToInsert = sheet.getRows(11, detalles.length)!;

    for (let index = 0; index < rowsToInsert.length; index++) {
      const itemData = detalles[index]; // obtenemos el item segun el index de la iteracion (recorrido)
      const row = rowsToInsert[index]; // obtenemos la primera fila segun el index de la iteracion (recorrido)

      //  los valores de itemData seran asignados a "row" (fila actual en la iteracion)

      row.values = [
        '', // column A
        '', // column B
        itemData.tnombre, // column C
        itemData.tvalore, // column D
        itemData.tvalori, // column E
      ];

      //Agrega Imagen a excel
     /* const idImage = await this._getIdImage(itemData.urlImage);
      sheet.addImage(idImage, {
        tl: { col: 1, row: row.number - 1 },
        ext: { width: 109, height: 110 },
      });

      row.height = 92;

    }*/
  }
  /**
   * Esta función realizará una petición http a la url de la imagen, cuando retorne la imagen capturamos el buffer y lo agregamos al libro,
   * cuando lo agreguemos retornara un id
   * @param url
   * @returns id de la imagen insertada en el libro
   */
 /* private async _getIdImage(url: string): Promise<number> {
    const response = await fetch(url);
    const image = this._workbook.addImage({
      buffer: await response.arrayBuffer(),
      extension: 'jpeg',
    });

    return image;
  }*/

  
}
