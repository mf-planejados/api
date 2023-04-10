const multer = require('multer')
const multerS3 = require('multer-s3')
const aws = require('@aws-sdk/client-s3')
const path = require('path')
const crypto = require('crypto')

const storageTypes = {
   local: multer.diskStorage({
      destination: (req, file, cb) => {
         cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
      },
      filename: (req, file, cb) => {
         crypto.randomBytes(16, (err, hash) => {
            if (err) cb(err)

            file.key = `${hash.toString('hex')}-${file.originalname.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`
            cb(null, file.key)
         })
      }
   }),
   s3: multerS3({
      s3: new aws.S3Client({ region: 'us-east-1' }),
      bucket: process.env.BUCKET_NAME,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      acl: 'public-read',
      key: (req, file, cb) => {
         crypto.randomBytes(16, (err, hash) => {
            if (err) cb(err)
            const fileName = `${hash.toString('hex')}-${file.originalname.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`
            cb(null, fileName)
         })
      }
   })
}

module.exports = {
   dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
   storage: storageTypes.s3,
   limits: {
      fileSize: 100 * 1024 * 1024
   },
   fileFilter: (req, file, cb) => {
      const allowedMimes = [
         'image/jpeg',
         'image/jpg',
         'image/pjpeg',
         'image/png',
         'image/gif',
         'application/pdf'
      ]

      if (allowedMimes.includes(file.mimetype)) {
         cb(null, true)
      } else {
         cb(new Error('Invalid file type.'))
      }
   }
}
