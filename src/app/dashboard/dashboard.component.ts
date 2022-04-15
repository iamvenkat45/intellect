import { UserService } from './services/user.service';
import { ExportExcelService } from './../services/export-excel.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public testObjectValue$: Observable<any>;
  public userEmail: string | null | undefined;
  public items = <any>[];
  constructor(private readonly authService: AuthService, private readonly router: Router,
    private readonly exportExcel: ExportExcelService, private readonly userService: UserService) { }

  ngOnInit(): void {
    this.userService.users.subscribe((data) => {
      for (const key in data[0]) {
        if (typeof data[0][key] === 'object') {
          this.items.push(data[0][key]);
        }
      }
      console.log('users data', this.items);
    });
    this.authService.getUser().subscribe((userDetails) => {
      this.userEmail = userDetails?.email;
    });
    this.subscribeToImportedJson();
  }

  logout() {
    this.authService
      .logout()
      .then(() => this.router.navigate(['/']))
      .catch((e) => console.log(e.message));
  }

  download() {
    const dataForExcel = <any>[];
    for (const key in this.items) {
      if (typeof this.items[key] === 'object') {
        dataForExcel.push(Object.values(this.items[key]));
      }
    }
    const reportData = {
      title: 'Employee Sales Report - Jan 2020',
      data: dataForExcel,
      headers: Object.keys(this.items[0])
    }
    this.exportExcel.exportExcel(reportData);
  }

  upload(data: any) {
    this.exportExcel.importExcel(data.target.files[0]);
    data.target.value = null;
  }

  subscribeToImportedJson() {
    this.exportExcel.importedJson.subscribe((jsonData: any) => {
      console.log('json data', jsonData);
      this.userService.replaceAll(jsonData['Sheet1']).then((data: any) => {
        console.log('data added', data);
      });
    })
  }

  goToUsers() {
    this.router.navigate(['/dashboard/']);
  }
}

