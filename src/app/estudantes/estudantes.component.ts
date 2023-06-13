import { Estudante } from './../estudante';
import { Component } from '@angular/core';
import { EstudanteService } from '../estudante.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estudantes',
  templateUrl: './estudantes.component.html',
  styleUrls: ['./estudantes.component.css']
})
export class EstudantesComponent {
  estudantes: Estudante[] = [];

  constructor(private estudanteService: EstudanteService,
              private router : Router    ) {
  }

  ngOnInit(): void {
    this.loadEstudantes();
  }

  loadEstudantes() {
    this.estudanteService.getEstudantes().subscribe(
      {
        next: data => this.estudantes = data
      }
    );

  }

  create(){
    this.router.navigate(['createEstudante']);
  }

  edit(Estudante: Estudante) {
    this.router.navigate(['estudanteDetails', Estudante.id]);
  }


  remove(estudante: Estudante){
    this.estudanteService.remove(estudante).subscribe({
      next : () => this.loadEstudantes()
    })
  }
}

