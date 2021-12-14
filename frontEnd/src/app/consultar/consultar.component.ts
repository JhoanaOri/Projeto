import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { BaseCrudService } from '../shared/service/base-crud.service';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})

export class ConsultarComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'phone', 'id'];
  dataSource: any;
  constructor(private service: BaseCrudService,
    private router: Router,
    private dialog: MatDialog) { }
  

  ngOnInit(): void {
    this.preencherGrid();
  }

  private preencherGrid() {
    this.service.findAll().subscribe(x => {
      this.dataSource = x;
    });
  }

  public editar(val){
    this.router.navigate(['cadastrar'], { state: { editar: true, id: val } });
  }

  public deletar(val){
    this.service.delete(val).subscribe(x => {
      if (x) {
        const dialogRef = this.dialog.open(DialogComponent, {
          width: '80%',
          data: {mensagem: 'Excluido com sucesso'}
        });
    
        dialogRef.afterClosed().subscribe((result) => {
          this.preencherGrid();
        });
      } else {
        this.dialog.open(DialogComponent, {
          width: '80%',
          data: {mensagem: 'Algo deu errado'}
        });
      }
    });
  }
}
