import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import App from '@/store/app';
import { RootState } from '@/store';

let appStore: App;

const initialiseStores = (store: Store<RootState>): void => {
  appStore = getModule(App, store);
};

export {
  initialiseStores,
  appStore
};
