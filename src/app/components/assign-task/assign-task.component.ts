import { Component } from '@angular/core';
import { AssignTaskService } from '../../services/assign-task.service';
import { Router } from '@angular/router';
import { ModelAnnouncement } from '../../models/model-announcement';
import { ModelAssignTask } from '../../models/model-assign-task';
declare var $:any;
@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrl: './assign-task.component.css'
})
export class AssignTaskComponent {
  model: ModelAssignTask = {
    Id: 0,
    UserId: 0,
    AssignedUserId: 0,
    Description: "",
    TargetDate: "",
    Step: "step2", 
    Remarks: ""
  };

  constructor(private _AssignTaskService: AssignTaskService, private router: Router) {}

  ngAfterViewInit(): void {
   
  }

  onSubmit(): void {
    debugger;
    alert("###");
    console.log('onSubmit method called');
    console.log(this.model);
    if (this.model.Id === 0) {
      this.addingAssignTask();
    } else {
      // Handle update logic if needed
    }
  }

  addingAssignTask(): void {
    this._AssignTaskService.addAssignTask(this.model).subscribe({
      next: () => {
        console.log('Task Assigned Successfully');
        this.router.navigate(['/']); // Navigate to the desired route
      },
      error: (err:any) => {
        console.error('Error Task Assigned:', err);
      }
    });
  }
}
