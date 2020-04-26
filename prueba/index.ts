import './index.scss';

interface ILolo {
  house: string;
}

export class Foo {
  public data: ILolo;
  private constructor() {
    console.log('classWorks');
  }
  private messane(msg: string) {
    console.log(msg);
  }
  private newMetos(msg: string) {
    const fresa = 'mamasita';
    console.log('Foo -> newMetos -> fresa', fresa);
    console.log('Foo -> newMetos -> fresa', fresa);
    console.log(msg, 'de neuvo');
  }
}
