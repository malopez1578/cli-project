import './index.scss';

interface IdataGame {
  answer: string[];
}

export class NameGame {
  private readonly _dataGame: IdataGame;
  constructor() {
    this.exampleMethod();
  }
  /**
   * exampleMethod
   */
  public exampleMethod(): void {
    console.log('dataGame', typeof this._dataGame);
  }
}
