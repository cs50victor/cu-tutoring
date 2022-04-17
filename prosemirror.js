const x = `
// tip tap
  .ProseMirror {
    ${tw`appearance-none outline-none ring-0 border-0 min-h-[80px]`}
    > * + * {
      margin-top: 0.7em;
    }
    pre {
      background: #0d0d0d;
      color: #fff;
      font-family: "JetBrainsMono", monospace;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      code {
        color: inherit;
        padding: 0;
        background: none;
        font-size: 0.8rem;
      }
      .hljs-comment,
      .hljs-quote {
        color: #616161;
      }
      .hljs-variable,
      .hljs-template-variable,
      .hljs-attribute,
      .hljs-tag,
      .hljs-name,
      .hljs-regexp,
      .hljs-link,
      .hljs-name,
      .hljs-selector-id,
      .hljs-selector-class {
        color: #f98181;
      }
      .hljs-number,
      .hljs-meta,
      .hljs-built_in,
      .hljs-builtin-name,
      .hljs-literal,
      .hljs-type,
      .hljs-params {
        color: #fbbc88;
      }
      .hljs-string,
      .hljs-symbol,
      .hljs-bullet {
        color: #b9f18d;
      }
      .hljs-title,
      .hljs-section {
        color: #faf594;
      }
      .hljs-keyword,
      .hljs-selector-tag {
        color: #70cff8;
      }
      .hljs-emphasis {
        font-style: italic;
      }
      .hljs-strong {
        font-weight: 700;
      }
    }
    ul,
    ol {
      padding: 0 1rem;
    }
  }
  .ProseMirror p.is-editor-empty:first-of-type::before {
    content: attr(data-placeholder);
    ${tw`float-left pointer-events-none h-0 text-neutral-4`}
  }

  .bubble-menu {
    ${tw`flex p-2 rounded-lg bg-neutral-9`}

    button {
      ${tw`opacity-60 border-0 bg-transparent py-1 px-2 rounded-md font-bold text-sm text-neutral-1`}
      font-size: 0.85rem;

      &:hover,
      &.is-active {
        ${tw`bg-neutral-5 opacity-100`}
      }
    }
  }
  .react-datepicker-popper {
    transform: none !important;
    position: relative !important;
  }
`
