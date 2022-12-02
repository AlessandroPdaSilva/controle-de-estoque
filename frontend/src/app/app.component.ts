import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'angular8-restfull';
  @ViewChild('checkboxSidebar') checkboxSidebar!: ElementRef;

  constructor(private router: Router){}

  ngOnInit(): void {

    if(localStorage.getItem('token') == null){
      this.router.navigate(['login']);
    }

    

  }

  public logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  public esconderBarra(){
    if(localStorage.getItem('token')!= null){
      return false;
    }else{
      return true;
    }
  }

  public closeSidebar(){
    this.checkboxSidebar.nativeElement.checked = false
  }



}
