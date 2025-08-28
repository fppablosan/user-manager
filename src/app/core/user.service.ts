import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, of, tap } from 'rxjs';
import { User } from './user.model';


@Injectable({ providedIn: 'root' })
export class UserService {
    private http = inject(HttpClient);
    private baseUrl = 'https://jsonplaceholder.typicode.com/users';


    // cache y mutaciones locales para simular persistencia en la UI
    private cache: User[] | null = null;
    private added: User[] = [];
    private deletedIds = new Set<number>();


    private withAvatar = (u: User): User => ({
        ...u,
        avatar: `https://i.pravatar.cc/150?img=${u.id}`,
    });


    getUsers() {
        if (this.cache) {
            return of(this.composeList(this.cache));
        }
        return this.http.get<User[]>(this.baseUrl).pipe(
            map(arr => arr.map(this.withAvatar)),
            tap(arr => (this.cache = arr)),
            map(arr => this.composeList(arr))
        );
    }


    private composeList(server: User[]): User[] {
        const filtered = server.filter(u => !this.deletedIds.has(u.id));
        return [...this.added, ...filtered];
    }


    getUser(id: number) {
        // intentar de cache/added primero
        const fromAdded = this.added.find(u => u.id === id);
        const fromCache = this.cache?.find(u => u.id === id);
        if (fromAdded) return of(fromAdded);
        if (fromCache) return of(fromCache);


        return this.http.get<User>(`${this.baseUrl}/${id}`).pipe(map(this.withAvatar));
    }


    addUser(payload: Pick<User, 'name' | 'email'>) {
        // JSONPlaceholder crea un id falso
        return this.http.post<User>(this.baseUrl, payload).pipe(
            map(res => ({ ...res, id: Math.floor(Math.random() * 10000) + 100, avatar: `https://i.pravatar.cc/150?u=${res.email}` } as User)),
            tap(u => this.added.unshift(u))
        );
    }


    deleteUser(id: number) {
        return this.http.delete(`${this.baseUrl}/${id}`).pipe(
            tap(() => this.deletedIds.add(id))
        );
    }
}