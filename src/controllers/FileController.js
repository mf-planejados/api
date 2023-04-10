const File = require('../models/Files')

exports.upload = async (req, res) => {
    const { originalName: name, size, key, location: url = '',  } = req.file

   const { category = null, } = req.params

 
    const file = await File.create({
       name,
       size,
       url,
       key,
       category
    })
 
    if (file?._id) {
       return res.status(201).json({ file })
    }

    res.status(500).json({})
 }

exports.delete = async (req, res) => {

    const { fileId: _id } = req.params;

    try {
        const response = await File.findByIdAndDelete(_id)
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json(error)
    }
}

// exports.getFilesByCompany = async (req, res) => {

//     try {
//         const { userId } = req.params;
//         const company = await Company.findById(companyId).select('files')

//         if (company._id) {
//             const { files: companyFiles } = company;
//             const response = await File.find({ _id: { $in: companyFiles } })
//             res.status(200).json(response)
//         }
//     } catch (error) {
//         res.status(500).json(error)
//     }
// }

exports.getAllFiles = async (req, res) => {

    try {
        const response = await File.find().exec()
        return res.status(201).json(response)
    } catch (error) {
        res.status(500).json(error)
    }
}