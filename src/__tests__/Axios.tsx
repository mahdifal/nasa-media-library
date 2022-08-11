import axios, { AxiosResponse } from "axios"

jest.mock("axios")
const mockedAxios = axios as jest.Mocked<typeof axios>

describe("nasa unit tests", () => {
  test("should return nasa data list", async () => {
    const nasaDataList = [
      {
        nasa_id: 1,
        title: "Moon",
        description: "Description 1",
        date_created: "1995-12-17T03:24:00",
      },
      {
        nasa_id: 2,
        title: "Earth",
        description: "Description 2",
        date_created: "1998-12-17T03:24:00",
      },
    ]

    mockedAxios.get.mockResolvedValueOnce({
      data: nasaDataList,
    } as AxiosResponse)

    const result = await axios.get("search")

    expect(result.data).toEqual(nasaDataList)
  })

  test("should return error", async () => {
    const error = new Error("Error")

    mockedAxios.get.mockRejectedValueOnce(error)

    try {
      await axios.get("search")
    } catch (e) {
      expect(e).toEqual(error)
    }
  })

  test("should return error if response status is not 200", async () => {
    const error = new Error("Error")

    mockedAxios.get.mockResolvedValueOnce({
      status: 500,
      data: {
        error: "Error",
      },
    } as AxiosResponse)

    try {
      await axios.get("search")
    } catch (e) {
      expect(e).toEqual(error)
    }
  })

  test("should get a single nasa data", async () => {
    const SingleNasaData = [
      {
        nasa_id: 1,
        title: "Moon",
        description: "Description 1",
        date_created: "1995-12-17T03:24:00",
      },
    ]

    mockedAxios.get.mockResolvedValueOnce({
      data: SingleNasaData,
    } as AxiosResponse)

    const result = await axios.get("nasa_id")

    expect(result.data).toEqual(SingleNasaData)
  })
})
