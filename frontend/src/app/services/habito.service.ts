import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Habito } from '../models/habito.model';

@Injectable({ providedIn: 'root' })
export class HabitoService {
  private http = inject(HttpClient);
  private readonly api = 'http://localhost:8080/api/habitos';

  listar(): Observable<Habito[]> {
    return this.http.get<Habito[]>(this.api);
  }

  buscarPorId(id: number): Observable<Habito> {
    return this.http.get<Habito>(`${this.api}/${id}`);
  }

  criar(habito: Habito): Observable<Habito> {
    return this.http.post<Habito>(this.api, habito);
  }

  atualizar(id: number, habito: Habito): Observable<Habito> {
    return this.http.put<Habito>(`${this.api}/${id}`, habito);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  checkin(id: number): Observable<Habito> {
    return this.http.post<Habito>(`${this.api}/${id}/checkin`, {});
  }
}

// Extrai a mensagem enviada pelo backend (ex.: regra de negócio bloqueou algo)
export function mensagemDeErro(err: HttpErrorResponse): string {
  if (err.status === 0) {
    return 'Não foi possível conectar ao servidor.';
  }
  return err.error?.detail || err.error?.message || 'Ocorreu um erro inesperado.';
}
