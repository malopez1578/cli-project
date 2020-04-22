import './index.scss';

export class Foo {
  constructor() {
    console.log('classWorks');
  }
  messane(msg: string) {
    console.log(msg);
  }
  newMetos(msg: string) {
    const fresa = 'mamasita';
    console.log(`Foo -> newMetos -> fresa`, fresa);
    console.log(`Foo -> newMetos -> fresa`, fresa);
    console.log(msg, 'de neuvo');
  }
}
