import { useQuery } from "@tanstack/react-query"
import { searchByNasaId } from "api/apiService"

const useSingleResult = (nasaId: string | undefined) => {
  const { isLoading, isError, error, data, isFetching } = useQuery(
    ["nasaID", nasaId],
    () => searchByNasaId(nasaId),
    {
      refetchOnWindowFocus: false,
    },
  )

  return { isLoading, isError, error, isFetching, data }
}

export default useSingleResult
