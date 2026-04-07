function getUser(id, callback) {
    setTimeout( () => callback(null,{id, name:'Arjun'}),500);
}
function getPosts(userId, callback) {
    setTimeout( () => callback(null, ['post1','post2',]),300);
}
getUser(1, (err,user) => {
    getPosts(user.id,(err,posts) => {
        console.log(user.name,posts);
    });
});
function getUserPromise(id) {
    return new Promise((resolve,reject)=> {
        setTimeout(() => {
            if (id>0) resolve({id,name:'Arjun'});
            else reject(new Error('Invalid ID'));
        },500);
    })
}
getUserPromise(1)
  .then(user=>{console.log('Got user:',user.name); return user; })
  .catch(err=> console.error('Error:',err.message));
async function loadUserData(id) {
    try {
        const user=await getUserPromise(id);
        console.log(`User: ${user.name}`);
        const[profile,settings]=await Promise.all ( [
            getUserPromise(id),
            getUserPromise(id+1)
        ]);
        console.log('Loaded both:',profile.name,settings.name);
    } catch (error) {
        console.error('Failed:',error.message);
    }
}