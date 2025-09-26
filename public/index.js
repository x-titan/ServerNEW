import { search } from "https://x-titan.github.io/web-utils/index.js"

fetch("/health", { method: "POST" })
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    console.error("Error:", error)
  })

const register = search.id("register")
const login = search.id("login")
const username = search.id("username")
const password = search.id("password")
const getHistory = search.id("getHistory")
const urlInput = search.id("url")
const shortenButton = search.id("shorten")
const msg = search.id("msg")


console.log("register:", register)
console.log("login:", login)
console.log("username:", username)
console.log("password:", password)


register.addEventListener("click", async (e) => {
  const res = await fetch("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
  })
  const data = await res.json()
  console.log("Register response:", data)
  alert(JSON.stringify(data))
})

if (localStorage.getItem("token")) {
  console.log("Already logined")
  msg.innerText = "logined in as " + (localStorage.getItem("username") || "unknown")
}

login.addEventListener("click", async (e) => {
  fetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
  }).then((response) => response.json())
    .then((data) => {
      console.log("Login response:", data)
      if (data.token) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("username", username.value)
      }
      msg.innerText = "logined in as " + username.value
      alert(JSON.stringify(data))
    })
    .catch((error) => {
      console.error("Error:", error)
      alert("error")
    })
})

getHistory.addEventListener("click", async (e) => {
  const token = localStorage.getItem("token") || ""
  fetch("/urls/getAllurls", {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      limit: "5",
      offset: "0",
    },
  }).then((response) => response.json())
    .then((data) => {
      console.log("Get History response:", data)
      alert(JSON.stringify(data))
    })
    .catch((error) => {
      console.error("Error:", error)
      alert("error")
    })
})

shortenButton.addEventListener("click", async (e) => {
  const token = localStorage.getItem("token") || ""
  fetch("/urls/shorten", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      url: urlInput.value,
    }),
  }).then((response) => response.json())
    .then((data) => {
      console.log("Shorten response:", data)
      search.id("result").value = "" + (data.shortUrl || "error")
      alert(JSON.stringify(data))
    })
    .catch((error) => {
      console.error("Error:", error)
      search.id("result").value = "error"
      alert("error")
    })
})
