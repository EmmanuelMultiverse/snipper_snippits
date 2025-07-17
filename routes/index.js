var express = require('express');
var router = express.Router();
const data = require("../seedData");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  
});

router.post("/snippets", (req, res) => {
  snippet = req.body;
  data.push({snippet, id:  data.length + 1});
  res.status(200).json({message: "Create successful!"});

})

router.get("/snippets", (req, res) => {
  let filteredData = data;
  if (req.query.lang) {
    filteredData = filteredData.filter(item => item.language == req.query.lang);
  }

  res.status(200).json(filteredData);

})

router.get("/snippets/:id", (req, res) => {
  let id = req.params.id;
  let snippet = data.filter(item => item.id == id);

  res.status(200).json(snippet);
  
})

router.delete("/snippets/:id", (req, res) => {
  const id = req.params.id;
  const snippetIndex = data.findIndex(item => item.id == id);

  if (snippetIndex > -1) {
    data.splice(snippetIndex, 1);
    res.status(200).json({ "message": "Delete successful!"});
  } else{
    res.status(400).json({ "message": "Could not find snippet"});
  }

})






module.exports = router;
