export function Button({ ...rest }) {
  return (
    <button
      className="bg-white text-zinc-900 bg-opacity-20 hover:bg-opacity-30 rounded px-3 py-1 text-sm transition-colors hover:cursor-pointer hover:bg-stone-200"
      title="Zoom Out"
      {...rest}
    />
  )
}