import { Injectable } from '@angular/core';
import { 
  faShoppingCart as fasShoppingCart, 
  faUserCircle as fasUserCircle,
  faCog as fasCog,
  faEdit as fasEdit,
  faUndo as fasUndo,
  faRedo as fasRedo
} from '@fortawesome/free-solid-svg-icons';
// import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
// import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor(public library: FaIconLibrary) {
    // Add multiple icons to the library
    library.addIcons(fasShoppingCart, fasUserCircle, fasCog, fasEdit, fasUndo, fasRedo);
  }

}