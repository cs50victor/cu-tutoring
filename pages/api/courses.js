import { supabaseAdmin } from "@lib/supabaseAdmin"

export async function getCourses(course) {
  course = course?.trim()?.toLowerCase()
  console.log(`+++ ${new Date().toLocaleString()} course: ${course || "all"}`)

  const { data: coursesObj, error } = await supabaseAdmin
    .from("uni_courses")
    .select("courses")

  if (coursesObj[0]?.courses?.length) {
    if (course) {
      const matches = coursesObj[0].courses
        .sort()
        .filter((c) => c.toLowerCase().includes(course))
      return matches.slice(0, 6)
    }
    return coursesObj[0].courses
  } else {
    return []
  }
}

const uniCourses = async (req, res) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET")
    res.status(405).end("Method Not Allowed")
  }
  let { course } = req.query

  const courses = await getCourses(course)

  return res.status(200).json({ data: courses })
}

// very important
export default uniCourses
