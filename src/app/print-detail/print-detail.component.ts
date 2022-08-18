import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";


@Component({
  selector: 'app-print-detail',
  template: `


      <nz-table
        #basicTable
        [nzData]="userResponseData"
        [nzFrontPagination]="false"
      >
        <thead>
        <tr>
          <th>Level</th>
          <th>Representation & Format</th>
          <th>Content & Context</th>
          <th>Hosting Environment Capabilities</th>
          <th>Overall Level % Completion </th>
        </tr>
        </thead>
        <tbody class="text-color-red">
        <tr *ngFor="let data of basicTable.data">
          <td><a href="{{data.URI}}" target="_blank" >{{data.Level}}</a></td>
          <td>{{ data.PresentationScore }}%</td>
          <td>{{ data.ContentScore }}%</td>
          <td>{{ data.Hosting }}%</td>
          <td>{{ data.TotalScoreByLevel }}%</td>
        </tr>
        </tbody>
      </nz-table>
      <nz-divider></nz-divider>
      <div *ngFor="let data of details">
	    <div style="break-after:page"></div>
		<p>Based on this assessment, <b>{{data.detailedResultData.length - data.selectedIndicatorsForDetailedResultLevel}} indicators </b>still need to be satisfied for your Datasets to reach <b>Maturity Level {{data.detailedResultLevelToFilter}}</b></p>
        <div *ngFor="let indicatorData of data.detailedResultData; let i = index" class="detailed-result-dev" >
          <ng-container>
            <input
              type="checkbox"
              [checked]="indicatorData.IsSelected" disabled
            />
            <label for="{{ indicatorData.IndicatorText }}" [style]="indicatorData.IsSelected === true ? 'color:green' : 'color:red'">
              <a href="{{indicatorData.URI}}" target="_blank" *ngIf="indicatorData.URI">[{{indicatorData.IndicatorId}}]</a>{{ indicatorData.IndicatorText }}</label
            >
          </ng-container>
        </div>
        <nz-divider></nz-divider>
      </div>


    <button
      nz-button
      class="submit-btn"
      nzType="primary"
      (click)="print()"
    >
      Print
    </button>
  `
})
export class PrintDetailComponent implements OnInit {
  userResponseData: any[] ;
   details: any;
  constructor(private router:Router) {
    const data= this.router.getCurrentNavigation()?.extras.state?.data as any;
    this.userResponseData = data?.userResponseData as any
    this.details=data?.details
  }

  ngOnInit(): void {
    if(!this.userResponseData){
       this.router.navigateByUrl('/')
         .catch(err=>{
           console.error(err);
         })
    }
  }

  print():void{
    window.print();
  }
  showDetailedResult(lvl:any){
    alert(lvl)
  }
}
