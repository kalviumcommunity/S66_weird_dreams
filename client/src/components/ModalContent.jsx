/* eslint-disable react/prop-types */

const ModalContent = ({modalContent, setModalContent}) => {
    return (
        <div>
        {modalContent && (
            <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 bg-opacity-60 z-50">
            <div className="bg-purple-900 text-white p-6 rounded-xl shadow-2xl max-w-3xl w-11/12 relative">
                <h2 className="text-xl font-semibold text-white">
                🧠 AI Dream Analysis
                </h2>
                <div className="mt-4 max-h-96 overflow-y-auto p-2 bg-purple-700/50 rounded-lg text-gray-200  custom-scrollbar">
                {modalContent.analysis}
                </div>
                <button
                className="mt-4 px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition duration-200"
                onClick={() => setModalContent(null)}
                >
                Close
                </button>
            </div>
            </div>
        )}
        </div>
    );
};

export default ModalContent;
