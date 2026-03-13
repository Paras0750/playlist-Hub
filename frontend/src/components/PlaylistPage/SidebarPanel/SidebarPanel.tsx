import React from "react";
import CreatorCard from "./CreatorCard";
import PopularTags from "./PopularTags";

export interface Owner {
  
    _id: string;
    username: string;
    email: string;
    image: string;

}
const SidebarPanel: React.FC <{ owner: Owner }> = ({ owner }) => {
  console.log("owener sdiebar: ",owner)
  return (
    <div className="w-80 flex flex-col gap-6">
      <CreatorCard owner={owner} />
      <PopularTags />
    </div>
  );
};

export default SidebarPanel;
