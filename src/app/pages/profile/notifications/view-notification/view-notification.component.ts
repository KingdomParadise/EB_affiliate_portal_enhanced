import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-notification',
  templateUrl: './view-notification.component.html',
  styleUrls: ['./view-notification.component.css']
})
export class ViewNotificationComponent implements OnInit {
  notification:any;
  constructor(
    public dialog: MatDialog,
    @Optional() public dialogRef: MatDialogRef<ViewNotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.notification = this.data;
    console.log(this.notification);
  }

  closeModal() {
    this.dialogRef.close()
  }
}
