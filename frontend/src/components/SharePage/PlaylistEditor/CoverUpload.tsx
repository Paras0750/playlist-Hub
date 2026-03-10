import { XIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import { updatePlaylist } from "@/features/playlist/playlistSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";

const CoverUpload: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const [image, setImage] = useState<string | null>(() => {
    return localStorage.getItem("playlist-cover");
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result as string;

      setImage(base64);

      localStorage.setItem("playlist-cover", base64);

      dispatch(updatePlaylist({ image: base64 }));
    };

    reader.readAsDataURL(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setImage(null);
    localStorage.removeItem("playlist-cover");
    dispatch(updatePlaylist({ image: null }));
// Clear the file input value to allow re-uploading the same file if req
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="
          w-64 h-64
          rounded-2xl
          overflow-hidden
          shadow-xl
          bg-purple-200
          flex items-center justify-center
          cursor-pointer
          relative
        "
        onClick={() => {
          if (!image) handleButtonClick();
        }}
      >
        {image && (
          <button
            onClick={handleRemoveImage}
            className="
              absolute top-3 right-3
              bg-white/80
              backdrop-blur-md
              rounded-full p-1
              hover:scale-110
              transition
            "
          >
            <XIcon size={18} />
          </button>
        )}

        {image ? (
          <img
            key={image}
            src={image}
            alt="Playlist Cover"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-white/70 text-sm">No Cover Selected</span>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      <button
        onClick={handleButtonClick}
        className="
          text-secondaryText
          text-sm font-medium
          transition-all duration-300
          hover:underline
          hover:scale-105
          hover:text-accentText
          cursor-pointer
        "
      >
        Change Cover Image
      </button>
    </div>
  );
};

export default CoverUpload;
