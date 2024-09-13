import { Component, OnInit } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
declare var $:any;

@Component({
  selector: 'app-root',
  
  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Note: it should be `styleUrls` not `styleUrl`
})
export class AppComponent implements OnInit {
  title = 'iSolveProFrontEnd';

  constructor() { }

  ngOnInit(): void {
    // You can add other initialization logic here if needed
  }
  
}
