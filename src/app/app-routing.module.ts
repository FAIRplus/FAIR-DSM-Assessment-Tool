
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrintDetailComponent } from "./print-detail/print-detail.component";
import {LandingComponent} from "./app-home/landing.component";

const routes: Routes = [

  {
    path:"assess",
    loadChildren: () => import("./app-body/home.module").then((m)=>m.HomeModule)
  },
  {
    path:"",
    component:LandingComponent
  },
  {
	path:"print",
	component:PrintDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
