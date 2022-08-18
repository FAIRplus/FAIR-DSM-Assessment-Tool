
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrintDetailComponent } from "./print-detail/print-detail.component";

const routes: Routes = [

  {
    path:"",
    loadChildren: () => import("./app-body/home.module").then((m)=>m.HomeModule)
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
