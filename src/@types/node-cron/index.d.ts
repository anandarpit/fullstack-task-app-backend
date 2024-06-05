declare module 'node-cron' {
    interface ScheduledTask {
      start: () => void;
      stop: () => void;
    }
  
    interface Cron {
      schedule: (cronExpression: string, func: () => void) => ScheduledTask;
    }
  
    const cron: Cron;
    export default cron;
  }
  