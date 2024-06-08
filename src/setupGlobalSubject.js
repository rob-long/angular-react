import { Subject } from 'rxjs';

window.sharedTextSubject = new Subject();
console.log('sharedTextSubject initialized', window.sharedTextSubject);
