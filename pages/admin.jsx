import {
  User,
  withAuthRequired,
  supabaseServerClient,
} from "@supabase/supabase-auth-helpers/nextjs"
import tw, { css } from "twin.macro"
import { format } from "date-fns"
import { BsFillCircleFill } from "react-icons/bs"
import { UserUIContainer } from "@layouts/UserUIContainer"
import { getTutors } from "@api/tutors"
import { getCourses } from "@api/courses"
import { Select } from "@primitives"

export default function ProtectedPage({ user, data }) {
  const { tutors, courses } = data

  return (
    <UserUIContainer headerBorder>
      <main tw="max-w-screen-lg mx-auto px-3">
        <div tw="w-full flex justify-between py-6 border-b my-5">
          <h1 className="h2">Tutors</h1>
          <span tw="px-4 rounded-full bg-neutral-1">{tutors.length}</span>
        </div>
        {/* <div>Protected content for {user?.email}</div> */}
        <ol tw="list-inside list-decimal mb-20 grid gap-2 lg:(grid-cols-2 px-0)">
          {tutors.map((tutor, idx) => (
            <li key={idx} tw="rounded bg-neutral-1 p-2">
              <h2 tw="inline">{tutor.name}</h2>
              <div tw="mt-3">
                <div tw="sm:(mx-4) py-3">
                  <div tw="space-y-5 ">
                    <div tw="flex flex-col space-x-5 items-start sm:(flex-row items-center)">
                      <p>courses:</p>
                      <select tw="rounded ring-0 border-0">
                        {tutor.courses.map((course) => (
                          <option key={course}>{course}</option>
                        ))}
                      </select>
                    </div>
                    <div tw="flex flex-col space-x-5 items-start sm:(flex-row items-center)">
                      <p>hours ({tutor.totalHours}):</p>
                      <select tw="rounded ring-0 border-0">
                        {Object.entries(tutor.times).map(([day, times]) => (
                          <optgroup key={day} label={day}>
                            {times.map((time, idx) => (
                              <option key={idx} tw="lowercase">
                                {format(new Date(time[0]), "p")}
                                {" - "}
                                {format(new Date(time[1]), "p")}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                    </div>
                    <div tw="flex space-x-6 items-center ">
                      <p>Online</p>
                      <BsFillCircleFill
                        css={[
                          tw`w-5`,
                          tutor.online ? tw`text-green-700` : tw`text-red-600`,
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </main>
    </UserUIContainer>
  )
}


export async function getStaticProps({ params }) {

  const t = await getTutors()
  const c = await getCourses()
  const data = { tutors: t, courses: c }

  return { props: { data }, revalidate: 60 }
}