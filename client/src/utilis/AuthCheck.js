const AuthCheck = () => {
  const user = {
    name: "apon shekh",
    email: "aponshekh420@gmail.com",
    img: "placeholder.jpg",
    role: "viewer", // can be admin and contributor
    provider: "local" // can be google, facebook and apple
  }

  return user
}

export default AuthCheck;