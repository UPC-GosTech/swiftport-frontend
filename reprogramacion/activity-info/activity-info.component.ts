import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivitiesService } from '../../activities.service';
import { ActivityDetailsComponent } from '../../assign-activities/activity-details/activity-details.component';
import { changeEnvironmentConfig } from 'app/shared/services/confirmation/confirmation.models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'app-activity-info',
  templateUrl: './activity-info.component.html',
  styleUrls: ['./activity-info.component.scss']
})
export class ActivityInfoComponent {

  constructor(
    private matDialogRef: MatDialogRef<ActivityInfoComponent>,
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar,
    private activitiesService: ActivitiesService,
    private _userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.loadData();
  }

  loadData(){
    console.log(this.data);
    const param = {
      activityId: this.data.activityForm.activity_id
    }
  }

  // Reprogramación Manual
  reprogramManual(){
    const params = {
      "activityProgrammingId": this.data.id,
      "userUpdate": this._userService.userInfo.cNombreUsuario,
    }
    const response = {
      action: 'remove', 
      id: this.data.id
    }
    this.activitiesService.sendBackToProgramming(params).subscribe({
      next: (res) => {
        this.matDialogRef.close(response);
      },
      error: (err) => {

        this.matDialogRef.close(response);
      }
    });
  }

  // Reprogramación Automática
  reprogramAutomatic(){
    console.log("Reprogramación Automática");
  }
}
