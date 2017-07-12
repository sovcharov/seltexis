export interface Alert {
     alertClass: string,
     text: string,
     comment: string,
     life?: number,
     waitForClick?: boolean
   };

export class AlertService {

  alerts: Alert[];
  alertClasses = {
      danger: 'infoBoxDanger',
      success: 'infoBoxSuccess'
  };

  constructor () {
    this.alerts = [];
  }

  addAlert(alert: Alert): void {
    let alertToAdd: Alert = {
      alertClass: alert.alertClass,
      text: alert.text,
      comment: alert.comment,
      life: alert.life || 5,
      waitForClick: alert.waitForClick || false
    };
    this.alerts[this.alerts.length] = alertToAdd;
    let myInterval: any = 0;
    if(!myInterval) {
      myInterval = setInterval(() => {
        let i: number;
        if(this.alerts.length) {
          for (i = 0; i < this.alerts.length; i += 1) {
            if (this.alerts[i].life) {
              this.alerts[i].life -= 1;
            } else {
              if(!this.alerts[i].waitForClick) {
                this.deleteAlert(i);
                i -= 1;
              }
            }
          }
        } else {
          clearInterval(myInterval);
          myInterval = 0;
        }
      }, 1000);
    }
  };

  getAlertClass(alertClass: string) {
    return this.alertClasses[alertClass];
  }

  deleteAlert(index) {
      this.alerts.splice(index, 1)
  }

}
