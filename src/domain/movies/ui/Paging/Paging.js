import clsx from "clsx";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import Button, { Variants } from "ui/Button/Button";

const Paging = ({ page, collection, pageSize, onNextPage, onPrevPage }) => {
  const isPreviousPage = page > 0;
  const isNextPage =
    collection.length !== 0 && collection.length % pageSize === 0;
  return (
    <nav
      className={clsx(
        "mt-8 flex space-x-8",
        isPreviousPage && isNextPage && "justify-between",
        !isPreviousPage && isNextPage && "justify-end",
        isPreviousPage && !isNextPage && "justify-start"
      )}
    >
      {isPreviousPage && (
        <Button
          onClick={onPrevPage}
          leftIcon={BiChevronLeft}
          variant={Variants.SECONDARY}
        >
          Previous page
        </Button>
      )}
      {isNextPage && (
        <Button
          onClick={onNextPage}
          rightIcon={BiChevronRight}
          variant={Variants.SECONDARY}
        >
          Next page
        </Button>
      )}
    </nav>
  );
};

export default Paging;
