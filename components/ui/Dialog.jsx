const Dialog = () => (
  <div className="fixed inset-0 w-full h-full flex align-center justify-center">
    <div className="w-200 bg-white rounded-xl">
      <div className="flex-1">{children}</div>
    </div>
  </div>
);

export default Dialog;
