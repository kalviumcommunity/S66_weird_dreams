/* eslint-disable react/prop-types */

const ModalContent = ({ modalContent, setModalContent }) => {
    return (
        <>
            {modalContent && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4'>
                    <div className='relative w-full max-w-2xl rounded-2xl border border-line bg-white p-6 shadow-xl'>
                        <h2 className='text-lg font-bold text-ink'>✦ AI Dream Analysis</h2>
                        <div className='custom-scrollbar mt-4 max-h-96 overflow-y-auto rounded-xl bg-slate-50 p-4 text-[15px] leading-relaxed text-slate-700'>
                            {modalContent.analysis}
                        </div>
                        <button
                            className='mt-4 rounded-lg bg-ink px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800'
                            onClick={() => setModalContent(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalContent;
