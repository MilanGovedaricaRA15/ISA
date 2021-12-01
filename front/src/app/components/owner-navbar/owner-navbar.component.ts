import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-owner-navbar',
  templateUrl: './owner-navbar.component.html',
  styleUrls: ['./owner-navbar.component.css']
})
export class OwnerNavbarComponent implements OnInit {

  @Output() profile = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  goToProfile(){
    this.profile.emit();
  }
}
