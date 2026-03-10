import { updatePlaylist } from "@/features/playlist/playlistSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import React, {  useState } from "react";




const PlaylistMeta: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useAppDispatch();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    dispatch(updatePlaylist({ title: value, description }));
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setDescription(value);
    dispatch(updatePlaylist({ title, description: value }));
  };

  return (
    <div className="flex flex-col gap-6 flex-1 font-smtext tracking-wide">
      <div className="flex flex-col">
        <label className="text-xs text-secondaryText">
          PLAYLIST TITLE
        </label>

        <input
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter Title..."
          className="mt-2 w-full rounded-xl border text-sm font-light border-white/50 bg-white/50 backdrop-blur-md px-4 py-3 outline-none focus:ring-1 focus:ring-purple-300/40"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-xs text-secondaryText">
          DESCRIPTION
        </label>

        <textarea
          value={description}
          onChange={handleDescriptionChange}
          rows={4}
          placeholder="Describe your playlist..."
          className="mt-2 w-full rounded-xl border text-sm font-light border-white/50 bg-white/50 backdrop-blur-md px-4 py-3 outline-none resize-none focus:ring-1 focus:ring-purple-300/40"
        />
      </div>
    </div>
  );
};

export default PlaylistMeta;