import { useEffect } from 'react';
import { collection, orderBy, query, onSnapshot } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';

import { firestore } from '../config/firebase.config';
import { setMessages } from '../store-redux/actions/chat';

export default function useMessages(otherUser) {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.id) {
      dispatch(setMessages([]));
      return;
    }

    const conversationId = [user.id, otherUser.id].sort().join('---');

    const q = query(
      collection(firestore, 'conversations', conversationId, 'messages'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => {
        const { createdAt, createdBy, ...rest } = doc.data();

        return {
          _id: doc.id,
          createdAt: createdAt?.toDate() ?? new Date(), // serverTimestamp() is temporarily null
          user: { _id: createdBy },
          ...rest,
        };
      });

      dispatch(setMessages(data));
    });

    return () => unsubscribe();
  }, [user, otherUser]);
}
