import { db, storage } from '@config/firebase';
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc, limit, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { Post } from '@types/index';
import { generateId } from '@utils/helpers';

export const postService = {
  async createPost(post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<Post> {
    const now = new Date();
    const newPost: Post = {
      ...post,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
      isEdited: false,
      isDeleted: false,
    };

    await addDoc(collection(db, 'posts'), newPost);
    return newPost;
  },

  async getPostById(postId: string): Promise<Post | null> {
    try {
      const postDoc = await getDoc(doc(db, 'posts', postId));
      return (postDoc.data() as Post) || null;
    } catch (error) {
      console.error('Error fetching post:', error);
      return null;
    }
  },

  async getFeed(feedType: 'foryou' | 'following', userId: string, pageSize = 20): Promise<Post[]> {
    try {
      let q;
      if (feedType === 'foryou') {
        q = query(
          collection(db, 'posts'),
          where('isDeleted', '==', false),
          orderBy('createdAt', 'desc'),
          limit(pageSize)
        );
      } else {
        // Following tab would filter by user's followings
        q = query(
          collection(db, 'posts'),
          where('isDeleted', '==', false),
          orderBy('createdAt', 'desc'),
          limit(pageSize)
        );
      }

      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => doc.data() as Post);
    } catch (error) {
      console.error('Error fetching feed:', error);
      return [];
    }
  },

  async getPostsByAuthor(authorId: string): Promise<Post[]> {
    try {
      const q = query(
        collection(db, 'posts'),
        where('authorId', '==', authorId),
        where('isDeleted', '==', false),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => doc.data() as Post);
    } catch (error) {
      console.error('Error fetching user posts:', error);
      return [];
    }
  },

  async updatePost(postId: string, updates: Partial<Post>): Promise<void> {
    await updateDoc(doc(db, 'posts', postId), {
      ...updates,
      updatedAt: new Date(),
      isEdited: true,
    });
  },

  async deletePost(postId: string): Promise<void> {
    await updateDoc(doc(db, 'posts', postId), {
      isDeleted: true,
      updatedAt: new Date(),
    });
  },

  async uploadImage(userId: string, imageUri: string): Promise<string> {
    try {
      const filename = `${userId}/${Date.now()}.jpg`;
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const storageRef = ref(storage, `posts/${filename}`);
      await uploadBytes(storageRef, blob);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  async uploadVideo(userId: string, videoUri: string): Promise<{ url: string; thumb: string }> {
    try {
      const filename = `${userId}/${Date.now()}.mp4`;
      const response = await fetch(videoUri);
      const blob = await response.blob();
      const storageRef = ref(storage, `videos/${filename}`);
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
      return { url, thumb: url }; // In real app, generate proper thumbnail
    } catch (error) {
      console.error('Error uploading video:', error);
      throw error;
    }
  },
};
