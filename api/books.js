const express = require("express");
const router = express.Router();
const Book = require("../model/book.model");

router.get('/', (req, res) => {
res.json({
  message:'API Ready!'
})
})

// get all data
router.get("/all", async (req, res) => {
  try {
    const result = await Book.find({});
    if (!data) {
      return res.json({
        message: "data not found",
        status: 404
      });
    }
    return res.json(data);
  } catch (err) {
    console.log(err.message)
    return res.json({
      message: "internal error",
      status: 505
    })
  }
})

// create a new document
router.post("/new", async (req, res) => {
  console.log(req.body)
  try {
    console.log(req.body)
    const body = req.body;
    if (!body) {
      return res.json({
        message: "invalid input",

      });
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
    return res.json({
      message: "internal error",
      status: 505
    });
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
    res.json({
      message: "internal error",
      status: 505
    });
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
      return res.json({
        message: `No books found with id:${req.params.id}`,
        status: 404
      });
    }
    res.json(result);
    console.log(result);

  } catch (e) {
    console.log(e);
    return res.json({
      message: "internal error",
      status: 505
    });
  }
});

//delete a document with an id
router.delete("/delete/:id", async (req, res) => {
  try {
    if (req.params.id.length !== 24) {
      return res.json({
        message: 'Invalid id'
      })
    }
    console.log(req.params.id);
    const result = await Book.findOneAndRemove({
      _id: req.params.id
    })
    if (result == null) {
      return res.json({
        message: 'Invalid Id'
      })
    }
  } catch (e) {
    if (e.kind === 'ObjectId') {
      res.json({
        message: 'Invalid Id'
      })
    }
    res.json({
      message: "Internal Error"
    });
  }
});

module.exports = router;