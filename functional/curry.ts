const add = (x: number, y: number) => x + y;

const curry = (f: Function) =>
    (x: any) => (y: any) => f(x, y);

const uncurry = (f: Function) =>
    (x: any, y: any) => f(x)(y);

const curriedAdd = curry(add);

const increment = curriedAdd(1);

console.log(increment(10))

const modulo = curry((x: number, y: number) => y % x);

const isOdd = modulo(2);

console.log(isOdd(3));
console.log(isOdd(4));

const filter = curry((f, xs: number[]) => xs.filter(f));

const getOdd = filter(isOdd);

console.log(getOdd([1, 2, 3, 4, 5]));