import { container } from 'tsyringe';

import ICashProvider from './models/ICashProvider';
import RedisCacheProvider from './implementations/RedisCacheProvider';



container.registerSingleton<ICashProvider>(
  'CacheProvider',
  RedisCacheProvider,
);


