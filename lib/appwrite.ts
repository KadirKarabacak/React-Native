export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_API_ENDPOINT,
    platform: process.env.EXPO_PUBLIC_API_PLATFORM,
    projectId: process.env.EXPO_PUBLIC_API_PROJECT_ID,
    databaseId: process.env.EXPO_PUBLIC_API_DATABASE_ID,
    userCollectionId: process.env.EXPO_PUBLIC_API_USERCOLLECTION_ID,
    videoCollectionId: process.env.EXPO_PUBLIC_API_VIDEOCOLLECTION_ID,
    storageId: process.env.EXPO_PUBLIC_API_STORAGE_ID,
};

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId,
} = appwriteConfig;

import { Alert } from "react-native";

import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    ImageGravity,
    Query,
    Storage,
} from "react-native-appwrite";
// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(endpoint as string)
    .setProject(projectId as string)
    .setPlatform(platform as string);

// For user account on auth
const account = new Account(client);

// For avatars to add users
const avatars = new Avatars(client);

// For databases
const databases = new Databases(client);

// For videos
const storage = new Storage(client);

interface CreateUserTypes {
    email: string;
    password: string;
    username: string;
}

interface SignInTypes {
    email: string;
    password: string;
}

export interface FormTypes {
    title: string;
    video: any;
    thumbnail: any;
    prompt: string;
    userId: any;
}

export const createUser = async ({
    email,
    password,
    username,
}: CreateUserTypes) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );

        // If failed to create user
        if (!newAccount) throw Error;

        // Else try to create avatara by getting from appwrite initial avatar
        const avatarUrl = avatars.getInitials(username);

        // Sign in user
        await signIn({ email, password });

        // Create new user on users collection
        const newUser = databases.createDocument(
            databaseId as string,
            userCollectionId as string,
            ID.unique(),
            { accountId: newAccount.$id, email, username, avatar: avatarUrl }
        );

        return newUser;
    } catch (error) {
        console.log(error);
    }
};

export const signIn = async ({ email, password }: SignInTypes) => {
    try {
        const session = await account.createEmailPasswordSession(
            email,
            password
        );
        return session;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const getCurrentUser = async () => {
    try {
        // Get current Account
        const currentAccount = await account.get();
        if (!currentAccount) throw Error;

        // Get current user by using account & id
        const currentUser = await databases.listDocuments(
            databaseId as string,
            userCollectionId as string,
            [Query.equal("accountId", currentAccount.$id)]
        );
        if (!currentUser) throw Error;

        // If everything is okay
        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
    }
};

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId as string,
            videoCollectionId as string,
            [Query.orderAsc("$createdAt")]
        );

        return posts.documents;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId as string,
            videoCollectionId as string,
            [Query.orderAsc("$createdAt")]
        );

        return posts.documents;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const searchPosts = async (query: any) => {
    try {
        const posts = await databases.listDocuments(
            databaseId as string,
            videoCollectionId as string,
            [Query.search("title", query)]
        );

        return posts.documents;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const getUserPosts = async (userId: any) => {
    try {
        const posts = await databases.listDocuments(
            databaseId as string,
            videoCollectionId as string,
            [Query.equal("creator", userId)]
        );

        return posts.documents;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const signOut = async () => {
    try {
        const session = await account.deleteSession("current");

        return session;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getFilePreview = async (fileId: string, type: any) => {
    let fileUrl;

    try {
        if (type === "video") {
            fileUrl = storage.getFileView(storageId as string, fileId);
        } else if (type === "image") {
            fileUrl = storage.getFilePreview(
                storageId as string,
                fileId,
                2000,
                2000,
                "top" as ImageGravity,
                100
            );
        } else {
            throw new Error("Invalid file type");
        }

        if (!fileUrl) throw Error;

        return fileUrl;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const uploadFile = async (file: any, type: string) => {
    if (!file) return;

    // Appwrite accepts media like this
    const asset = {
        name: file.fileName,
        type: file.mimeType,
        size: file.fileSize,
        uri: file.uri,
    };

    try {
        const uploadedFile = await storage.createFile(
            storageId as string,
            ID.unique(),
            asset
        );

        const fileUrl = await getFilePreview(uploadedFile.$id, type);

        return fileUrl;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const createVideo = async (form: FormTypes) => {
    try {
        // We need to upload files at once. So need Promise.all
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, "image"),
            uploadFile(form.video, "video"),
        ]);

        const newPost = await databases.createDocument(
            databaseId as string,
            videoCollectionId as string,
            ID.unique(),
            {
                title: form.title,
                thumbnail: thumbnailUrl,
                video: videoUrl,
                prompt: form.prompt,
                creator: form.userId,
            }
        );

        return newPost;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const addBookmark = async (videoId: string) => {
    try {
        // Mevcut kullanıcı dökümanını al
        const userDocument = await getCurrentUser();

        // bookmarkedVideos array'ine videoId'yi ekle
        if (userDocument?.bookmarkedVideos.includes(videoId))
            return Alert.alert("Info", "This video is already bookmarked");
        const updatedBookmarks = [...userDocument?.bookmarkedVideos, videoId];

        // Kullanıcı dökümanını güncelle
        await databases.updateDocument(
            databaseId as string,
            userCollectionId as string,
            userDocument?.$id as string,
            { bookmarkedVideos: updatedBookmarks }
        );
        // Alert.alert("Success", "Video successfully bookmarked");
    } catch (error) {
        console.error("Error adding bookmark:", error);
    }
};

export const removeBookmark = async (videoId: string) => {
    try {
        // Mevcut kullanıcı dökümanını al
        const userDocument = await getCurrentUser();

        // bookmarkedVideos array'ine videoId'yi ekle
        // if (userDocument?.bookmarkedVideos.includes(videoId))
        //     return Alert.alert("Info", "This video is already bookmarked");
        const updatedBookmarks = userDocument?.bookmarkedVideos.filter(
            (id: string) => id !== videoId
        );

        // Kullanıcı dökümanını güncelle
        await databases.updateDocument(
            databaseId as string,
            userCollectionId as string,
            userDocument?.$id as string,
            { bookmarkedVideos: updatedBookmarks }
        );
        // Alert.alert("Success", "Video successfully unbookmarked");
    } catch (error) {
        console.error("Error removing bookmark:", error);
    }
};
