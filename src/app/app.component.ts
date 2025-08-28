import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NotificationContainerComponent } from './shared/notification-container/notification-container.component';


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterLink, RouterOutlet, DatePipe, NotificationContainerComponent],
    template: `
<header class="header">
<nav>
<a routerLink="/">Home</a>
<a routerLink="/users">Usuarios</a>
<a routerLink="/add-user">Añadir usuario</a>
</nav>
<span class="date">{{ today | date:'fullDate' }}</span>
</header>


<main class="container">
<router-outlet />
</main>


<app-notification-container />
`,
    styles: [`
.header { display:flex; align-items:center; justify-content:space-between; gap:1rem; padding:1rem; background:#101828; color:#fff; }
nav { display:flex; gap:1rem; }
nav a { color:#fff; text-decoration:none; font-weight:600; }
nav a:hover { text-decoration:underline; }
.container { padding: 1.25rem; max-width: 1100px; margin: 0 auto; }
.date { opacity: .8; font-size: .9rem; }
`]
})
export class AppComponent {
    today = new Date();
}