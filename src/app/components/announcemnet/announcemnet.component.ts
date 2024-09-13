import { Component,OnInit } from '@angular/core';
import { AnnouncementService } from '../../services/announcement.service';
import { Router } from '@angular/router';
import { ModelAnnouncement } from '../../models/model-announcement';

declare var $: any;
@Component({
  selector: 'app-announcemnet',
  templateUrl: './announcemnet.component.html',
  styleUrl: './announcemnet.component.css'
})
export class AnnouncemnetComponent implements OnInit {
  model: ModelAnnouncement = {
    Id: 0,
    Date: new Date(),
    ActiveFrom: '2050-11-01',
    ActiveTo: '2050-10-01',
    Announcement:'Loream ipsum Loream ipsum Loream ipsum Loream ipsum Loream ipsum Loream ipsum'
  };
  constructor(private AnnouncementService: AnnouncementService, private router: Router) {}
  ngOnInit(): void {
    $(document).ready(function() {
      $('#datepicker').datepicker({ dateFormat: 'dd-mm-yy',showAnim: "drop",
        localToday: new Date()    });
      $('#ActiveFrom').datepicker();
      $('#ActiveTo').datepicker();
    });
  }
  onSubmit(): void {
    debugger;
    console.log('onSubmit method called'); 
    if (this.model.Id === 0) {
      this.addingAnnouncement();
    } else {
      // this.updateAnnouncement();
    }
  }  

  addingAnnouncement(): void {
    this.AnnouncementService.addAnnouncement(this.model).subscribe({
      next: () => {
        console.log('Announcement Added Successfully');
        this.router.navigate(['/']);
      },
      error: (err:any) => {
        console.error('Error adding Announcement:', err);
      }
    });
  }
}
