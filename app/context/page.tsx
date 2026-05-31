"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface Comment {
  id: number;
  text: string;
}

interface PostContextType {
  likes: number;
  comments: Comment[];
  addLike: () => void;
  removeLike: () => void;
  addComment: (text: string) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export function PostProvider({ children }: { children: ReactNode }) {
  const [likes, setLikes] = useState<number>(0);
  const [comments, setComments] = useState<Comment[]>([]);

  const addLike = () => setLikes((prev) => prev + 1);
  const removeLike = () => setLikes((prev) => (prev > 0 ? prev - 1 : 0)); // Proteksi agar tidak minus
  const addComment = (text: string) => {
    if (!text.trim()) return;
    setComments((prev) => [...prev, { id: Date.now(), text }]);
  };

  return (
    <PostContext.Provider value={{ likes, comments, addLike, removeLike, addComment }}>
      {children}
    </PostContext.Provider>
  );
}

export function usePost() {
  const context = useContext(PostContext);
  if (!context) throw new Error("usePost must be used within a PostProvider");
  return context;
}