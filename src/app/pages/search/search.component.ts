import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { FilterConsultDTO } from 'src/app/dto/filterConsultDTO';
import { ConsultService } from 'src/app/service/consult.service';
import * as moment from 'moment';
import { Consult } from 'src/app/model/consult';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { SearchDialogComponent } from './search-dialog/search-dialog.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{

  form: FormGroup;
  dataSource: MatTableDataSource<Consult>
  displayedColumns = ['patient', 'medic', 'specialty', 'date', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('tab') tabGroup: MatTabGroup;

  constructor(
    private consultService: ConsultService,
    private _dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.form = new FormGroup({
      'dui': new FormControl(),
      'fullname': new FormControl(),
      'startDate': new FormControl(),
      'endDate': new FormControl()
    });
  }

  search(){
    if(this.tabGroup.selectedIndex == 0){
      //Option 1
      const dui = this.form.value['dui'];
      const fullname = this.form.value['fullname'];
      const dto = new FilterConsultDTO(dui, fullname);

      if(dto.dui == null){
        delete dto.dui;
      }

      if (dto.fullname == null) {
        delete dto.fullname;
      }

      this.consultService.searchOthers(dto).subscribe(data => {
        this.createTable(data);
      });

    }else{
      //Option 2
      let date1 = this.form.value['startDate'];
      let date2 = this.form.value['endDate'];
      date1 = moment(date1).format('YYYY-MM-DDTHH:mm:ss');
      date2 = moment(date2).format('YYYY-MM-DDTHH:mm:ss');
      this.consultService.searchByDates(date1, date2).subscribe(data => {
        this.createTable(data);
      });
    }
  }

  createTable(data: Consult[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  viewDetails(consult: Consult){
    this._dialog.open(SearchDialogComponent, {
      width: '750px',
      data: consult
    });
  }
}
