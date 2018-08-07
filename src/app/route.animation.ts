import { transition, style, trigger, animate, state, group, query } from "@angular/animations";


export let slideAnimation = trigger('slideAnimation', [
  transition('void => *', [
    style({
      transform: 'translate3d(0, -20px, 0)',
      opacity: 0,
    }),
    group([
      animate('300ms ease-in-out', style({
        //transform: 'translate3d(0, 0, 0)',
        transform: 'translate3d(0, 0, 0)',
        opacity: 1,
      })),
      animate('300ms 150ms ease-in-out', style({
        opacity: 1,
      }))
    ]),
  ]),
]);


export let routeAnimation = trigger('routeAnimation', [
  transition('void => *', [
    style({
      opacity: 0,
    }),
    animate('400ms 150ms ease-in-out', style({
      opacity: 1,
    }))
  ]),
]);


export let fadeInAnimation = trigger('fadeInAnimation', [
  transition('void => *', [
    style({
      opacity: 0,
    }),
    animate('400ms 150ms ease-in-out', style({
      opacity: 1,
    }))
  ]),
]);

export let flyInOut = trigger('flyInOut', [
  state('in', style({transform: 'translateX(0)'})),
  transition('void => *', [
    style({transform: 'translateY(101%)'}),
    animate(300)
  ]),
  transition('* => void', [
    animate(300, style({transform: 'translateY(100%)'}))
  ])
])

export let fadeInOut = trigger('fadeInOut', [
  state('in', style({opacity: 0})),
  transition(':leave', [
    style({opacity: 1}),
    group([
        animate('200ms ease-in-out', style({'opacity': '0'}))
    ])
  ]),
  transition(':enter', [
    style({opacity: 0}),
    group([
        animate('400ms ease-in-out', style({'opacity': '1'}))
    ])
  ])
])

export let spinInOut = trigger('spinInOut', [
  state('in', style({transform: 'rotate(0)', opacity: '1'})),
  transition(':enter', [
    style({transform: 'rotate(-180deg)', opacity: '0'}),
    animate('150ms ease')
  ]),
  transition(':leave', [
    animate('150ms ease', style({transform: 'rotate(180deg)', opacity: '0'}))
  ]),
])

export let preventInitial = trigger('preventInitial', [
  transition(':enter', [
    query(':enter', [], {optional: true})
  ]),
])