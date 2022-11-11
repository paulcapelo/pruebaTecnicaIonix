import AWS from 'aws-sdk';
import * as dotenv from 'dotenv'
dotenv.config()


const uploadFile = async (foto_perfil: string, userId: string): Promise<string> => {

  const ID = process.env.S3ID || "";
  const SECRET = process.env.S3KEY || "";
  const BUCKET_NAME = process.env.BUCKET_NAME || "";

  const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,
  });

  const base64Data = Buffer.from(foto_perfil.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  const type = foto_perfil.split(';')[0].split('/')[1];

  const params = {
    Bucket: BUCKET_NAME,
    Key: `${(new Date()).getTime()}${userId}.${type}`,
    Body: base64Data,
    ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentType: `image/${type}`,
  };

  let location = '';
  let key = '';
  try {
    const { Location, Key } = await s3.upload(params).promise();
    location = Location;
    key = Key;
  } catch (error) {
    console.log("error", error)
    return '';
  }

  console.log('ubicacion URL', location, key);

  return key;
};


export default uploadFile;
