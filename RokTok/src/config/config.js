const config = {
  appwriteUrl: String(process.env.ROK_TOK_APPWRITE_URL),
  appwriteprojectId: String(process.env.ROK_TOK_APPWRITE_PROJECT_ID),
  appwriteDBId: String(process.env.ROK_TOK_APPWRITE_DATABASE_ID),
  appwriteCollectiontId: String(process.env.ROK_TOK_APPWRITE_COLLECTION_ID),
  appwriteBucketId: String(process.env.ROK_TOK_APPWRITE_BUCKET_ID),
}

export default config
