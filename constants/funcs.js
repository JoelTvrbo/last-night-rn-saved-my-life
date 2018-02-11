
export const spreadProps = (props) =>{
  const user = extractUser(props);
  const fudge = calculateFudge();
  const bits = computeBits();
  return <SomeComponent {...{ user, fudge, bits }} />;
}

const logUsers = (users= [
  { user: "Name1" },
  { user: "Name2", age: 2 },
  { user: "Name2" },
  { user: "Name3", age: 4 }
  ]) => {
  for (let { user, age = "DEFAULT AGE" } of users) {
    console.log(user, age);
  }
}

// var one = () => 1;
// var two = () => 2;
// var three = () => 3;
// [one,two,three].map( fn => fn() );
// => [1,2,3]

// const box = {  
//   color: 'red',
//   size: {
//     width: 200, 
//     height: 100 
//   },
//   items: ['pencil', 'notebook']
// };
 
// const blackBox = {  
//   ...box,
//   color: 'black',
//   size: {
//     ...box.size,
//     width: 400
//   },
//   items: [
//     ...box.items,
//     'ruler'
//   ]
// };

export const get = property => object => object[property];
export const getId = get('id');
// series.map(getId); //should return [ 4, 5, 6 ]
export const getName = get('name');
// movies.map(getName); //should return [ 'Matrix', 'Star Wars', 'The wolf of Wall Street' ]
export const getProp = (name,obj) => obj[name];

export const setProp = (name,obj,val) => {
  var o = Object.assign( {}, obj );
  o[name] = val;
  return o;
}
export const removeProp = (obj, property) => {
  return  Object.keys(obj).reduce((acc, key) => {
    if (key !== property) {
      return {...acc, [key]: obj[key]}
    }
    return acc;
  }, {})
  // const updated = removeProp(blackBox, 'items');
}

export const typeCheck = (type, ...args) => {
  return args.filter(item => typeof item === type);
  // typeCheck('boolean', true, 0, false);   => [true, false]  
} 

export const removeDuplicates = arr => [...new Set(arr)];
export const addItem = (arr, value) => [...arr, value];
export const addItemConcat = (arr, value) => arr.concat(value);
export const removeByItem = (arr, value) => arr.filter((item) => item !== value);
export const insertByIndex = (state, newItem, insertAt) =>
[
  ...state.slice(0, insertAt),
  newItem,
  ...state.slice(insertAt)
  //insertByIndex(original, 'b', 1) // ["a", "b", "c", "d", "e"]
]
export const removeByIndex = (arr, at) => arr.filter((item, idx) => idx !== at);

export const containsItem = (names) => {
  return names.every((name) => this.names.indexOf(name) !== -1);
}

export const moveArrayElement = (array, from, to, mergeProps) => {
  if (to > array.length) return array;
  // Remove the element we need to move
  const arr = [...array.slice(0, from), ...array.slice(from + 1)];
  // And add it back at a new position
  return [
    ...arr.slice(0, to),
    {
      ...array[from],
      ...mergeProps // merge passed props if any or nothing (empty object) by default
    },
    ...arr.slice(to)
  ];
};

export function shuffle(o) {
  for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}

// const getIdMap = memoizeOne((array) => {
//   return array.reduce((previous, current) => {
//    previous[current.id] = array[current];
//    return previous;
//   }, {});
// });

// const foo = { id: 'foo' };
// const bar = { id: 'bar' };

// // our lovely ordered structure
// const ordered = [ foo, bar ];

// // lazily computed map for fast lookups
// const map1 = getMap(ordered);

// map1['foo'] === foo; // true
// map1['bar'] === bar; // true
// map1['baz'] === undefined; // true

// const map2 = getMap(ordered);
// // returned the same map as before - no recomputation required
// const map1 === map2;



// ASYNC AWAIT

// Generates intent string to make a tweet inside class 
// static createTweetIntent(
//   text: string,
//   url: string,
//   hashtags: string
// ): string {
//   return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(hashtags)}`;
// }

export const makeTweet = async () => {
  try {
    let intent = Helpers.createTweetIntent(
      "Some text to tweet",
      "https://breakingscope.com/",
      "tag1,tag2,tag3"
    );
    await Linking.openURL(intent);
  } catch (error) {
    console.log("Error opening link", error);
  }
};
