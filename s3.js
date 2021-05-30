require('dotenv').config();
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;


const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
});


// uploads file to S3
function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename,
    }

    return s3.upload(uploadParams).promise();
}
exports.uploadFile = uploadFile


// downloads a file from S3
function getFileStream(fileKey) {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }

    return s3.getObject(downloadParams).createReadStream();
    // return s3.getObject(downloadParams);
}
exports.getFileStream = getFileStream;


// deletes a file from S3
function deleteFileStream(filename) {
    const deleteParams = {
        Bucket: bucketName,
        Key: filename,
    }

    s3.deleteObject(deleteParams, function (err, data) {
        if (err) console.log(err);
        else console.log("Successfully deleted file from bucket");
    });
}
exports.deleteFileStream = deleteFileStream;
