import { Component, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { NotificationService } from '../notification.service';


@Component({
    selector: 'app-notification-container',
    standalone: true,
    imports: [],
    template: `
@if (message) {
<div class="toast">{{ message }}</div>
}
`,
    styles: [`
.toast {
position: fixed; right: 1rem; bottom: 1rem; padding: .75rem 1rem;
background: #1f2937; color: #fff; border-radius: .5rem; box-shadow: 0 6px 24px rgba(0,0,0,.2);
z-index: 9999; font-weight: 600;
}
`]
})
export class NotificationContainerComponent implements OnDestroy {
    message = '';
    private sub?: Subscription;
    private hideSub?: Subscription;


    constructor(ns: NotificationService) {
        this.sub = ns.messages$.subscribe(msg => {
            this.message = msg;
            this.hideSub?.unsubscribe();
            this.hideSub = timer(3000).subscribe(() => (this.message = ''));
        });
    }


    ngOnDestroy(): void {
        this.sub?.unsubscribe();
        this.hideSub?.unsubscribe();
    }
}