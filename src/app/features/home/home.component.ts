import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-home',
    standalone: true,
    imports: [RouterLink],
    template: `
<section class="hero">
<h1>Gestor de <strong>Usuarios</strong></h1>
<p>Práctica final de Angular Básico (Pablo Sánchez).</p>
<div class="cta">
<a routerLink="/users" class="btn">Ver usuarios</a>
<a routerLink="/add-user" class="btn outline">Añadir usuario</a>
</div>
</section>
`,
    styles: [`
.hero { text-align:center; padding: 3rem 1rem; }
h1 { font-size: 2.2rem; margin-bottom: .25rem; }
p { color:#475467; }
.cta { display:flex; gap: .75rem; justify-content:center; margin-top: 1rem; }
.btn { background:#0ea5e9; color:#fff; padding:.6rem 1rem; border-radius:.5rem; text-decoration:none; font-weight:700; }
.btn.outline { background:transparent; color:#0ea5e9; border:2px solid #0ea5e9; }
`]
})
export class HomeComponent { }