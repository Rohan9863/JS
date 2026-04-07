// Task 1
let nums=[11,55,90,51,7];
let max=nums.reduce(function(acc,curr){
    if(acc>curr) {
        return acc;
    } else {
        return curr;
    }
});
console.log(`Max Value: ${max}`);

// Task 2
const products= [
    {name: "Tv",price: 25000,category:"electronics"},
    {name: "Shirt",price: 1500,category:"Clothing"},
    {name: "AC",price: 48000,category:"electronics"},
    {name: "Mobile",price: 80000,category:"electronics"}
];
function getelectronics(products) {
    return products
    .filter(function(p) {
        return p.category==="electronics";
    })
    .sort(function(a,b) {
        return a.price-b.price;
    });
}
console.log(getelectronics(products));

// Task 3
const students=[
    {name: "Akash",score:85},
    {name: "Nivas",score:45},
    {name: "Nikhil",score:90},
    {name: "Rohith",score:88},
    {name: "Bhargav",score:69}
];
const total= students.reduce(function(sum,s) {
    return sum+s.score;
},0);
const average= total/ students.length
const result= students
.filter(function(s) {
    return s.score>average;
})
.map(function(s) {
    return s.name;
});
console.log(result);