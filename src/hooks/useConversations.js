import { useEffect } from 'react';
import {
  collection,
  orderBy,
  query,
  onSnapshot,
  where,
} from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';

import { firestore } from '../config/firebase.config';
import {
  removeConversations,
  setConversations,
} from '../store-redux/actions/chat';

export default function useConversations() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.id) {
      dispatch(removeConversations());
      return;
    }

    const q = query(
      collection(firestore, 'conversations'),
      where('memberIds', 'array-contains', user.id),
      orderBy('lastMessageAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => {
        const { createdAt, lastMessageAt, ...rest } = doc.data();

        return {
          id: doc.id,
          createdAt: createdAt.toDate(),
          lastMessageAt: lastMessageAt.toDate(),
          ...rest,
        };
      });

      dispatch(setConversations(data));
    });

    return () => unsubscribe();
  }, [user]);
}
