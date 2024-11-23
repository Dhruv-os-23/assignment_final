const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const { promisify } = require('util');
const libre = require('libreoffice-convert');
const axios = require('axios');
const { Readable } = require('stream');
const cloudinary = require('../config/cloudinary');

const convertAsync = promisify(libre.convert);
const unlinkAsync = promisify(fs.unlink);
const writeFileAsync = promisify(fs.writeFile);

const mkdirAsync = promisify(fs.mkdir);
exports.uploadFile = async (req, res) => {
  try {
    const { base64Data, filename } = req.body;

    if (!base64Data || !filename) {
      return res
        .status(400)
        .json({ error: 'Base64 data and filename are required.' });
    }
    const buffer = Buffer.from(base64Data, 'base64');
    const publicId = crypto.randomBytes(16).toString('hex');
    const bufferStream = new Readable();
    bufferStream.push(buffer);
    bufferStream.push(null); 
    const uploadResponse = await cloudinary.uploader.upload_stream(
      { resource_type: 'raw', public_id: publicId }, 
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return res
            .status(500)
            .json({ error: 'Error uploading file to Cloudinary.' });
        }
        res.status(200).json({
          message: 'File uploaded successfully.',
          fileId: result.public_id, 
          filename: filename,
        });
      }
    );
    bufferStream.pipe(uploadResponse);
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
exports.convertFile = async (req, res) => {
  const tempFiles = [];

  try {
    const { fileId } = req.params;

    if (!fileId) {
      return res.status(400).json({ error: 'File ID is required' });
    }
    const tempDir = path.join(__dirname, '../../temp');
    await mkdirAsync(tempDir, { recursive: true });
    const tempDocxPath = path.join(tempDir, `${fileId}.docx`);
    const tempPdfPath = path.join(tempDir, `${fileId}_converted.pdf`);
    tempFiles.push(tempDocxPath);
    tempFiles.push(tempPdfPath);
    const fileUrl = `https://res.cloudinary.com/dxv8p3je6/raw/upload/${fileId}`;
    const response = await axios({
      method: 'get',
      url: fileUrl,
      responseType: 'arraybuffer',
    });

    await writeFileAsync(tempDocxPath, response.data);

    const pdfBuffer = await convertDocxToPdf(tempDocxPath);
    await writeFileAsync(tempPdfPath, pdfBuffer);
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${fileId}_converted.pdf`
    );
    res.setHeader('Content-Type', 'application/pdf');
    res.sendFile(tempPdfPath, async (err) => {
      if (err) {
        console.error('Error sending PDF:', err);
        return res.status(500).json({ error: 'Failed to send the PDF file.' });
      }
      await Promise.all(
        tempFiles.map(async (filePath) => {
          try {
            await unlinkAsync(filePath);
          } catch (err) {
            console.error(`Failed to delete temporary file ${filePath}:`, err);
          }
        })
      );
    });
  } catch (error) {
    console.error('Error converting file:', error);
    res.status(500).json({
      error: 'File conversion failed',
      details: error.message,
    });
  }
};

async function convertDocxToPdf(docxPath) {
  return new Promise((resolve, reject) => {
    const inputFile = fs.readFileSync(docxPath);

    libre.convert(inputFile, '.pdf', undefined, (err, pdfBuffer) => {
      if (err) {
        console.error('Error during DOCX to PDF conversion:', err);
        return reject(err);
      }
      resolve(pdfBuffer);
    });
  });
}