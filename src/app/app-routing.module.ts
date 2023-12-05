// Ejemplo de configuración de rutas en app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioPagoComponent } from './formulario-pago/formulario-pago.component';

const routes: Routes = [
  { path: 'formulario-pago', component: FormularioPagoComponent },
  { path: '', redirectTo: '/formulario-pago', pathMatch: 'full' }
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
