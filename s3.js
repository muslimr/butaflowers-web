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

    // const data =  s3.getObject(
    //     {
    //         Key: fileKey,
    //         Bucket: bucketName
    //     }
    //
    // ).promise();
    //
    //
    // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', data)
    //
    // return data;

    // s3.headObject(downloadParams, function (err, metadata) {
    //     if (err && err.code === 'NotFound') {
    //         // Handle no object on cloud here
    //         console.log('$$$$$$$$$$$$$$$', err)
    //     } else {
    //         console.log('ggggggggggggggggggggggg', s3.getSignedUrl('getObject', do))
    //         // return s3.getSignedUrl('getObject', downloadParams, () => {});
    //     }
    // });

    // let fileObj = s3.getObject(downloadParams).promise()
    //     .catch((err) => console.log('ERROR', err))
    //     .then((res) => res)

    // console.log('@@@@@@@@@@', )

    return s3.getObject(downloadParams);
}
exports.getFileStream = getFileStream;


async function getImage(fileKey){
    const data =  s3.getObject(
        {
            Key: fileKey,
            Bucket: bucketName
        }

    ).promise();
    return data;
}
exports.getImage = getImage;


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


