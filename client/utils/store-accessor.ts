import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import App from '~/store/app'
import { RootState } from "@/store";

let appStore: App;

function initialiseStores(store_: Store<RootState>): void {
  appStore = getModule(App, store_);
}

export {
  initialiseStores,
  appStore
}
