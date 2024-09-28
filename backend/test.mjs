fetch("https://pendora-org.onrender.com/api/get-meta-ads", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: "striphq",
  }),
})
  .then(async (res) => {
    const result = await res.json();
    console.log("Success Result: ", result);
  })
  .catch((err) => {
    console.log("Error Occured: ", err.message);
  });
