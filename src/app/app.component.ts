import { AppService } from 'src/app/app.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  //encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  
  
  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.loadData();
    }

   
}
