export const label = {
  position: '-top-[6px]',
  placeholderSize: 'peer-placeholder-shown:text-sm',

  fontSize: 'text-[11px] peer-focus:text-[11px]',

  after: {
    content: "after:content[' ']",
    display: 'after:block',
    width: 'after:w-full',
    position: 'after:absolute',
    bottom: 'after:-bottom-0',
    left: 'left-0',
    borderWidth: 'after:border-b-[2px]',
    scale: 'after:scale-x-0 peer-focus:after:scale-x-100',

    transition: 'after:transition-transform after:duration-300',
  },
}
