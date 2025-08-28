import { Component, OnInit, inject } from '@angular/core';
import { UpperCasePipe, SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../core/user.service';
import { User } from '../../../core/user.model';
import { HighlightEvenIdDirective } from '../../../shared/highlight-even-id.directive';
import { UserFilterPipe } from '../../../shared/user-filter-pipe';


@Component({
    selector: 'app-user-list',
    standalone: true,
    imports: [FormsModule, RouterLink, UpperCasePipe, SlicePipe, UserFilterPipe, HighlightEvenIdDirective],
    template: `
<h2>{{ 'Usuarios' | uppercase }}</h2>


<div class="toolbar">
<input placeholder="Filtrar por nombre o email" [(ngModel)]="term" />
</div>


@if (loading) {
<p>Cargando usuarios...</p>
} @else {
@if ((users | userFilter: term).length === 0) {
<p>No hay usuarios que coincidan.</p>
} @else {
<div class="grid">
@for (u of (users | userFilter: term) | slice: startIndex : endIndex; track u.id) {
<article class="card" [appHighlightEvenId]="u.id">
<img [src]="u.avatar" [alt]="u.name" />
<div class="body">
<h3>{{ u.name }}</h3>
<p class="muted">{{ u.email }}</p>
<p class="id">ID: <strong>{{ u.id }}</strong></p>
<div class="actions">
<a [routerLink]="['/users', u.id]" class="btn">Detalles</a>
<button class="btn danger" (click)="onDelete(u.id)">Eliminar</button>
</div>
</div>
</article>
}
</div>


@if ((users | userFilter: term).length > pageSize) {
  <div class="pagination">
    <button (click)="prev()" [disabled]="page === 1">⟵</button>
    <span>Página {{ page }} / {{ totalPages }}</span>
    <button (click)="next()" [disabled]="page >= totalPages">⟶</button>
  </div>
}
}
}
`,
    styles: [`
.toolbar { margin-bottom: .75rem; }
input { width: 100%; max-width: 420px; padding:.55rem .7rem; border:1px solid #e5e7eb; border-radius:.5rem; }
.grid { display:grid; grid-template-columns: repeat(auto-fill,minmax(240px,1fr)); gap: .9rem; }
.card { border:1px solid #e5e7eb; border-radius:.75rem; overflow:hidden; background:#fff; display:flex; gap:.75rem; padding:.75rem; align-items:center; }
.card img { width:72px; height:72px; border-radius: 50%; object-fit:cover; }
.body { flex:1; }
.muted { color:#667085; font-size:.9rem; }
.id { color:#334155; font-size:.85rem; }
.actions { display:flex; gap:.5rem; margin-top:.5rem; }
.btn { background:#0ea5e9; color:#fff; border:none; padding:.45rem .7rem; border-radius:.4rem; cursor:pointer; text-decoration:none; }
.btn.danger { background:#ef4444; }
.pagination { display:flex; align-items:center; gap:.75rem; justify-content:center; margin-top:1rem; }
.pagination button { padding:.35rem .6rem; }
`]
})
export class UserListComponent implements OnInit {
    private svc = inject(UserService);


    users: User[] = [];
    loading = true;


    // filtro
    term = '';


    // paginación client-side simple
    page = 1;
    pageSize = 6;


    get totalPages() {
        const total = (this.users.filter(u => this.matches(u, this.term))).length;
        return Math.max(1, Math.ceil(total / this.pageSize));
    }


    get startIndex() { return (this.page - 1) * this.pageSize; }
    get endIndex() { return this.page * this.pageSize; }


    ngOnInit(): void {
        this.svc.getUsers().subscribe(users => {
            this.users = users;
            this.loading = false;
        });
    }


    onDelete(id: number) {
        if (!confirm('¿Eliminar usuario? (simulado)')) return;
        this.svc.deleteUser(id).subscribe(() => {
            // no quitamos de la lista aquí; el servicio lo filtra en la siguiente carga visual.
            this.users = this.users.filter(u => u.id !== id);
            alert('Usuario eliminado (simulado).');
        });
    }


    prev() { if (this.page > 1) this.page--; }
    next() { if (this.page < this.totalPages) this.page++; }


    private matches(u: User, t: string) {
        if (!t) return true;
        const s = t.toLowerCase();
        return u.name?.toLowerCase().includes(s) || u.email?.toLowerCase().includes(s);
    }
}