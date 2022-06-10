export const extensionRoutes = [  {
    path: 'extensions/examples',
    loadChildren: () => import('./extensions/97d6d2c504c70088b265b6389b0fea09d61f088eb60152347782182eda180ca8/example-ui-lazy.module').then(m => m.ExampleUiLazyModule),
  }];
