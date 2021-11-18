const express = require("express");
const router = express.Router();
const Book = require("../model/book.model");
router.get("/", (req, res) => {
  Book.find({}, (err, data) => {
    if (err) {
      throw err;
    }
    if (!data) {
      res.send("data not found");
    }
    res.send(data);
  });
});
// create a new document
router.post("/new", async (req, res) => {
  try {
    const body = req.body;
    const book = await new Book({
      title: body.title,
      author: body.author,
      language: body.language,
      publishedAt: body.date,
      publication: body.publication,
      pages: body.pages,
    });
    console.log(`\n ${book}`);
    if (!body) {
      res.send("Data cannot be empty");
    }
    const result = await book.save();
    res.send(result);
  } catch (e) {
    console.log(e);
    res.send("Got Some error \n" + e);
  }
});

//find a document and update with an id
router.put("/update/:id", async (req, res) => {
  try {
    const body = req.body;
    const update = {
      title: body.title,
      author: body.author,
      language: body.language,
      publishedAt: body.date,
      publication: body.publication,
      pages: body.pages,
    };
    const updated = {
      new: true
    };
    if (Object.keys(req.body).length === 0) {
      res.send("Empty Object");
    } else {
      const result = await Book.findByIdAndUpdate(
        req.params.id,
        update,
        updated
      );

      if (!result) {
        res.status(404);
        res.send("Document does not exist");
      } else {
        res.send(result);
        console.log(result);
      }
    }
  } catch (e) {
    console.log(e);
    res.send("Document not updated");
  }
});

// find a document with an id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Book.findById({
      _id: id,
    });
    if (!result) {
      res.send(`Document not found with id: ${id}.`);
    }
    res.json(result);
  } catch (e) {
    console.log(e);
    res.send("got an erorr");
  }
});

//delete a document with an id
router.delete("/delete/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const result = await Book.findByIdAndRemove(req.params.id);
    console.log(result);
    res.send(result);
  } catch (e) {
    console.log(e);
    res.send("Got an error");
  }
});

module.exports = router;