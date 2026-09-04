'use client'
function Search() {
  return (
    <form 
        action=""
        className="bg-(--white-colour) flex-1 max-w-180 flex rounded-full" >
        <input 
          type="search" 
          name="search"
          placeholder="I'm searching for..."
          className="flex-1 max-h-9 px-4"
          />
          <button className='flex items-center gap-2 px-2 py-1 border-l-2 border-black border-solid' type="submit">
            Search
            <img src="/search.svg" alt="Search" className="h-4" />
          </button>
      </form>
  )
}

export default Search