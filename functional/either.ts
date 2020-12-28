import { map } from "rambda";

interface Either {
    (x: any): {
        chain: (f: Function) => any,
        map: (f: Function) => any,
        fold: (f: Function, g: Function) => any
    }
};

const Right: Either = (x: any) => ({
    chain: (f: Function) => f(x),
    map: (f: Function) => Right(f(x)),
    fold: (_f: Function, g: Function) => g(x)
});

const Left:  Either = (x: any) => ({
    chain: (f: Function) => Left(x),
    map: (f: Function) => Left(x),
    fold: (f: Function, _g: Function) => f(x)
});

const fromNullable = (x: any) =>
    x != null ? Right(x) : Left(null)

const STUDENTS: {
    [id: string]: string
} = {
    "cs-1": "John",
    "cs-2": "Harry",
    "ep-1": "Ron"
};


const findStudent = (id: string) => fromNullable(STUDENTS[id]);

const john = findStudent("cs-1")
    .map((x: string) => x.toUpperCase())
    .fold(
        () => 'no student!',
        (name: string) => 'Found student ' + name
    );
const lee = findStudent("cs-3")
    .map((x: string) => x.toUpperCase())
    .fold(
        () => 'no student',
        (name: string) => 'Found student ' + name
    );


console.log(john);
console.log(lee);


// File Example

// A fake read file method
function fs_readfile(filename: string) {
    if (filename === "config.json") {
        return "{\"port\": 3000}"
    } else {
        throw new Error("ERROR: Cannot find file");
    }
}

const tryCatch = (f: Function) => {
    try {
        return Right(f());
    } catch (err) {
        return Left(err);
    }
};

// Redefining unpure functions wrapped in Either
const readFileSync = (path: string) => tryCatch(() => fs_readfile(path));

const parseJSON = (contents: string) => {
    console.log("parsing " + contents)
    return tryCatch(() => JSON.parse(contents));
};

const getPort = (filename: string) =>
    readFileSync(filename)
    .chain(parseJSON)
    .map(config => config.port)
    .fold(
        () => 8080, // Default port when no config file present
        x => x
    );

console.log(getPort("config.json"));
console.log(getPort("noconfig.json"))
