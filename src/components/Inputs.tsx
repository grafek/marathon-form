import { useEffect, useRef, useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelName: string;
  error: string;
}

export const TextInput: React.FC<InputProps> = ({
  name,
  labelName,
  error,
  ...props
}) => {
  return (
    <div className="flex w-full flex-1 flex-col items-start gap-2 md:min-w-[307px]">
      <label htmlFor={name} className="h-4 text-[16px] leading-[20px]">
        {labelName}
      </label>
      <input
        id={name}
        name={name}
        className={`w-full rounded-lg border-2 bg-[#FAF9FA] px-3 py-[10px] transition-colors duration-300 hover:bg-[#EEDFFF] focus:border-[#761BE4] focus:bg-[#FAF9FA] focus:outline-none ${
          error ? "border-[#ED4545] bg-[#F8D3D3]" : "border-transparent"
        }`}
        {...props}
      />
      {error ? (
        <div className="flex items-center gap-2 whitespace-pre-line text-[14px] leading-5">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 0C6.41775 0 4.87104 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346629 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0ZM7.00667 4C7.00667 3.73478 7.11203 3.48043 7.29956 3.29289C7.4871 3.10536 7.74145 3 8.00667 3C8.27189 3 8.52624 3.10536 8.71378 3.29289C8.90131 3.48043 9.00667 3.73478 9.00667 4V8.59333C9.00667 8.72465 8.9808 8.85469 8.93055 8.97602C8.8803 9.09734 8.80664 9.20758 8.71378 9.30044C8.62092 9.3933 8.51068 9.46696 8.38935 9.51721C8.26803 9.56747 8.13799 9.59333 8.00667 9.59333C7.87535 9.59333 7.74531 9.56747 7.62399 9.51721C7.50266 9.46696 7.39242 9.3933 7.29956 9.30044C7.2067 9.20758 7.13305 9.09734 7.08279 8.97602C7.03254 8.85469 7.00667 8.72465 7.00667 8.59333V4ZM8 13C7.77321 13 7.55152 12.9327 7.36295 12.8068C7.17438 12.6808 7.02741 12.5017 6.94062 12.2921C6.85383 12.0826 6.83113 11.8521 6.87537 11.6296C6.91961 11.4072 7.02882 11.2029 7.18919 11.0425C7.34955 10.8822 7.55387 10.7729 7.7763 10.7287C7.99873 10.6845 8.22929 10.7072 8.43881 10.794C8.64834 10.8807 8.82743 11.0277 8.95342 11.2163C9.07942 11.4048 9.14667 11.6265 9.14667 11.8533C9.14667 12.1574 9.02586 12.4491 8.81082 12.6641C8.59578 12.8792 8.30412 13 8 13Z"
              fill="#ED4545"
            />
          </svg>
          {error}
        </div>
      ) : null}
    </div>
  );
};

