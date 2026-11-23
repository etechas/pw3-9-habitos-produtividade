import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<div class="container"><h1>Hábitos e Produtividade</h1><router-outlet /></div>`
})
export class App {}
