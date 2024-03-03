export default defineAppConfig({
  ui: {
    container: {
      constrained: "max-w-7xl",
    },
    primary: "blue",
    gray: "slate",
    input: {
      padding: {
        "2xs": "px-2 py-1",
        xs: "px-2.5 py-1.5",
        sm: "px-2.5 py-1.5",
        md: "px-3 py-2",
        lg: "px-3.5 py-3.5",
        xl: "px-3.5 py-4",
      },
      size: {
        "2xs": "text-xs",
        xs: "text-xs",
        sm: "text-sm",
        md: "text-sm",
        lg: "text-sm",
        xl: "text-xl",
      },
    },
    inputMenu: {
      option: {
        size: "text-base",
      },
    },
    select: {
      padding: {
        "2xs": "px-2 py-1",
        xs: "px-2.5 py-1.5",
        sm: "px-2.5 py-1.5",
        md: "px-3 py-2",
        lg: "px-3.5 py-2.5",
        xl: "px-3.5 py-4",
      },
      size: {
        "2xs": "text-xs",
        xs: "text-xs",
        sm: "text-sm",
        md: "text-sm",
        lg: "text-sm",
        xl: "text-xl",
      },
    },
    modal: {
      wrapper: "relative z-50",
      inner: "fixed inset-0 overflow-y-auto",
      container:
        "flex min-h-full items-end sm:items-center justify-center text-center",
      padding: "p-4 sm:p-0",
      margin: "sm:my-8",
      base: "relative text-left rtl:text-right overflow-hidden flex flex-col",
      overlay: {
        base: "fixed inset-0 transition-opacity",
        background: "bg-gray-200/75 dark:bg-gray-800/75",
        transition: {
          enter: "ease-out duration-300",
          enterFrom: "opacity-0",
          enterTo: "opacity-100",
          leave: "ease-in duration-200",
          leaveFrom: "opacity-100",
          leaveTo: "opacity-0",
        },
      },
      background: "bg-white dark:bg-gray-900",
      ring: "",
      rounded: "rounded-lg",
      shadow: "shadow-xl",
      width: "w-full sm:max-w-3xl",
      height: "",
      fullscreen: "w-screen h-screen",
      transition: {
        enter: "ease-out duration-300",
        enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
        enterTo: "opacity-100 translate-y-0 sm:scale-100",
        leave: "ease-in duration-200",
        leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
        leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
      },
    },
  },
});
