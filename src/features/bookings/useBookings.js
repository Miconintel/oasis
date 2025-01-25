import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";
import { PAGE_SIZE } from "../../utils/constant";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //   filter.
  // check for the query object, to see the value of the
  // statusfield

  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  //   SORT

  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //   PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //   QUERY

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  //   PREFETCHING

  const pageCount = Math.ceil(count / PAGE_SIZE);

  //   if we are in a page that is less than the number of pages,
  // fetch the next page.
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
    });

  // if the page on the searchQuery is greater than 1,
  // fetch the previous page.
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
    });

  return { isLoading, error, bookings, count };
}
