import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Estudante } from '../estudante';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudanteService } from '../estudante.service';

@Component({
  selector: 'app-estudante',
  templateUrl: './estudante.component.html',
  styleUrls: ['./estudante.component.css']
})
export class EstudanteComponent {

  formGroupClient: FormGroup;
  submitted: boolean = false;
  isEditing: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private estudanteService: EstudanteService,
    private route: ActivatedRoute,
    private router: Router

  ) {
    this.formGroupClient = formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      date: ['', [Validators.required]],
      telefone:['',[Validators.required]]
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.getEstudanteById(id);
  }


  getEstudanteById(id: number) {
    this.estudanteService.getEstudante(id).subscribe({
      next: data => {
        this.formGroupClient.setValue(data);
        this.isEditing = true;
      }
    })
  }


  save() {
    this.submitted = true;
    if (this.formGroupClient.valid) {
      if (this.isEditing) {
        this.estudanteService.update(this.formGroupClient.value).subscribe({
          next: () => {
            this.router.navigate(['estudantes']);
          }
        })
      }
      else {
        this.estudanteService.save(this.formGroupClient.value).subscribe({
          next: () => {
            this.router.navigate(['estudantes']);
          }
        })
      }
    }
  }

  cancel() {
    this.router.navigate(['estudantes']);
  }



  get name(): any {
    return this.formGroupClient.get("name");
  }

  get email(): any {
    return this.formGroupClient.get("email");
  }

  get date(): any {
    return this.formGroupClient.get("date");
  }

  get telefone(): any {
    return this.formGroupClient.get("telefone");
  }

}
