class Animal {
    #name;
    constructor(name,sound) {
        this. #name=name;
        this.sound=sound;
    }
    speak() { return `${this.#name} says ${this.sound}`;}
    get name() { return this.#name}
}
class Dog extends Animal {
    constructor(name) {super(name, 'Woof');}
    fetch() { return `${this.name} fetches the ball`;}
}
const dog=new Dog('Rex');
console.log(dog.speak());
console.log(dog.fetch());
const wordCount=new Map();
const words=['the','cat','sat','on','the','mat','the'];
words.forEach(w=>wordCount.set(w, (wordCount.get(w)??0)+1));
console.log(wordCount.get('the'));
const uniqueWords=new Set(words);
console.log([...uniqueWords]);
const ID=Symbol('id');
const obj={ [ID]:123,name:'test'};
console.log(obj[ID]);
function* range(start,end,step=1) {
    for(let i=start;i<end;i+=step) yield i;
}
console.log([...range(0,10,2)]);
const privateData=new WeakMap();
class User {constructor(name) { privateData.set(this,{ name });}}
