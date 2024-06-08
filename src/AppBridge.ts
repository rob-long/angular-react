import { BehaviorSubject } from 'rxjs';

interface WindowWithSubjectManager extends Window {
  _subjectManager: Record<string, BehaviorSubject<any>>;
}

declare const window: WindowWithSubjectManager;

class AppBridge {
  constructor() {
    if (!window._subjectManager) {
      window._subjectManager = {};
    }
  }

  getSubject<T>(name: string): BehaviorSubject<T | null> {
    if (!window._subjectManager[name]) {
      window._subjectManager[name] = new BehaviorSubject(null);
    }
    return window._subjectManager[name];
  }

  updateSubject<T>(name: string, newState: T): void {
    if (!window._subjectManager[name]) {
      window._subjectManager[name] = new BehaviorSubject<T>(newState);
    } else {
      window._subjectManager[name].next(newState);
    }
  }

  getValue<T>(name: string): T | null {
    if (window._subjectManager[name]) {
      return window._subjectManager[name].getValue();
    }
    return null;
  }
}

const Singleton = new AppBridge();
export default Singleton;

