import { Frown } from "lucide-react";

export const NotFound = () => (
  <div className="flex flex-col items-center pt-20 gap-2">
    <Frown size={80} />
    <div className="col-span-full text-center text-2xl">No posts found</div>
  </div>
);
