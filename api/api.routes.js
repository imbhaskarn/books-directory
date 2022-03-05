const express = require("express");
const router = express.Router();
const Book = require("../model/book.model");

// get all data
router.get("/", (req, res) => {
  Book.find({}, (err, data) => {
    if (err) {
      console.log(err.message)
      return res.json('Internal error')
    }
    if (!data) {
      return res.json("data not found");
    }
    return res.json(data);
  });
});
// create a new document
router.post("/new", async (req, res) => {
  console.log(req.body)
  try {
    console.log(req.body)
    const body = req.body;
    if (!body) {
      return res.json("Data cannot be empty");
    }
    const book = await new Book({
      title: body.title,
      author: body.author,
      language: body.language,
      publishedAt: body.date,
      publication: body.publication,
      pages: body.pages,
    });
    const result = await book.save();
    console.log(result)
    return res.json(result);
  } catch (e) {
    console.log(e);
    return res.json("internal error!");
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
      return res.status(404).json(`Document not found with id: ${id}.`);
    }
    return res.json(result);
  } catch (e) {
    console.log(e);
    res.json("Internal Error");
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
    const result = await Book.findByIdAndUpdate(
      req.params.id,
      update, {
        new: true
      })
    if (!result) {
      return res.status(404).json(`No books found with id:${req.params.id}`);
    }
    res.json(result);
    console.log(result);

  } catch (e) {
    console.log(e);
    return res.json("Document not updated");
  }
});



//delete a document with an id
router.delete("/delete/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const result = await Book.findByIdAndRemove(req.params.id)
    res.json(result);
  } catch (e) {
    console.log(e);
    res.json("Got an error");
  }
});

module.exports = router;