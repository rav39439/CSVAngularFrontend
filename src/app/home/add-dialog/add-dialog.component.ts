import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
// import { DialogData } from 'src/model/Dialog.model';
import { FormGroup,FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent {

  name:string="";
  empid:string="";
  email:string="";
  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  }




  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {

  }



}
