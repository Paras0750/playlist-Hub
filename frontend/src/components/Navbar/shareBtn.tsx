import { Share } from "lucide-react"



const  ShareBtn : React.FC = () => {
  return (
    <button className="flex items-center gap-1.5 
    text-sm border bg-white px-2 sm:px-4 py-2 rounded-full sm:rounded-4xl 
    backdrop-blur-3xl shadow-sm sm:shadow-2xl font-extralight
     hover:text-accentText hover:cursor-pointer hover:scale-105 
     transition-all duration-200 text-neutral-500">
        <Share className="h-4 w-4 shrink-0" /> 
        <p className="hidden sm:block">Share</p>
    </button>
  )
}

export default ShareBtn