import './index.scss';

interface IDataGame {
  answer: string[];
}

export class NameGame {
  private readonly dataGame: IDataGame;
  constructor() {
    this.exampleMethod();
  }
  /**
   * exampleMethod
   */
  public exampleMethod() {
    console.log('dataGame', typeof this.dataGame);
  }
}
