fetch("https://qg6477-8080.csb.app/api/get-meta-ads", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    url: "myoutfitonline",
  }),
})
  .then(async (res) => {
    const result = await res.json();
    console.log("Success Result: ", result);
  })
  .catch((err) => {
    console.log("Error Occured: ", err.message);
  });
