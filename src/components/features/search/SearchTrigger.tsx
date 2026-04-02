import { Search } from "lucide-react";
import { useState } from "react";
import SearchOverlay from "./SearchOverlay";

const SearchTrigger = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOverlayOpen(!isOverlayOpen)}
        className="flex items-center justify-center p-2 text-gray-600 transition-colors hover:text-primary"
        aria-label="Mở tìm kiếm"
      >
        <Search className="h-5 w-5 lg:h-6 lg:w-6" />
      </button>

      <SearchOverlay
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
      />
    </>
  );
};

export default SearchTrigger;
