import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

import { firestore } from '../config/firebase.config';

const createMessage = async ({ _id, text, user, otherUser }) => {
  const conversationId = [user.id, otherUser.id].sort().join('---');
  const conversationRef = doc(firestore, 'conversations', conversationId);

  const conversationDoc = await getDoc(conversationRef);
  if (!conversationDoc.exists())
    await createConversation({ user, otherUser, conversationId });

  const messageRef = doc(
    firestore,
    'conversations',
    conversationId,
    'messages',
    _id
  );

  const now = serverTimestamp();

  await setDoc(messageRef, {
    createdAt: now,
    text,
    createdBy: user.id,
  });

  await updateDoc(conversationRef, {
    lastMessage: text,
    lastMessageAt: now,
  });
};

const createConversation = async ({ user, otherUser, conversationId }) => {
  try {
    const conversationRef = doc(firestore, 'conversations', conversationId);

    await setDoc(conversationRef, {
      createdAt: serverTimestamp(),
      memberIds: [user.id, otherUser.id],
      members: [user, otherUser],
    });
  } catch (error) {
    console.error(error);
  }
};

const updateUserInfoChat = async ({ user }) => {
  try {
    const userConversationsRef = await getDocs(
      query(
        collection(firestore, 'conversations'),
        where('memberIds', 'array-contains', user.id),
        orderBy('lastMessageAt', 'desc')
      )
    );

    const promises = [];
    userConversationsRef.docs.forEach(async (doc) => {
      const { members } = doc.data();

      const otherUsers = members.filter((u) => u.id !== user.id);
      const current = members.filter((u) => u.id === user.id);

      promises.push(
        updateDoc(doc.ref, {
          members: [{ ...current, ...user }, ...otherUsers],
        })
      );
    });

    await Promise.all(promises);
  } catch (error) {
    console.error(error);
  }
};

export default { createMessage, updateUserInfoChat };
