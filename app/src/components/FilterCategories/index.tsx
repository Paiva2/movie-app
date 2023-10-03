import { useContext } from "react"
import { CaretDown } from "@phosphor-icons/react"
import { FilterList, FilterTrigger } from "./styles"
import { AppContextProvider } from "../../contexts/AppContext"

interface FilterCategoriesProps {
  genreList: {
    id: number
    name: string
  }[]
}

const FilterCategories = ({ genreList }: FilterCategoriesProps) => {
  const {
    filteredCategories,
    openFilterList,
    setFilteredCategories,
    setOpenFilterList,
  } = useContext(AppContextProvider)

  function insertCategoryOnFilter(category: string) {
    if (filteredCategories.includes(category)) {
      const removeCategory = filteredCategories.filter(
        (categories) => categories !== category
      )

      return setFilteredCategories(removeCategory)
    }

    setFilteredCategories((oldCategories) => [...oldCategories, category])
  }

  return (
    <span>
      <FilterTrigger
        $visibility={openFilterList}
        onClick={(e) => {
          e.stopPropagation()
          setOpenFilterList(!openFilterList)
        }}
      >
        Filter <CaretDown size={25} weight="bold" />
      </FilterTrigger>
      <FilterList
        onClick={(e) => e.stopPropagation()}
        $visibility={openFilterList}
      >
        {genreList.map((genre) => {
          return (
            <li key={genre.id}>
              <label>
                <input
                  value={genre.id}
                  onChange={(e) => insertCategoryOnFilter(e.target.value)}
                  type="checkbox"
                />
                <span>{genre.name}</span>
              </label>
            </li>
          )
        })}
      </FilterList>
    </span>
  )
}

export default FilterCategories
