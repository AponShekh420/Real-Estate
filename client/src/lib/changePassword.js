const changePassword = async (password, oldPassword) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/user/change-password`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        oldPassword,
        password,
      })
    })
    return await res.json();
  } catch(err) {
    console.log(err.message)
  }
}

export default changePassword;