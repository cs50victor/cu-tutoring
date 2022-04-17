import { useEffect } from "react"
import GlobalStyles from "/baseCSS"
import { DefaultSeo } from "next-seo"
import { ThemeProvider } from "next-themes"
import SEO from "next-seo.config"
import { UserProvider } from "@supabase/supabase-auth-helpers/react"
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs"

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider
      defaultTheme="light"
      enableSystem={true}
      enableColorScheme={true}
      themes={["light", "dark"]}
      forcedTheme={Component.theme || null}
      disableTransitionOnChange
    >
      <DefaultSeo {...SEO} />
      <GlobalStyles />
      <UserProvider supabaseClient={supabaseClient}>
        <Component {...pageProps} />
      </UserProvider>
    </ThemeProvider>
  )
}
