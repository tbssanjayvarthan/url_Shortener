function Alert({ type, message, onClose }) {
  try {
    React.useEffect(() => {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }, []);

    const bgColor = type === 'success' ? 'bg-green-50' : 'bg-red-50';
    const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
    const iconName = type === 'success' ? 'check-circle' : 'alert-circle';

    return (
      <div className={`fixed top-4 right-4 ${bgColor} ${textColor} px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50`} data-name="alert" data-file="components/Alert.js">
        <div className={`icon-${iconName} text-xl`}></div>
        <span>{message}</span>
        <button onClick={onClose} className="ml-4">
          <div className="icon-x text-lg"></div>
        </button>
      </div>
    );
  } catch (error) {
    console.error('Alert component error:', error);
    return null;
  }
}