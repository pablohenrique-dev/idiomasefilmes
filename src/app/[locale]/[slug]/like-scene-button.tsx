"use client";

import { dislikeSceneAction } from "@/actions/dislike-scene";
import { likeSceneAction } from "@/actions/like-scene";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import React from "react";

interface LikeSceneButtonProps {
  sceneId: string;
  userId: string;
  locale: string;
  isSceneLiked: boolean;
}

export function LikeSceneButton({
  sceneId,
  userId,
  locale,
  isSceneLiked,
}: LikeSceneButtonProps) {
  const [isLiked, setIsLiked] = React.useState(isSceneLiked);

  async function handleLikeScene() {
    await likeSceneAction(userId, sceneId, locale);
    setIsLiked(true);
  }

  async function handleDislikeScene() {
    await dislikeSceneAction(userId, sceneId, locale);
    setIsLiked(false);
  }

  return (
    <>
      {isLiked ? (
        <Button
          className="aspect-square w-fit bg-pink-300 hover:bg-pink-400"
          onClick={handleDislikeScene}
        >
          <Heart className="size-4 fill-pink-600 text-pink-600 hover:fill-pink-700" />
        </Button>
      ) : (
        <Button
          className="aspect-square w-fit bg-[#F5F5F5] shadow-none hover:bg-neutral-400"
          onClick={handleLikeScene}
        >
          <Heart className="size-4 text-black" />
        </Button>
      )}
    </>
  );
}
