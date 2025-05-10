import {
    BsHeart,
    BsHeartFill,
    BsChat,
    BsShare,
    BsBookmark,
  } from "react-icons/bs";
  import { useEffect, useState } from "react";
  import { toast } from "react-hot-toast";
  import {
    useLikeBlogMutation,
    useUnlikeBlogMutation,
    useGetUserQuery,
    useGetLikeStatusQuery,
  } from "../../redux/services/meBlogsApi";
  import { useParams } from "react-router-dom";
  
  interface SocialBarProps {
    refetch: () => void;
  }
  
  export default function SocialBar({ refetch }: SocialBarProps) {
    const { id } = useParams();
    const blogId = Number(id);
    const { data: user } = useGetUserQuery();
    const userId = user?.id;
  
    const [hasLiked, setHasLiked] = useState(false);
  
    const [likeBlog] = useLikeBlogMutation();
    const [unlikeBlog] = useUnlikeBlogMutation();
  
    const { data: likeStatus, isLoading: isLikeStatusLoading } =
      useGetLikeStatusQuery(
        { blogId, userId: userId as number },
        { skip: !userId || !blogId }
      );
  
    useEffect(() => {
      if (likeStatus) {
        setHasLiked(likeStatus.liked);
      }
    }, [likeStatus]);
  
    const handleLikeToggle = async () => {
      if (!userId) {
        toast.error("You must be logged in to like.");
        return;
      }
    
      // Optimistically update the UI
      const previousLiked = hasLiked;
      setHasLiked(!previousLiked);
    
      try {
        if (previousLiked) {
          await unlikeBlog({ blogId, userId }).unwrap();
          toast("💔 Unliked");
        } else {
          await likeBlog({ blogId, userId }).unwrap();
          toast("❤️ Liked");
        }
        // Optionally refetch data after success
        refetch();
      } catch (err) {
        // Revert optimistic update on error
        setHasLiked(previousLiked);
        console.error("Like/Unlike error", err);
        toast.error("Something went wrong.");
      }
    };
    
  
    if (isLikeStatusLoading) return null;
  
    return (
      <div className="flex justify-between items-center mb-6">
        {/* Left Section */}
        <div className="flex gap-6 items-center">
          <button
            onClick={handleLikeToggle}
            title={hasLiked ? "Unlike this post" : "Like this post"}
            className={`flex items-center gap-2 ${
              hasLiked ? "text-red-500" : "text-gray-300"
            } hover:text-red-400 transition-all duration-200 group`}
          >
            {hasLiked ? (
              <BsHeartFill className="text-xl group-hover:scale-110 transition-transform" />
            ) : (
              <BsHeart className="text-xl group-hover:scale-110 transition-transform" />
            )}
            <span className="text-sm font-medium">
              {hasLiked ? "Liked" : "Like"}
            </span>
          </button>
  
          <button
            title="Comment on this post"
            className="flex items-center gap-2 text-gray-300 hover:text-red-400 transition-all duration-200 group"
          >
            <BsChat className="text-xl group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Comment</span>
          </button>
  
          <button
            title="Share this post"
            className="flex items-center gap-2 text-gray-300 hover:text-red-400 transition-all duration-200 group"
          >
            <BsShare className="text-xl group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>
  
        {/* Right Section: Save */}
        <button
          title="Save this post"
          className="flex items-center gap-2 text-gray-300 hover:text-red-400 transition-all duration-200 group"
        >
          <BsBookmark className="text-xl group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium">Save</span>
        </button>
      </div>
    );
  }
  