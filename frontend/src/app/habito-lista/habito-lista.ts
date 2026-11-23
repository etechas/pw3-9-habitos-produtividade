import { Component, OnInit, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Habito } from '../models/habito.model';
import { HabitoService, mensagemDeErro } from '../services/habito.service';

@Component({
  selector: 'app-habito-lista',
  imports: [RouterLink],
  templateUrl: './habito-lista.html'
})
export class HabitoLista implements OnInit {
  private service = inject(HabitoService);

  habitos: Habito[] = [];
  sucesso = '';
  erro = '';

  ngOnInit(): void {
    this.sucesso = history.state?.sucesso ?? '';
    this.carregar();
  }

  carregar(): void {
    this.service.listar().subscribe({
      next: (lista) => (this.habitos = lista),
      error: (e: HttpErrorResponse) => (this.erro = mensagemDeErro(e))
    });
  }

  checkin(habito: Habito): void {
    this.limparMensagens();
    this.service.checkin(habito.id!).subscribe({
      next: () => {
        this.sucesso = 'Check-in registrado!';
        this.carregar();
      },
      error: (e: HttpErrorResponse) => (this.erro = mensagemDeErro(e))
    });
  }

  excluir(habito: Habito): void {
    this.limparMensagens();
    if (!confirm(`Excluir o hábito "${habito.descricao}"?`)) {
      return;
    }
    this.service.excluir(habito.id!).subscribe({
      next: () => {
        this.sucesso = 'Hábito excluído.';
        this.carregar();
      },
      error: (e: HttpErrorResponse) => (this.erro = mensagemDeErro(e))
    });
  }

  private limparMensagens(): void {
    this.sucesso = '';
    this.erro = '';
  }
}
