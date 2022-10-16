import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
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

export default { createMessage };
