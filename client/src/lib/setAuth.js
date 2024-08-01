import store from "@/redux/store";
import { addUserField } from "@/redux/userSlice";

const setAuth = async () => {
  try {
    const userData = {
      accountId: "sdfklajsdfjkalsdf",
      firstName: "apon",
      lastName: "shekh",
      email: "aponshekh420@gmail.com",
      avatar: "placeholder.jpg",
      role: "admin", // can be admin and contributor
      provider: "local" // can be google, facebook and apple
    }
  } catch (err) {
    console.log(err.message)
  }
  return userData;
}

export default setAuth;