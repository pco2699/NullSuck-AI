import { Action, Module, Mutation, VuexModule } from "@/node_modules/vuex-module-decorators";
import { InputValue, Result, WineAttribute } from "@/types/models";
import axios, { AxiosResponse } from "axios";

export interface AppState {
  title: string
  wineAttributes: WineAttribute[]
  result: Result
}

@Module({ stateFactory: true, name: "app", namespaced: true })
export default class App extends VuexModule implements AppState {
  public title: string = '';
  public wineAttributes: WineAttribute[] = [];
  public result: Result = { value: 0, comment: '', status: false};

  @Mutation
  public SET_TITLE(title: string): void {
    this.title = title
  }

  @Mutation
  public SET_WINE_ATTR(wineAttributes: WineAttribute[]): void {
    this.wineAttributes = wineAttributes;
  }

  @Mutation
  public SET_WINE_VALUE(payload: {id: number; value: number}): void {
    this.wineAttributes[payload.id - 1].value = payload.value
  }

  @Mutation
  public CLEAR(): void {
    this.wineAttributes.forEach((w): void => {
      delete this.wineAttributes[w.id - 1].value
    });
    this.result = { value: 0, comment: '', status: false};
  }

  @Mutation
  public SET_RESULT({value, status}): void {
    this.result.value = value;
    this.result.status = status;
  }

  @Action({})
  public async POST_WINE_VALUE(): Promise<void> {
    const attributes: WineAttribute[] = [...this.wineAttributes];
    const inputValue: InputValue[] = [];
    console.log('fetching in action...');
    attributes.forEach((attr): void => {
      inputValue.push({ id: attr.id, value: attr.value })
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: AxiosResponse<Result> = await axios.post('/api/predict', inputValue);

    if (res.data.status) {
      this.context.commit("SET_RESULT", res.data)
    }
  }
  public get IsAllValueSet(): (() => boolean) {
    return (): boolean => {
      return this.wineAttributes.every((attr): boolean => {
        return 'value' in attr && attr.value != 0
      });
    }
  }
}
