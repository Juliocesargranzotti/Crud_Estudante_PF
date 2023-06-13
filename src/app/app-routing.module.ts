import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstudanteComponent } from './estudante/estudante.component';
import { EstudantesComponent } from './estudantes/estudantes.component';




const routes: Routes = [
    {path: '',component : EstudantesComponent},
    {path: 'estudantes',component : EstudantesComponent},
    {path: 'estudanteDetails/:id',component : EstudanteComponent},
    {path: 'createEstudante',component : EstudanteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
