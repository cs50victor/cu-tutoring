import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import { format } from "date-fns"
import tw, { css, styled } from "twin.macro"
import { HiOutlineLocationMarker } from "react-icons/hi"
import { Modal } from "@primitives"

const workDays = () => {
  const week = new Array()
  const current = new Date(2022, 2, 1)
  // set Starting day to Monday
  current.setDate(current.getDate() - current.getDay() + 1)
  for (let i = 0; i < 5; i++) {
    week.push(current.toLocaleString("en-US", { weekday: "short" }))
    current.setDate(current.getDate() + 1)
  }
  return week
}

const bgs = {
  1: tw`bg-lime-700`,
  2: tw`bg-blue-700`,
  3: tw`bg-violet-700`,
  4: tw`bg-indigo-700`,
  5: tw`bg-amber-700`,
  6: tw`bg-[#87552D]`,
  7: tw`bg-[#586B56]`,
}

const inTime = (start, end) => {
  let sT = new Date(start)
  let now = new Date()
  let eT = new Date(end)

  sT = sT.getHours() * 60 + sT.getMinutes()
  now = now.getHours() * 60 + now.getMinutes()
  eT = eT.getHours() * 60 + eT.getMinutes()
  return sT <= now && now <= eT
}

const TutorDiv = styled.div`
  ${tw`inline-flex items-center justify-between w-full rounded-brand py-1 px-2 text-white text-sm bg-amber-700`},
  ${({ bgNum }) => bgs[bgNum]}
`

