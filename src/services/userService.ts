import { db } from '@config/firebase';
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { User } from '@types/index';
import { generateId } from '@utils/helpers';

export const userService = {
  async createUser(email: string, username: string, avatar: string, bio: string): Promise<User> {
    const newUser: User = {
      id: generateId(),
      email,
      username,
      avatar,
      bio,
      followers: 0,
      following: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      isVerified: false,
      isMonetized: false,
      blockedUsers: [],
      mutedUsers: [],
    };

    await addDoc(collection(db, 'users'), newUser);
    return newUser;
  },

  async getUserById(userId: string): Promise<User | null> {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      return (userDoc.data() as User) || null;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  },

  async getUserByUsername(username: string): Promise<User | null> {
    try {
      const q = query(collection(db, 'users'), where('username', '==', username));
      const snapshot = await getDocs(q);
      return (snapshot.docs[0]?.data() as User) || null;
    } catch (error) {
      console.error('Error fetching user by username:', error);
      return null;
    }
  },

  async updateUser(userId: string, updates: Partial<User>): Promise<void> {
    await updateDoc(doc(db, 'users', userId), {
      ...updates,
      updatedAt: new Date(),
    });
  },

  async deleteUser(userId: string): Promise<void> {
    await deleteDoc(doc(db, 'users', userId));
  },

  async blockUser(userId: string, blockedUserId: string): Promise<void> {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    const blockedUsers = userDoc.data()?.blockedUsers || [];
    await updateDoc(userRef, {
      blockedUsers: [...new Set([...blockedUsers, blockedUserId])],
    });
  },

  async unblockUser(userId: string, blockedUserId: string): Promise<void> {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    const blockedUsers = userDoc.data()?.blockedUsers || [];
    await updateDoc(userRef, {
      blockedUsers: blockedUsers.filter((id: string) => id !== blockedUserId),
    });
  },
};
