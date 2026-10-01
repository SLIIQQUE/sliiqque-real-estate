import * as migration_20261001_044834_initial from './20261001_044834_initial';
import * as migration_20261001_083859_pages from './20261001_083859_pages';

export const migrations = [
  {
    up: migration_20261001_044834_initial.up,
    down: migration_20261001_044834_initial.down,
    name: '20261001_044834_initial',
  },
  {
    up: migration_20261001_083859_pages.up,
    down: migration_20261001_083859_pages.down,
    name: '20261001_083859_pages'
  },
];
