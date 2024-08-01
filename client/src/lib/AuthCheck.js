const AuthCheck = async () => {

  const userData = {
    accountId: "sdfklajsdfjkalsdf",
    firstName: "apon",
    lastName: "shekh",
    email: "aponshekh420@gmail.com",
    avatar: "placeholder.jpg",
    role: "admin", // can be admin and contributor
    provider: "local" // can be google, facebook and apple
  }

  return userData;
}

export default AuthCheck;