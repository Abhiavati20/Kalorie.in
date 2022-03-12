const path = require('path')
const express = ('express')
const router = require('express').Router();                           // creating express router
const { cloudinary}  = require('../utils/cloudinary');
router.post('/', async (req, res) => {
  try {
      // const uploadResponse = await cloudinary.uploader.upload(re, {
      //     upload_preset: 'green_diet',
      // });
      // console.log(uploadResponse);
      // res.json({ msg: 'yaya' });
  } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'Something went wrong' });
  }
});


module.exports = router;