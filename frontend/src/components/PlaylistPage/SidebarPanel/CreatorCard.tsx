import React from "react";
import { useNavigate } from "react-router-dom";
import type { Owner } from "./SidebarPanel";

const CreatorCard: React.FC<{ owner: Owner }> = ({ owner }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl p-6  shadow-sm flex flex-col  ">
    <div className="flex items-center gap-3 my-1 ">
        <img src={owner.image}
    alt="Creator Profile" className="w-16 h-16 rounded-full object-cover   border-2 border-accentText " />
      <h3 className="font-semibold font-subHeadingText text-2xl text-primaryText tracking-tight flex flex-col gap-0.5  ">{owner.username}
        {/* <span className="text-sm text-secondaryText font-smtext font-light mt-1 tracking-wide">12.3K followers</span> */} 
      </h3>
      
    </div>
    <p className="text-xs text-secondaryText font-smtext font-light mt-2">
        Curating the best vibes for focus and relaxation.
      </p>
      <button className="
  relative
  mt-4 w-full
  rounded-full
  py-2
  font-smtext font-semibold
  text-primaryText
  overflow-hidden
  transition-all duration-300
  border-[0.5px] border-accentText hover:scale-102 hover:cursor-pointer hover:shadow-accentText/20 hover:shadow-md
"
      type="button"
      onClick={() => navigate(`/profile/${owner._id}`)}
>
View Profile
 
</button>

    </div>
  );
};

export default CreatorCard;
