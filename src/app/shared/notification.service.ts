import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class NotificationService {
    private _messages = new Subject<string>();
    messages$ = this._messages.asObservable();


    show(msg: string) {
        this._messages.next(msg);
    }
}