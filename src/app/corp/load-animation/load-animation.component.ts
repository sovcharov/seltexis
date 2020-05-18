import { Component, OnInit } from '@angular/core';
import { LoadAnimationService } from '../../services/load-animation.service';
import { faCog } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-load-animation',
  templateUrl: './load-animation.component.html',
  styleUrls: ['./load-animation.component.css']
})
export class LoadAnimationComponent implements OnInit {
  faCog = faCog;

  constructor(
    private loadAnimationService: LoadAnimationService
  ) { }

  ngOnInit() {
  }

  public getLoadingStatus () {
    return this.loadAnimationService.loading;
  }

}
