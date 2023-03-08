import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StundenOverviewComponent } from './component/stunden-overview/stunden-overview.component';

const routes: Routes = [{path : "", pathMatch : "full" ,component : StundenOverviewComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
