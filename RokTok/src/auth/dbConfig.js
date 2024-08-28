import config from "../config/config";
import { Client, Databases, Query,Storage, ID } from "appwrite";

export class Service {
     client = new Client()
     databases;
     bucket;

     constructor() {
       this.client.setEndpoint('https://cloud.appwrite.io/v1')
                  .setProject(config.appwriteprojectId)
       this.databases = new Databases(this.client)
       this.bucket = new Storage(this.client)
     }
     async getPost(slug) { //slug is unique value
        try {
           return await this.databases.getDocument(config.appwriteDBId, config.appwriteCollectiontId, slug) 
        } catch (error) {
           console.log("getPost Error ::",error) 
           return false;
        }
     }

     async getPosts(query = [Query.equal("status","active")]) {
        try {
            return await this.databases.listDocuments(config.appwriteDBId,
                                         config.appwriteCollectiontId,
                                         query)
        } catch (error) {
             console.log("getPosts Error ::",error) 
             return false;
        }
     }

     async createPost({tittle, slug, content, featuredImage, status, userId}) {
        try {
            return await this.databases.
                              createDocument(config.appwriteDBId,
                                             config.appwriteCollectiontId,
                                             slug,
                                            {tittle,content, featuredImage, status, userId })

        } catch (error) {
            console.log("create Post Error ::",error) 
            return false;
        }
     }

    async updatePost(slug, {tittle,content, featuredImage, status}) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDBId,
                config.appwriteCollectiontId,
                slug,
                {tittle,content, featuredImage, status})

        } catch (error) {
            console.log("update Post Error ::",error) 
            return false;
        }
     }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDBId,
                config.appwriteCollectiontId,
                slug) 

            return true;

        } catch (error) {
            console.log("delete Post Error ::",error) 
            return false;
        }
     }

     /// Storage service /*https://appwrite.io/docs/references/cloud/client-web/storage#createFile*/

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                   config.appwriteBucketId),
                   ID.unique(),
                   file
        } catch (error) {
            console.log("upload file Error ::",error) 
            return false;
        }
    }
    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                   config.appwriteBucketId),
                   fileId
        } catch (error) {
            console.log("delete file Error ::",error) 
            return false;
        }
    }

    getFilePreviwe(fileId) {
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId).href;
    }
}





const service = new Service();
export default Service