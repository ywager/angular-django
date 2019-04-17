import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateUserComponent } from './actions/create-user/create-user.component';
import { EditUserComponent } from './actions/edit-user/edit-user.component';
import { DeleteUserComponent } from './actions/delete-user/delete-user.component';
import { ChangePasswordComponent } from './actions/change-password/change-password.component';

import { MessagesService } from './../../../shared/components/messages/services/messages.service';
import { UsersService } from './../../../core/services/users.service';
import { User } from '../../../core/models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['select', 'username', 'email', 'is_active', 'date_joined'];
  dataSource = new MatTableDataSource([]);
  selection = new SelectionModel<User>(true, []);

  choices = [
    {
      name: 'username',
      label: 'Name',
      singleton: true
    },
    {
      name: 'is_active',
      label: 'Active',
      options: [
        {key: true, label: 'Yes'},
        {key: false, label: 'No'}
      ],
      singleton: true
    }
  ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private dialog: MatDialog,
    private message: MessagesService,
    private usersService: UsersService,
  ) { }

  ngOnInit() {
    this.usersService.getUsers().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  // table actions
  createUser(): void {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '480px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        this.message.success('User ' + result.username + ' was successfully created.');
      }
    });
  }

  editUser(): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '480px',
      data: {user: this.selection.selected[0]}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  deleteUser(): void {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      width: '480px',
      data: {user: this.selection.selected[0]}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(this.selection.selected);
    });
  }

  changePassword(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '480px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  searchUpdated(terms) {
    console.log(terms);
  }

  textSearch(customTerm) {
    console.log(customTerm);
  }

}
