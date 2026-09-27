console.log('Hello  World');

const users = [
  { id: 1, name: "John", age: 25, active: true },
  { id: 2, name: "Sarah", age: 32, active: false },
  { id: 3, name: "Mike", age: 28, active: true },
  { id: 4, name: "Emma", age: 22, active: true },
];

const activeUsers = users.filter(user => user.active)
                         .map(user => user.name.toUpperCase());

console.log(activeUsers);                         

const totalAge = users.reduce((sum, user) => sum  + user.age, 0);

console.log(totalAge);                         


const usersById = users.reduce<{[index: number]: string}>(
  (result, user) => {
    result[user.id] = user.name;
    return result;
  },
  {}
);

console.log(usersById);           