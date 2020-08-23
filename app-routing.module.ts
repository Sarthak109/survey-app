import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from "./header/header.component";
import { CrudComponent } from './crud/crud.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [

    {
      path:'',
      component:FormComponent,
      // pathMatch:'full'
    },
    {
      path:'login',
      component: LoginComponent
    },
    {
      path:'crud',
      component:CrudComponent,
      canActivate:[AuthGuard],
      runGuardsAndResolvers: 'always'
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
