export const url = process.env.APIURL || "http://localhost:9000/v1";
export const urlImages = process.env.IMAGESURL || "https://pruebaiooniximage.s3.amazonaws.com/"
//@ts-ignore
export const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

