import React from "react"
import { useQuery } from "@tanstack/react-query"
import { searchMedia } from "api/apiService"

const useSearch = () => {
  const [showAlert, setShowAlert] = React.useState<boolean>(false)
  const [currentPage, setCurrentPage] = React.useState<number>(1)
  const [searchTerm, setSearchTerm] = React.useState<string>("")
  const [yearStart, setYearStart] = React.useState<string>("")
  const [yearEnd, setYearEnd] = React.useState<string>("")

  const { data, isError, error, isFetching, refetch } = useQuery(
    ["search", searchTerm, currentPage, yearStart, yearEnd],
    () => searchMedia(searchTerm, currentPage, yearStart, yearEnd),
    {
      enabled: searchTerm.length > 0,
      retry: false,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  )

  return {
    data,
    isError,
    error,
    isFetching,
    currentPage,
    setCurrentPage,
    showAlert,
    setShowAlert,
    setSearchTerm,
    refetch,
    setYearStart,
    setYearEnd,
  }
}

export default useSearch
