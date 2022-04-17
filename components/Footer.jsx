import { Fragment, useState, useEffect } from "react"
import tw, { screen, css } from "twin.macro"
import Link from "next/link"
import { ExternalLink, ThemeChanger, Logo } from "@components"
import { Disclosure } from "@primitives"
import SEO from "next-seo.config"

const NavGroup = ({ heading, children }) => {
  return (
    <Fragment>
      <div tw="hidden md:(block)">
        <span tw="w-full inline-block mt-3">
          <h3 tw="font-sans font-semibold pb-3">{heading}</h3>
        </span>
        {children}
      </div>
      <div tw="border-b border-neutral-5  md:(hidden)">
        <Disclosure
          items={[
            {
              heading: heading,
              content: children,
            },
          ]}
          xIcon
          noBorder
        />
      </div>
    </Fragment>
  )
}

export default function Footer({ nav = false }) {
  return (
    <footer tw="relative w-full text-sm bottom-0 bg-neutral-1 text-neutral-5 px-4 py-8">
      <div tw="w-full max-w-screen-lg mx-auto">
        {nav && (
          <nav
            tw="mx-auto flex flex-nowrap flex-col md:flex-row
            justify-between w-full mb-10"
            role="navigation"
            aria-label="website Directory"
          >
            <NavGroup heading="Resources">
              <div tw="flex flex-col space-y-4">
                <Link href="/#" prefetch={false}>
                  <a>Uses</a>
                </Link>
                <Link href="/#" prefetch={false}>
                  <a>Guestbook</a>
                </Link>
                <Link href="/#" prefetch={false}>
                  <a>Snippets</a>
                </Link>
                <Link href="/#" prefetch={false}>
                  <a>Tweets</a>
                </Link>
              </div>
            </NavGroup>
            <NavGroup heading="Company">
              <div tw="flex flex-col space-y-4">
                <Link href="/#" prefetch={false}>
                  <a>Uses</a>
                </Link>
                <Link href="/#" prefetch={false}>
                  <a>Guestbook</a>
                </Link>
                <Link href="/#" prefetch={false}>
                  <a>Snippets</a>
                </Link>
                <Link href="/#" prefetch={false}>
                  <a>Tweets</a>
                </Link>
              </div>
            </NavGroup>
            <NavGroup heading="Legal">
              <div tw="flex flex-col space-y-4">
                <Link href="/#" prefetch={false}>
                  <a>Uses</a>
                </Link>
                <Link href="/#" prefetch={false}>
                  <a>Guestbook</a>
                </Link>
                <Link href="/#" prefetch={false}>
                  <a>Snippets</a>
                </Link>
                <Link href="/#" prefetch={false}>
                  <a>Tweets</a>
                </Link>
              </div>
            </NavGroup>
            <NavGroup heading="Services">
              <div tw="flex flex-col space-y-4">
                <Link href="/#" prefetch={false}>
                  <a>Uses</a>
                </Link>
                <Link href="/#" prefetch={false}>
                  <a>Guestbook</a>
                </Link>
                <Link href="/#" prefetch={false}>
                  <a>Snippets</a>
                </Link>
                <Link href="/#" prefetch={false}>
                  <a>Tweets</a>
                </Link>
              </div>
            </NavGroup>
          </nav>
        )}

        <div
          css={[
            tw`w-full flex flex-col-reverse items-center pt-5
            space-y-2 md:(flex-row justify-between)`,
            nav && tw`md:(border-t border-neutral-4)`,
          ]}
        >
          <div tw="flex items-center space-x-2.5 mt-5 md:(mt-0)">
            <Logo width="55" height="55" />
            <span>
              &copy; {new Date().getFullYear()} {SEO.defaultTitle}.
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