export default function TutoringCalendar({ tutors }) {
  let tId
  const [isOpen, setIsOpen] = useState(false)
  const weekDay = new Date().toLocaleString("en-US", { weekday: "short" })
  const weekDays = workDays()
  const [schedules, setSchedules] = useState([[]])
  const [isAvailable, setIsAvailable] = useState([])
  const [modalTutor, setModalTutor] = useState({})

  const modalFunc = () => {
    setIsOpen(false)
  }

  const handleTutorView = (tut, idx) => {
    const tutModalInfo = { ...tut, dayId: idx }
    console.log(`tutModalInfo : ${JSON.stringify(tutModalInfo, null, 2)}`)
    setModalTutor(tutModalInfo)
    setIsOpen(true)
  }

  useEffect(() => {
    setSchedules(tutors)
  }, [tutors])

  const availableTutorsTracker = () => {
    const dayNum = weekDays.indexOf(weekDay)

    if (dayNum !== -1 && schedules[dayNum]) {
      if (
        inTime(
          schedules[dayNum][0]?.time[0],
          schedules[dayNum][schedules[dayNum].length - 1]?.time[1],
        )
      ) {
        const availableTutors = []
        schedules[dayNum].forEach((tut, idx) => {
          availableTutors[idx] = inTime(tut.time[0], tut.time[1])
        })
        setIsAvailable(availableTutors)
        tId = setTimeout(availableTutorsTracker, 60000)
      }
    }
  }

  useMemo(() => availableTutorsTracker(), [schedules])

  useEffect(() => {
    return () => {
      tId && clearTimeout(tId)
    }
  }, [])

  return (
    <>
      <div
        css={[
          tw`w-full h-full mt-28 grid`,
          tutors?.length
            ? tw`sm:(grid-cols-2) md:(grid-cols-3) lg:(grid-cols-4) xl:(grid-cols-5)`
            : tw`sm:(grid-cols-5)`,
        ]}
      >
        {weekDays.map((day, dayNum) => (
          <div
            key={day}
            className="group"
            css={[
              tw`inline-flex flex-col flex-grow items-center justify-start  border-b border-l border-r border-neutral-3`,
              weekDays.includes(weekDay)
                ? day === weekDay
                  ? tw`opacity-100 border-neutral-4`
                  : tw`opacity-80`
                : tw`opacity-100`,
            ]}
          >
            <span
              css={[
                tw`w-max mx-auto text-center px-10 my-2 rounded-brand`,
                day === weekDay
                  ? tw`text-neutral-1 font-extrabold bg-neutral-8`
                  : tw`text-neutral-5 font-semibold`,
              ]}
            >
              {day}.
            </span>
            {tutors.length ? (
              <div tw="text-left py-2 px-1 space-y-2 w-full">
                {schedules[dayNum]?.length > 0 ? (
                  <>
                    {schedules[dayNum].map((tut, idx) => (
                      <button
                        value={tut.name}
                        key={idx}
                        css={[
                          tw`flex place-items-center rounded border p-1 w-full
                          tracking-tighter`,
                          day == weekDay
                            ? isAvailable[idx]
                              ? tw`border-neutral-6 shadow-xl`
                              : tw`opacity-50 hocus:(opacity-100) shadow-inner`
                            : tw`filter grayscale hocus:(grayscale-0) group-hocus:(opacity-100)`,
                        ]}
                        onClick={() => handleTutorView(tut, idx)}
                      >
                        <div
                          css={[
                            tw`flex flex-col text-sm text-left py-1 pl-1 mr-2.5 w-[5.65rem] 
                            border-r rounded-l font-medium group-hocus:(opacity-100)`,
                            day == weekDay && isAvailable[idx]
                              ? tw`text-neutral-7 bg-neutral-3`
                              : tw`text-neutral-6 bg-neutral-1`,
                          ]}
                        >
                          <span>{format(new Date(tut.time[0]), "p")}</span>
                          <br />
                          <span>{format(new Date(tut.time[1]), "p")}</span>
                        </div>
                        <TutorDiv bgNum={tut.bgNum}>
                          <div tw="inline-flex items-center space-x-1">
                            <Image
                              src="/static/default_avatar.png"
                              width={30}
                              height={30}
                              tw="rounded-full bg-neutral-3"
                              alt=""
                            />
                            <span tw="font-semibold">{tut.name}</span>
                          </div>
                          <span tw="flex flex-col font-medium items-center tracking-tight">
                            <HiOutlineLocationMarker tw="w-4" />
                            <small>library</small>
                          </span>
                        </TutorDiv>
                      </button>
                    ))}
                  </>
                ) : (
                  <p
                    tw="font-hero rounded w-full h-60 text-neutral-7
                    bg-neutral-2 text-xl flex items-center justify-center"
                  >
                    no tutor available
                  </p>
                )}
              </div>
            ) : (
              <p
                tw="
                  w-full h-40 motion-safe:(animate-pulse)
                flex flex-col items-center text-center justify-center"
              >
                ----
              </p>
            )}
          </div>
        ))}
      </div>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        contentProps={{
          title: modalTutor.name,
          description: "Tutoring times",
          content: (
            <div tw="py-8 border-t text-base md:(text-lg)">
              {modalTutor?.allTimes &&
                Object.keys(modalTutor.allTimes).map((day) => (
                  <div tw="flex flex-col mb-5 text-center" key={day}>
                    <span tw="font-semibold text-neutral-7"> {day} </span>
                    {modalTutor.allTimes[day]?.map((time, idx) => (
                      <span tw="mb-1" key={idx}>
                        {format(new Date(time[0]), "p")} -{format(new Date(time[1]), "p")}
                      </span>
                    ))}
                  </div>
                ))}
            </div>
          ),
          buttonArea: (
            <div tw="w-full">
              {isAvailable[modalTutor.dayId] ? (
                <button
                  type="button"
                  tw="mx-auto block bg-green-900 text-green-50 rounded-brand px-3 py-2 text-center"
                  onClick={modalFunc}
                >
                  Ask a question
                </button>
              ) : (
                <span tw="mx-auto block bg-gray-600 rounded-brand px-3 py-2 text-neutral-1 text-center">
                  Not Available
                </span>
              )}
            </div>
          ),
        }}
      />
    </>
  )
}
