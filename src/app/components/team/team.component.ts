import { Component } from '@angular/core';

import { TeamService } from '../../services/team.service';
import { Router } from '@angular/router';
import { ModelTeam } from '../../models/model-team';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {
  model: ModelTeam = {
    Id: 0,
    TeamId: 0,
    CompanyId: 0,
    TeamName: ''
  };

  constructor(private teamService: TeamService, private router: Router) {}

  onSubmit(): void {
    debugger;
    console.log('onSubmit method called'); // Debugging statement
    if (this.model.Id === 0) {
      this.addingTeam();
    } else {
      // this.updateEmployee();
    }
  }  

  addingTeam(): void {
    this.teamService.addTeam(this.model).subscribe({
      next: () => {
        console.log('Team Added Successfully');
        this.router.navigate(['/']);
      },
      error: (err:any) => {
        console.error('Error adding Team:', err);
      }
    });
  }

}