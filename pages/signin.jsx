import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import tw, { css } from "twin.macro"
import MarketingContainer from "@layouts/MarketingContainer"
import { LoadingCircle, Input, StyledLink, Button } from "@components"

import { eduRegex } from "@utils/regex"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required!")
    .min(6, "Please enter a valid email.")
    .max(75, "Please enter a valid email.")
    .matches(eduRegex, "Invalid or unsupported school email."),
})

export default function SignIn() {
  const [loading, setLoading] = useState(false)
  const [signinError, setSigninError] = useState("")
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  })

  const onSubmit = async ({ email }) => {
    setLoading(true)
    router.replace("/")
    setLoading(false)
  }

  useEffect(() => {
    return () => setLoading(false)
  }, [])

  return (
    <MarketingContainer title="Sign in" footer noHeaderNav>
      <main
        tw="min-h-screen max-w-screen-sm w-full 
          mx-auto px-4 pb-28 md:(px-8) flex 
          flex-col items-center justify-center"
      >
        <h1 tw="text-4xl sm:(text-5xl) text-center pt-10 pb-0 m-3 relative">Sign in</h1>

        <form
          tw="space-y-5 text-left
              px-2 sm:px-16
              pt-5 pb-16 
              w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <small tw="text-red-700">{signinError}</small>
          <div>
            <Input
              type="email"
              tw="border border-neutral-4 placeholder-neutral-4"
              placeholder="concord email address"
              aria-label="concord email address"
              autoComplete="email"
              autoCapitalize="none"
              maxLength="75"
              {...register("email")}
              error={errors?.email ? true : false}
              noLabel
              autoFocus
              required
            />
            <small tw="text-red-700">{errors?.email?.message}</small>
          </div>
          <Button
            type="submit"
            tw="flex items-center justify-center"
            disabled={loading ? true : false}
            isLarge
          >
            {loading ? <LoadingCircle /> : "Sign in"}
          </Button>
          <div tw="flex flex-col items-center justify-center">
            Don't have an account?
            <Link href="/signup" passHref>
              <StyledLink arrow="right" variant="blue" underline>
                Sign Up
              </StyledLink>
            </Link>
          </div>
        </form>
      </main>
    </MarketingContainer>
  )
}

SignIn.theme = "light"
