import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})
export class FormsComponent {
  constructor(private router:Router,private zone: NgZone){}
  gotopage(){
    // this.zone.run(() => {
      console.log('Button clicked inside Angular zone!');
    // });
  }
}
