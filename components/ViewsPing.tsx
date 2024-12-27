const ViewsPing = () => {
  return (
    <div className="relative">
      <div className="absolute -left-4 top-1">
        <span className="flex size-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red opacity-75"></span>
          <span className="relative inline-flex size-3 bg-red rounded-full"></span>
        </span>
      </div>
    </div>
  )
}

export default ViewsPing