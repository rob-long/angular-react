import { BehaviorSubject } from 'rxjs';

class SubjectManager {
  constructor() {
    if (!window._subjectManager) {
      window._subjectManager = {};
    }
  }

  getSubject(name) {
    if (!window._subjectManager[name]) {
      window._subjectManager[name] = new BehaviorSubject(null);
    }
    return window._subjectManager[name];
  }

  updateSubject(name, newState) {
    if (!window._subjectManager[name]) {
      window._subjectManager[name] = new BehaviorSubject(newState);
    } else {
      window._subjectManager[name].next(newState);
    }
  }

  getCurrentState(name) {
    if (window._subjectManager[name]) {
      return window._subjectManager[name].getValue();
    }
    return null;
  }
}

// Create a singleton instance
const subjectManager = new SubjectManager();
export default subjectManager;

