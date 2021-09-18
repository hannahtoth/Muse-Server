//CHANGE

let express = require('express');
let router = express.Router();
let validateJWT = require('../middleware/validate-jwt');
// Import Gallery Model 
const { GalleryModel, UserModel } = require('../models')

/* 
=====================
Get all logs
=====================
*/

router.get('/getall', validateJWT, async (req, res) => {
    console.log('entries');
    const { id } = req.user;

    try {
        const entries = await GalleryModel.findAll({
            where: {
                userId: id
            }
        });

        res.status(200).json(entries);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err});
    }
});

/* 
=====================
Delete A Log
=====================
*/
router.delete('/delete/:id', async (req, res) => {
  const exhibitId = req.params.id;
  const { id } = req.user;
  
  try {
      const query = {
          where: {
              id: exhibitId,
              userId: id
          },
      };
      await GalleryModel.destroy(query);
      res.status(200).json({message: "Exhibit was removed" });
  } catch (err) {
      res.status(500).json({ error: err });
  }
});

/* 
===============
Gallery Create
==============
*/

router.post('/create', validateJWT, async (req, res) => {
    const { exhibitsName, image, source, url, description, notes } =
    req.body.gallery;
    const { id } = req.user;
    console.log(req.user)

    const GalleryEntry = {
        exhibitsName,
        image,
        source,
        url,
        description,
        notes,
        userId: id
    };
    try {
        const newGallery = await GalleryModel.create(GalleryEntry);
        res.status(200).json({newGallery});
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

/* 
===============
Update Notes
==============
*/

router.put("/update/:entryId", validateJWT, async (req, res) => {
    const {notes} = req.body.gallery;
    const GalleryId = req.params.entryId;
    const { id } = req.user
    
    const query = {
        where: {
            id: GalleryId,
            userId: id
        }
    };
    const updatedNotes = {
        notes: notes
    };

    try{
        console.log(updatedNotes)
        const update = await GalleryModel.update(updatedNotes, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;