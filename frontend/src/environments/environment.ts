// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  serverUrL:'http://localhost:4200/oauth/callback',
  appId:'63bba42e5ae42f5628b0d338',
  ClientId:'63bba4774f3dd05d344c5ce1',
  returnUrl:'http://localhost:4200/oauth/login',
  appURL:'https://gsftestapi.educian.com/',
  serverURL:'http://localhost:3000/',
  // serverUrRL:'http://192.168.1.12:3000/',
  apiUrl:"http://test.quiz.com/api/"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
