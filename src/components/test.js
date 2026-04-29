function User(username, loginCount, isLoggedIn) {
  this.username = username;
  this.loginCount = loginCount;
  this.isLoggedIn = isLoggedIn

  return this // it get returned Default
}



const userOne = User("Harry", 12, true );
const userTwo =  User( "HArish", "kdhe", false)
console.log(userOne)
console.log(userTwo)
