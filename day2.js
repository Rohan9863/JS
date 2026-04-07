// Task 1
function temperatureConverter(Celsius)
{
    let fahrenheitans= (Celsius*9/5)+32;
    let kelvinans= Celsius+273.15;

    return {
        fahrenheit: fahrenheitans, kelvin: kelvinans
    };
}
console.log(temperatureConverter(25));

//Task 2
function makeMultiplier(factor) {
    return function(number) {
        return number*factor;
    };
}
const double=makeMultiplier(2);
const triple=makeMultiplier(3);
const quad=makeMultiplier(4);
console.log(double(5));
console.log(triple(5));
console.log(quad(5));

//Task 3
const isPrime= (n) => {
    if(n<=1){
        return false
    };
    for(let i=2;i<n;i++) {
        if(n%i==0) {
            return false
        };
    }
    return true
};
console.log(isPrime(11));
console.log(isPrime(8));