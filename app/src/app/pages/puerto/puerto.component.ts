import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-puerto',
  templateUrl: './puerto.component.html',
  styleUrls: ['./puerto.component.css']
})
export class PuertoComponent implements OnInit {

  p: number= 1;
  public ocultarEditar : boolean = false;
  public ocultarRegistro : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
