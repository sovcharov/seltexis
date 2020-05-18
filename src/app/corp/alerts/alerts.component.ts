import { Component, OnInit } from '@angular/core';
import { AlertService, Alert } from '../../services/alert.service'

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {
  alerts: Alert[] = [];

  constructor(public alertService: AlertService) {
  }

  ngOnInit() {
    this.alerts = this.alertService.alerts;
  }
}
