import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { TarifaDetalle } from 'src/app/interfaces/tarifasdespacho.interface';


import { ClienteService } from 'src/app/services/cliente.service';
import { DetalleService } from 'src/app/services/detalle.service';
import { ExcelService } from 'src/app/services/excel.service';
import { TarifadespachoService } from 'src/app/services/tarifadespacho.service';

import { ImagePosition, Workbook, Worksheet } from 'exceljs';
import * as fs from 'file-saver';

@Component({
  selector: 'app-modal-prefactura',
  templateUrl: './modal-prefactura.component.html',
  styleUrls: ['./modal-prefactura.component.css']
})
export class ModalPrefacturaComponent implements OnInit {

  public detalles: TarifaDetalle[] = [];
  public clientes: Cliente[] = [];

  public total: number= 0;
  public iva: number = 0;
  public bruto: number= 0;

  @Input() idDespacho = 0;
  @Input() Estado = '';
  @Input() idDetails = 0;
  @Input() idClient = 0;

  @Output() cerrar = new EventEmitter<boolean>();

  public Detalle = {
    estado:''
  }

  private _workbook!: Workbook;
  constructor(
    private tarifad:TarifadespachoService,
    private detalle:DetalleService,
    private client:ClienteService,
    
  ) { }

  ngOnInit(): void {
    console.log(this.idDetails)
    this.getTarifasDetalle(this.idDetails);
    this.getCliente(this.idClient);
  }

  cerrarModal():void{
    this.cerrar.emit(false);
  }

  getTarifasDetalle(id:number){
    this.tarifad.getTarifaDetalle(id)
    .subscribe(tDetalle =>{
     this.detalles = tDetalle
     console.log(this.detalles)
     this.total =  this.detalles.map(
      ({tvalore}) => tvalore).reduce((acc, value) => acc + value, 0);
 
      this.iva = this.total * 0.19;
      this.bruto = this.iva+this.total;
    })
  }

  getCliente(id:number){
    this.client.getClientById(id)
    .subscribe((cliente) =>{
    this.clientes = cliente
      console.log(this.clientes)
    })
  }

  confirmaFactura(){
    this.Detalle.estado = 'Confirmado';
    this.Estado = 'Confirmado';
    this.detalle.EditaDetalle(this.idDetails,this.Detalle)
    .subscribe(detail =>{
      console.log(detail)
    })
  }

  download(): void {
   
    this._workbook = new Workbook();

    this._workbook.creator = 'MTV';

   this._createDetalleTable();

    this._workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data]);
      fs.saveAs(blob, 'Prefactura'+this.idDetails+'.xlsx');
    });
      
  }

   _createDetalleTable() {
    // CREAMOS LA PRIMERA HOJA
    const sheet = this._workbook.addWorksheet('PreFactura');

    // ESTABLECEMOS EL ANCHO Y ESTILO DE LAS COLUMNAS
    sheet.getColumn('B').width = 21;
    sheet.getColumn('C').width = 38;
    sheet.getColumn('D').width = 20;
    sheet.getColumn('E').width = 20;
    sheet.getColumn('F').width = 29;

    sheet.columns.forEach((column) => {
      column.alignment = { vertical: 'middle', wrapText: true };
    });

    //AGREGAMOS UN TITULO
    const titleCell = sheet.getCell('B2');
    titleCell.value = 'Prefactura';
    titleCell.style.font = { bold: true, size: 24 };

    //CREAMOS LOS TITULOS PARA LA CABECERA
    sheet.getCell('B4').value = 'Razon Social: ';
    sheet.getCell('B5').value = 'Rut: ';
    sheet.getCell('B6').value = 'Giro: ';
    sheet.getCell('B7').value = 'Dirección: ';
    sheet.getCell('B8').value = 'Comuna: ';

    this.clientes.map(cliente =>{

      sheet.getCell('C4').value =  cliente.nombre;
      sheet.getCell('C5').value =  cliente.rut;
      sheet.getCell('C6').value =  cliente.giro
      sheet.getCell('C7').value =  cliente.direccion;
      sheet.getCell('C8').value = 'Viña del mar ';

      sheet.getCell('F4').value = 'Valparaiso ';
      sheet.getCell('F5').value = 'test@gmail.com ';
      sheet.getCell('F6').value = '+56 9 4587 5241 ';
      sheet.getCell('F7').value = '25/08/2022 ';

    })

   

    sheet.getCell('E4').value = 'Ciudad: ';
    sheet.getCell('E5').value = 'Email: ';
    sheet.getCell('E6').value = 'Contacto: ';
    sheet.getCell('E7').value = 'Fecha emosión: ';
   


    const headerRow = sheet.getRow(10);
    // ESTAMOS JALANDO TODAS LAS COLUMNAS DE ESA FILA, "A","B","C"..etc
    headerRow.values = [
      '', // column A
      '#', // column B
      'Tarifa', // column C
      'Descripcion', // column D
      'Total', // column E
    ];

    headerRow.font = { bold: true, size: 12 };

    

    // INSERTAMOS LOS DATOS EN LAS RESPECTIVAS COLUMNAS
    const rowsToInsert = sheet.getRows(11, this.detalles.length)!;

    for (let index = 0; index < rowsToInsert.length; index++) {
      const itemData = this.detalles[index]; // obtenemos el item segun el index de la iteracion (recorrido)
      const row = rowsToInsert[index]; // obtenemos la primera fila segun el index de la iteracion (recorrido)

      //  los valores de itemData seran asignados a "row" (fila actual en la iteracion)

      row.values = [
        '', // column A
        index, // column B
        itemData.tnombre, // column C
        itemData.tnombre, // column D
        itemData.tvalori, // column E
      ];

    }

    const rowTotal = this.detalles.length +12;
    const rowIva = this.detalles.length +13;
    const rowBruto = this.detalles.length +14;
    sheet.getCell('D'+rowTotal).value = 'Total Neto';
    sheet.getCell('D'+rowIva).value = 'I.V.A (19%)';
    sheet.getCell('D'+rowBruto).value = 'Total Bruto';

    sheet.getCell('E'+rowTotal).value = this.total;
    sheet.getCell('E'+rowIva).value = this.iva;
    sheet.getCell('E'+rowBruto).value = this.bruto;

  }

}
