const express = require('express') //import thư viện
const app = express()
const port = 3000

app.get('/', (req, res) => {
    console.log("Vào trang chủ");
  res.send('<h1 style="color: red;">Trang chủ web</h1>')
})

app.get('/home', (req, res) => {
    console.log("Vào trang home");
    res.send('<h1 style="color: blue;">Trang Home web</h1>')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})