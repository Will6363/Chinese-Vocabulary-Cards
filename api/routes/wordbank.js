var express = require("express");
var router = express.Router();

const rawJsonWords = require("../wordbank/sortedTranslations.json")

router.get("/", function(req, res, next) {
    res.send("API is working properly");
});

// get one entry
router.get("/word/:id", (req, res) => {
    res.json(rawJsonWords[req.params.id]);
});

// get n entries
router.get("/range/:range", (req, res) => {
    res.json(rawJsonWords.slice(0, req.params.range));
});

// get all entries
router.get("/all", (req, res) => {
    res.json(rawJsonWords);
});

module.exports = router;