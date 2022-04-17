import { supabaseAdmin } from "@lib/supabaseAdmin"
import { intervalToDuration } from "date-fns"

const fullWeekDayName = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
}
const fullWeekDayNameKeys = Object.keys(fullWeekDayName)
const fullWeekDayNameValues = Object.values(fullWeekDayName)

const sortWeekDays = (weekDaysWithTimes) => {
  return Object.keys(weekDaysWithTimes)
    .sort((a, b) => fullWeekDayNameKeys.indexOf(a) - fullWeekDayNameKeys.indexOf(b))
    .reduce((dayObj, day) => {
      dayObj[fullWeekDayName[day]] = weekDaysWithTimes[day]
      delete dayObj.day
      return dayObj
    }, {})
}

export async function getTutors(course) {
  course = course?.trim()?.toLowerCase()
  console.log(`+++ ${new Date().toLocaleString()} course: ${course || "all"}`)
  const { data: tutorsArr, error } = await supabaseAdmin.from("uni_tutors").select("*")

  if (tutorsArr?.length) {
    tutorsArr
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach((tutor) => {
        tutor.times = sortWeekDays(tutor.times)
        tutor.totalHours = 0
        // convert dates to ISO string - prevents client-side error in Safari
        Object.entries(tutor.times).forEach((day) => {
          const [key, value] = day
          for (let i = 0; i < value.length; i++) {
            tutor.times[key][i] = [
              new Date(value[i][0]).toISOString(),
              new Date(value[i][1]).toISOString(),
            ]
            const timeInterval = intervalToDuration({
              start: new Date(value[i][0]),
              end: new Date(value[i][1]),
            })
            tutor.totalHours +=
              timeInterval.hours + parseFloat((timeInterval.minutes / 60).toFixed(2))
          }
        })
      })

    if (course) {
      const schedules = [[], [], [], [], []]
      tutorsArr
        .filter((tutor) => tutor.courses.some((c) => c.toLowerCase().includes(course)))
        .forEach((tutor) => {
          tutor["bgNum"] = Math.floor(Math.random() * (7 - 1) + 1)
          Object.entries(tutor.times).forEach((day) => {
            // use times to populate schedule array
            const [key, value] = day
            for (const v of value) {
              const { id, name, courses, bgNum } = tutor
              schedules[fullWeekDayNameValues.indexOf(key)].push({
                id,
                name,
                courses,
                bgNum,
                time: v,
                allTimes: tutor.times,
              })
            }
          })
        })

      schedules.forEach(
        (s) => s && s.sort((a, b) => new Date(a.time[0]) - new Date(b.time[0])),
      )
      return schedules
    }
    return tutorsArr
  }
  return []
}

const uniTutors = async (req, res) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET")
    res.status(405).end("Method Not Allowed")
  }

  let { course } = req.query
  const tutors = await getTutors(course)

  return res.status(200).json({ data: tutors })
}

// very important
export default uniTutors
