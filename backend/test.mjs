fetch("https://9x6c2n-8080.csb.app/api/get-meta-ads", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    url: "myoutfitonlineusa",
  }),
})
  .then(async (res) => {
    const result = await res.json();
    console.log("Success Result: ", result);
  })
  .catch((err) => {
    console.log("Error Occured: ", err.message);
  });
