const Loading = () => {
  return (
    <div className="absolute inset-0 backdrop-blur-xs gap-5 flex justify-center items-center z-50 animate-[pop-up_0.5s_ease-out_forwards]">
      <span className="ml-3 text-sm text-white">Loading...</span>
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
    </div>
  )
}

export default Loading