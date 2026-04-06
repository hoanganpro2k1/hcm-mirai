import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import SearchOverlay from "./SearchOverlay";

interface SearchTriggerProps {
  isOpen?: boolean;
  onToggle?: () => void;
  onClose?: () => void;
}

const SearchTrigger = ({ 
  isOpen = false, 
  onToggle = () => {}, 
  onClose = () => {} 
}: SearchTriggerProps) => {
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className="text-gray-600 hover:text-primary lg:size-10"
        aria-label="Open search"
      >
        <Search className="size-5 lg:size-6" />
      </Button>

      <SearchOverlay isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default SearchTrigger;
