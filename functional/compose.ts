const compose =(f: Function, g: Function) => (x: any) => f(g(x));

const toUpper = (x: string) => x.toUpperCase();

const exclaim = (x: string) => x + "!";

const shout = compose(exclaim, toUpper);

console.log(shout("yay"));