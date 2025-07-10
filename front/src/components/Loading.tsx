export function Loading() {
  return(
    <>
      <div
        className="absolute z-50 top-1/2 inset-x-0 text-center">
          <span className="loading loading-ring loading-xs text-info"></span>
          <span className="loading loading-ring loading-sm text-info"></span>
          <span className="loading loading-ring loading-md text-info"></span>
          <span className="loading loading-ring loading-lg text-info"></span>
          <span className="loading loading-ring loading-xl text-info"></span>
      </div>
    </>
  )
}