import {prop} from 'rambda';

// Box is a monad as it has map method which allows chaining (another form of composition)
const Box = (x: any) => {
    return {
        map: (f: Function) => Box(f(x)),
        fold: (f: Function) => f(x)
    };
};

// Having a flatMap/chain method along with map makes this a Monad
const MonadBox = (x: any) => {
    return {
        map: (f: Function) => MonadBox(f(x)),
        chain: (f: Function) => f(x),
        fold: (f: Function) => f(x)
    };
};

interface Person {
    age: number,
    name: string
};

const person: Person = {
    age: 10,
    name: "john"
};

const ageNextYear = Box(person)
    .map(prop('age'))
    .fold((x: number) => x + 1)

const details = MonadBox(person.name)
    .map((name: string) => "Name: " + name)
    .chain((acc: string) => MonadBox(person.age)
        .map((age: number) => ", Age: " + age)
        .map((ageDetails: string) => acc + ageDetails)
    )
    .fold((x: any) => x);

console.log(ageNextYear)

console.log(details)