interface RangeInputProps extends InputProps {
  onRangeChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RangeInput: React.FC<RangeInputProps> = ({
  name,
  labelName,
  onRangeChanged,
  error,
  ...props
}) => {
  const [range, setRange] = useState(0);
  const [step, setStep] = useState(0);

  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const rangeLinePadding = 16;

    if (!ref.current) return;

    const calcStep =
      (ref.current.offsetWidth - rangeLinePadding) / Number(ref.current.max);
    setStep(calcStep);
  }, []);

  return (
    <div className="relative flex w-full flex-col gap-2">
      <label htmlFor={name} className="font h-4 text-[16px] leading-[20px]">
        {labelName}
      </label>
      <div className="mx-[2px] flex justify-between text-[12px]">
        <span>{props.min}</span>
        <span>{props.max}</span>
      </div>
      <input
        ref={ref}
        onChange={(e) => {
          onRangeChanged(e);
          setRange(Number(e.target.value));
        }}
        id={name}
        name={name}
        type="range"
        className={`h-1 w-full cursor-pointer appearance-none rounded-md bg-[#FAF9FA] accent-[#761BE4]`}
        {...props}
      ></input>
      <span
        style={{
          transform: `translateX(${range * step}px)`,
        }}
        className="relative -bottom-2 -left-[11px] flex h-[25px] w-[37px] justify-center rounded border border-[#761BE4] bg-[#FAF9FA] text-[#761BE4]"
      >
        <span className="triangle absolute -top-2 z-20 h-2 w-2 bg-[#761BE4]">
          <span className="triangle absolute left-[1px] top-[2px] z-30 h-[6px] w-[6px] bg-[#FAF9FA]" />
        </span>
        {range}
      </span>
      {error ? (
        <div className="flex items-center gap-2 whitespace-pre-line text-[14px]">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 0C6.41775 0 4.87104 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346629 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0ZM7.00667 4C7.00667 3.73478 7.11203 3.48043 7.29956 3.29289C7.4871 3.10536 7.74145 3 8.00667 3C8.27189 3 8.52624 3.10536 8.71378 3.29289C8.90131 3.48043 9.00667 3.73478 9.00667 4V8.59333C9.00667 8.72465 8.9808 8.85469 8.93055 8.97602C8.8803 9.09734 8.80664 9.20758 8.71378 9.30044C8.62092 9.3933 8.51068 9.46696 8.38935 9.51721C8.26803 9.56747 8.13799 9.59333 8.00667 9.59333C7.87535 9.59333 7.74531 9.56747 7.62399 9.51721C7.50266 9.46696 7.39242 9.3933 7.29956 9.30044C7.2067 9.20758 7.13305 9.09734 7.08279 8.97602C7.03254 8.85469 7.00667 8.72465 7.00667 8.59333V4ZM8 13C7.77321 13 7.55152 12.9327 7.36295 12.8068C7.17438 12.6808 7.02741 12.5017 6.94062 12.2921C6.85383 12.0826 6.83113 11.8521 6.87537 11.6296C6.91961 11.4072 7.02882 11.2029 7.18919 11.0425C7.34955 10.8822 7.55387 10.7729 7.7763 10.7287C7.99873 10.6845 8.22929 10.7072 8.43881 10.794C8.64834 10.8807 8.82743 11.0277 8.95342 11.2163C9.07942 11.4048 9.14667 11.6265 9.14667 11.8533C9.14667 12.1574 9.02586 12.4491 8.81082 12.6641C8.59578 12.8792 8.30412 13 8 13Z"
              fill="#ED4545"
            />
          </svg>
          {error}
        </div>
      ) : null}
    </div>
  );
};

interface FileInputProps extends InputProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement> | undefined) => void;
  onFileRemove: () => void;
}

