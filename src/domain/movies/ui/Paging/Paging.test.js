import { render, screen, fireEvent } from "@testing-library/react";
import { mockItems } from "utils/utils";
import Paging from "./Paging";

const PAGE_SIZE = 6;
const onNextPage = jest.fn();
const onPrevPage = jest.fn();

const prevLabel = "Previous page";
const nextLabel = "Next page";

describe("Paging", () => {
  beforeEach(() => {
    onNextPage.mockClear();
    onNextPage.mockClear();
  });
  it("hides paging", () => {
    render(
      <Paging
        page={0}
        collection={[]}
        pageSize={PAGE_SIZE}
        onNextPage={onNextPage}
        onPrevPage={onPrevPage}
      />
    );
    expect(screen.queryByText(prevLabel)).toBeNull();
    expect(screen.queryByText(nextLabel)).toBeNull();
  });

  it("shows next page", () => {
    render(
      <Paging
        page={0}
        collection={mockItems(PAGE_SIZE)}
        pageSize={PAGE_SIZE}
        onNextPage={onNextPage}
        onPrevPage={onPrevPage}
      />
    );
    expect(screen.queryByText(prevLabel)).toBeNull();
    expect(screen.queryByText(nextLabel)).toBeVisible();
  });

  it("shows prev page", () => {
    render(
      <Paging
        page={1}
        collection={mockItems(PAGE_SIZE - 1)}
        pageSize={PAGE_SIZE}
        onNextPage={onNextPage}
        onPrevPage={onPrevPage}
      />
    );
    expect(screen.queryByText(nextLabel)).toBeNull();
    expect(screen.queryByText(prevLabel)).toBeVisible();
  });

  it("shows paging", () => {
    render(
      <Paging
        page={1}
        collection={mockItems(PAGE_SIZE)}
        pageSize={PAGE_SIZE}
        onNextPage={onNextPage}
        onPrevPage={onPrevPage}
      />
    );
    expect(screen.queryByText(nextLabel)).toBeVisible();
    expect(screen.queryByText(prevLabel)).toBeVisible();
  });

  it("calls callback for next page", () => {
    render(
      <Paging
        page={0}
        collection={mockItems(PAGE_SIZE)}
        pageSize={PAGE_SIZE}
        onNextPage={onNextPage}
        onPrevPage={onPrevPage}
      />
    );
    const button = screen.queryByText(nextLabel);
    fireEvent.click(button);
    expect(onNextPage).toBeCalledTimes(1);
  });

  it("calls callback for prev page", () => {
    render(
      <Paging
        page={1}
        collection={mockItems(PAGE_SIZE)}
        pageSize={PAGE_SIZE}
        onNextPage={onNextPage}
        onPrevPage={onPrevPage}
      />
    );
    const button = screen.queryByText(prevLabel);
    fireEvent.click(button);
    expect(onPrevPage).toBeCalledTimes(1);
  });
});
