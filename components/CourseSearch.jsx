import { useState, useEffect, useRef } from "react"
import { Input } from "@components"
import tw, { css } from "twin.macro"
import { useTimeoutFn } from "react-use"
import { fetchJSON } from "@utils/apiHelpers"

export default function CourseSearch({ setResult }) {
  const [searchResults, setSearchResults] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const searchField = useRef()
  const courseNotFound = "No course found."

  const setCourse = async (e) => {
    const name = e.target.value.trim()
    if (name !== courseNotFound) {
      searchField.current.value = name
      setSearchResults([])
      const courseName = name.replace(/\(.*?\)/g, "").trim()
      const { data } = await fetchJSON(`/api/tutors?course=${courseName}`)
      data.length ? setResult(data) : setResult([[], [], [], [], []])
    }
  }

  useEffect(() => {
    searchField?.current?.focus()
  }, [])

  useEffect(() => {
    const delayFn = setTimeout(async () => {
      if (searchTerm.length > 0) {
        const { data } = await fetchJSON(`/api/courses?course=${searchTerm}`)
        data?.length ? setSearchResults(data) : setSearchResults([courseNotFound])
      } else {
        setSearchResults([])
        setResult([])
      }
    }, 200)

    return () => clearTimeout(delayFn)
  }, [searchTerm])

  return (
    <div>
      <label tw="font-hero tracking-tight text-xl font-bold ">
        Course you need help with
      </label>
      <span
        className="group"
        css={[
          tw`font-medium text-base 
              inline-flex flex-col w-full px-2 text-neutral-5 mt-2
              rounded-xl shadow-md ease-in-out transition duration-200 
              hocus:( text-neutral-8 scale-[1.005])`,
          searchResults.length > 0
            ? tw`rounded-b-none border-r border-l border-t`
            : tw`rounded-xl border`,
        ]}
      >
        <div tw="w-full inline-flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            tw="mx-1 w-6 text-neutral-4 transition 
                  ease-in-out group-focus:(text-neutral-4)"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.9096 16.7883L22.0607 19.9393C22.6464 20.5251 22.6464 21.4749 22.0607 22.0607C21.4749 22.6464 20.5251 22.6464 19.9393 22.0607L16.7883 18.9096C15.0354 20.2224 12.8585 21 10.5 21C4.70101 21 0 16.299 0 10.5C0 4.70101 4.70101 -1.19209e-07 10.5 -1.19209e-07C16.299 -1.19209e-07 21 4.70101 21 10.5C21 12.8585 20.2224 15.0354 18.9096 16.7883ZM3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5Z"
              fill="currentColor"
            ></path>
          </svg>
          <Input
            type="search"
            list="options"
            onChange={(e) => {
              setSearchTerm(e.target.value.trim())
            }}
            placeholder="course name"
            ref={searchField}
            tw="border-none 
                  placeholder:(text-neutral-4 italic font-hero uppercase)
                  hocus:(ring-0)"
            autoFocus
          />
        </div>
      </span>
      {searchResults.length > 0 && (
        <div tw="relative">
          <div
            tw="absolute
                  font-medium text-base bg-base shadow-xl w-full
                  mt--1 border-t border-r border-l border-b rounded-b z-10
                "
          >
            <span
              tw="inline-flex flex-col
                  w-full py-2 overflow-y-auto"
            >
              {searchResults?.map((course, id) => (
                <button
                  key={id}
                  value={course}
                  onClick={setCourse}
                  css={[
                    tw`py-2 px-12 pr-8 text-left w-full text-neutral-6 rounded-sm `,
                    course !== courseNotFound
                      ? tw`hocus:(font-semibold text-purple-900 bg-purple-100)`
                      : tw`cursor-default`,
                  ]}
                >
                  {course}
                </button>
              ))}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
