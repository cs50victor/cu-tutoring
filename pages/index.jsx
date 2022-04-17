import { useContext, useState, useEffect } from "react"
import tw, { css } from "twin.macro"
import Link from "next/link"
import { CourseSearch, TutoringCalendar } from "@components"
import { HybridContext, HybridContainer } from "@layouts/HybridContainer"

const PageContent = () => {
  const value = useContext(HybridContext)
  const [tutors, setTutors] = useState([])

  return (
    <div tw="max-w-screen-xl mx-auto text-center min-h-full pt-20 pb-36 px-5">
      <div tw="max-w-lg mx-auto text-left mt-6 space-y-14">
        <CourseSearch setResult={setTutors} />
      </div>
      <TutoringCalendar tutors={tutors} />
    </div>
  )
}

export default function Home() {
  return (
    <HybridContainer headerBorder fixedHeader hasBorder footer>
      <PageContent />
    </HybridContainer>
  )
}

Home.theme = "light"
