function mergeProfiles(profile1,profile2) {
    return {
        ...profile1,
        ...profile2
    };
}
const profile1= {
    name: "Rohan",
    age:21,
    city:"Hyderabad"
};
const profile2={
    name:"Ramidi Rohan",
    age:22,
    State: "Telangana",
};
const Mergedprofile= mergeProfiles(profile1,profile2);
console.log("Mergedprofile:", Mergedprofile);

// Task 2
function extractAddress({name, address: {city,state}}) {
    return `${name} lives in ${city}, ${state}`;
}
const user= {
    name: "Rohan",
    address : {
        city: "Hyderabad",
        state: "Telangana",
    }
}
console.log(extractAddress(user));