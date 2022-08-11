import { render } from "@testing-library/react"
import useSearch from "hooks/useSearch"
import Home from "pages/Home"
import Loading from "components/Loading"
import Error from "components/Error"

const mockedUseSearch = useSearch as jest.Mock<any>

jest.mock("hooks/useSearch")

describe("<Home />", () => {
  beforeEach(() => {
    mockedUseSearch.mockImplementation(() => ({ isLoading: true }))
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("Renders without crashing", () => {
    render(<Home />)
  })

  it("Displays loading indicator", () => {
    const { getByTestId } = render(<Loading />)

    expect(getByTestId("loading-element")).toBeVisible()
  })

  it("Displays error message", () => {
    const messageText = "Unable to fetch the nasa data"

    const { getByTestId } = render(<Error msgText={messageText} />)

    expect(getByTestId("error-element")).toBeVisible()
  })

  it("Displays nasa data", () => {
    const mockedNasaData = {
      nasa_id: 1,
      title: "Moon",
      description: "Description 1",
      date_created: "1995-12-17T03:24:00",
    }

    mockedUseSearch.mockImplementation(() => ({ isLoading: false, data: mockedNasaData }))

    render(<Home />)

    expect(mockedNasaData.title).toEqual("Moon")
    expect(mockedNasaData.description).toEqual("Description 1")
  })
})
