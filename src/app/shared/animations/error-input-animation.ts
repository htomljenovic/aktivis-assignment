import {
  trigger,
  style,
  animate,
  transition,
} from '@angular/animations';

export const ERROR = trigger('showHide', [
  transition(':enter', [
    style({
      opacity: 0,
      color: '#de6773',
      transform: 'translateY(-20px)',
    }),
    animate(
      '0.3s ease-in-out',
      style({
        color: '#de6773',
        opacity: 1,
        transform: 'translateY(0px)',
      })
    ),
  ]),
  transition(':leave', [
    style({
      color: '#de6773',
      opacity: 1,
      transform: 'translateY(0px)',
    }),
    animate(
      '0.3s ease-in-out',
      style({
        opacity: 0,
        color: '#de6773',
        transform: 'translateY(-20px)',
      })
    ),
  ]),
]);
