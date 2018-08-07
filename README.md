# MTGDash

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.5. Base template for web apps.

## Libraries

Angular 6, Firebase, Angular-flex-layout, Angular Material. Includes service workers.

## Usage

Download or clone this repo and then add the `envirnoment.ts` and `environment.prod.ts` files to the `/environments` folder and add your firebase details:

```ts
export const environment = {
  production: true
};

export const firebaseEnvironment = {
  production: true,
  firebase: {
    apiKey: 'xxxx',
    authDomain: 'xxx',
    databaseURL: 'xxx',
    projectId: 'xxx',
    storageBucket: 'xxx',
    messagingSenderId: 'xxx'
  }
};
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
