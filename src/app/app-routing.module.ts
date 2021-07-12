import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BoardComponent} from "./components/board/board.component";
import {RegisterComponent} from "./components/register/register.component";

const routes: Routes = [
  { path: 'game/:id', component: BoardComponent },
  { path: '', component: RegisterComponent },
  //{ path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
