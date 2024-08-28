import { Client, Account, ID } from "appwrite";
import config from "../config/config";


export class AuthService {
    client = new Client()
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteprojectId)
            .setProject()
        this.account = new Account(this.client)
    }

    async createAccount(email, password, name) {
        try {
            const userAccount = await this.account
                                          .create(ID.unique(), email, password, name)
            if (userAccount) {
                 return this.login({email, password})
            } else {
                return userAccount
            }
            
        } catch(e) {
            console.log("appwrite create user :: error ::",e);
        }
    }
    async login({email, password}) {
        try {
           return await this.account
                            .createEmailPasswordSession(email, password)
        } catch(e) {
            console.log("appwrite login user :: error ::",e);
        }
    }
    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("appwrite get current user :: error ::",error);
        }
        return null;
    }
    async logout() {
        try {
           return await  this.account.deleteSession() 
        } catch (error) {
           console.log("appwrite logout user :: error ::",error);
        }
    }
}