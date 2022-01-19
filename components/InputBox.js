const InputBox = ({ imageSrc, setImageSrc }) => {
  return (
    <div className="text-center h-24">
      <p>Drag and drop image inside the box, or enter image url: </p>
      <div className="inline-flex mt-4">
        <input
          className="w-72 h-8  md:w-[22rem] border-[1px] border-sky-700 mb-5 dark:bg-gray-800"
          type="text"
          placeholder="www.example.com"
          onChange={(e) => setImageSrc(e.target.value)}
          value={imageSrc}
        />
        <button
          onClick={(e) => setImageSrc("")}
          className="bg-sky-200 cursor-pointer shadow-md h-8 px-3 text-black"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default InputBox;
