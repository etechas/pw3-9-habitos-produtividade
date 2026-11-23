import { Component, OnInit, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Habito } from '../models/habito.model';
import { HabitoService, mensagemDeErro } from '../services/habito.service';

@Component({
  selector: 'app-habito-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './habito-form.html'
})
export class HabitoForm implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(HabitoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id: number | null = null;
  erro = '';

  form = this.fb.nonNullable.group({
    descricao: ['', [Validators.required, Validators.minLength(3)]],
    metaDias: [1, [Validators.required, Validators.min(1)]]
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      this.service.buscarPorId(this.id).subscribe({
        next: (h) => this.form.patchValue({ descricao: h.descricao, metaDias: h.metaDias }),
        error: (e: HttpErrorResponse) => (this.erro = mensagemDeErro(e))
      });
    }
  }

  salvar(): void {
    this.erro = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dados: Habito = {
      ...this.form.getRawValue(),
      diasConsecutivos: 0,
      conquistaAlcancada: false
    };

    const requisicao = this.id
      ? this.service.atualizar(this.id, dados)
      : this.service.criar(dados);

    requisicao.subscribe({
      next: () => {
        const sucesso = this.id ? 'Hábito atualizado com sucesso!' : 'Hábito criado com sucesso!';
        this.router.navigate(['/habitos'], { state: { sucesso } });
      },
      error: (e: HttpErrorResponse) => (this.erro = mensagemDeErro(e))
    });
  }
}