export const FileInput: React.FC<FileInputProps> = ({
  labelName,
  name,
  onFileChange,
  onFileRemove,
  error,
}) => {
  const pictureRef = useRef<HTMLInputElement | null>(null);

  const [photoName, setPhotoName] = useState<string | undefined>();
  const [isDragging, setIsDragging] = useState(false);

  const handleOnChangePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return null;
    const file = e.target.files[0];

    onFileChange(e);
    setPhotoName(file.name);
  };

  const handleOnClickPicture = () => {
    if (pictureRef.current) {
      pictureRef.current.click();
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    const files = event.dataTransfer.files;

    if (files.length === 1) {
      setPhotoName(files[0].name);
    }
  };

  return (
    <div className="relative flex w-full flex-col gap-2">
      <label htmlFor={name} className="h-4 text-[16px] leading-[20px]">
        {labelName}
      </label>
      <button
        type="button"
        onClick={handleOnClickPicture}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`z-50 rounded-[8px] border-2 py-10 transition-colors duration-300 hover:bg-[#EEDFFF] ${
          isDragging
            ? "border-4 border-dashed border-[#d5b6f8] bg-[#EEDFFF]"
            : ""
        } ${
          error
            ? "border-[#ED4545] bg-[#F8D3D3]"
            : "border-transparent bg-[#FAF9FA]"
        }`}
      >
        <div className="flex items-center justify-center">
          {photoName ? (
            <span className="flex items-center gap-[18px]">
              {photoName}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setPhotoName(undefined);
                  onFileRemove();
                }}
                className="z-20 [&>svg]:fill-[#000853] [&>svg]:hover:fill-[#ED4545]"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-colors duration-300"
                >
                  <path d="M10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0ZM7.879 6.464C7.69946 6.28275 7.45743 6.17697 7.20245 6.16832C6.94748 6.15967 6.69883 6.2488 6.50742 6.41747C6.31601 6.58613 6.1963 6.82159 6.1728 7.07562C6.14929 7.32966 6.22378 7.58308 6.381 7.784L6.465 7.879L8.585 9.999L6.465 12.121C6.28375 12.3005 6.17797 12.5426 6.16932 12.7975C6.16067 13.0525 6.2498 13.3012 6.41847 13.4926C6.58713 13.684 6.82258 13.8037 7.07662 13.8272C7.33066 13.8507 7.58408 13.7762 7.785 13.619L7.879 13.536L10 11.414L12.121 13.536C12.3005 13.7173 12.5426 13.823 12.7975 13.8317C13.0525 13.8403 13.3012 13.7512 13.4926 13.5825C13.684 13.4139 13.8037 13.1784 13.8272 12.9244C13.8507 12.6703 13.7762 12.4169 13.619 12.216L13.536 12.121L11.414 10L13.536 7.879C13.7173 7.69946 13.823 7.45743 13.8317 7.20245C13.8403 6.94748 13.7512 6.69883 13.5825 6.50742C13.4139 6.31601 13.1784 6.1963 12.9244 6.1728C12.6703 6.14929 12.4169 6.22378 12.216 6.381L12.121 6.464L10 8.586L7.879 6.464Z" />
                </svg>
              </span>
            </span>
          ) : (
            <>
              <span className="text-[#761BE4] underline decoration-[#761BE4]">
                Upload a file
              </span>
              <span className="ml-1 hidden text-[#898DA9] md:inline">
                or drag and drop here
              </span>
            </>
          )}
          <input
            type="file"
            name={name}
            id={name}
            onChange={handleOnChangePicture}
            ref={(e) => {
              pictureRef.current = e;
            }}
            className="hidden"
          />
        </div>
      </button>
      {error ? (
        <div className="flex items-center gap-2 whitespace-pre-line text-[14px]">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 0C6.41775 0 4.87104 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346629 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0ZM7.00667 4C7.00667 3.73478 7.11203 3.48043 7.29956 3.29289C7.4871 3.10536 7.74145 3 8.00667 3C8.27189 3 8.52624 3.10536 8.71378 3.29289C8.90131 3.48043 9.00667 3.73478 9.00667 4V8.59333C9.00667 8.72465 8.9808 8.85469 8.93055 8.97602C8.8803 9.09734 8.80664 9.20758 8.71378 9.30044C8.62092 9.3933 8.51068 9.46696 8.38935 9.51721C8.26803 9.56747 8.13799 9.59333 8.00667 9.59333C7.87535 9.59333 7.74531 9.56747 7.62399 9.51721C7.50266 9.46696 7.39242 9.3933 7.29956 9.30044C7.2067 9.20758 7.13305 9.09734 7.08279 8.97602C7.03254 8.85469 7.00667 8.72465 7.00667 8.59333V4ZM8 13C7.77321 13 7.55152 12.9327 7.36295 12.8068C7.17438 12.6808 7.02741 12.5017 6.94062 12.2921C6.85383 12.0826 6.83113 11.8521 6.87537 11.6296C6.91961 11.4072 7.02882 11.2029 7.18919 11.0425C7.34955 10.8822 7.55387 10.7729 7.7763 10.7287C7.99873 10.6845 8.22929 10.7072 8.43881 10.794C8.64834 10.8807 8.82743 11.0277 8.95342 11.2163C9.07942 11.4048 9.14667 11.6265 9.14667 11.8533C9.14667 12.1574 9.02586 12.4491 8.81082 12.6641C8.59578 12.8792 8.30412 13 8 13Z"
              fill="#ED4545"
            />
          </svg>
          {error}
        </div>
      ) : null}
    </div>
  );
};

export interface RadioInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  labelName: string;
  options: string[];
  onRadioChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RadioInput: React.FC<RadioInputProps> = ({
  name,
  labelName,
  options,
  onRadioChanged,
}) => {
  const [value, setValue] = useState(options[0]);

  return (
    <div className="relative flex w-full flex-col gap-4">
      <label htmlFor={name} className="mb-1 h-4 text-[16px] leading-[20px]">
        {labelName}
      </label>
      {options.map((option, index) => (
        <div className="flex items-start gap-2" key={index}>
          <input
            onChange={(e) => {
              onRadioChanged(e);
              setValue(e.target.value);
            }}
            id={option}
            value={option}
            name={name}
            checked={value === option}
            type="radio"
            className={`h-5 w-5 cursor-pointer rounded-full border bg-[#FAF9FA] checked:accent-[#761BE4] hover:border-[#761BE4]  ${
              value === option ? "" : "hover:appearance-none hover:bg-[#EEDFFF]"
            }`}
          />
          <label htmlFor={name} className="text-[16px] leading-[20px]">
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};
