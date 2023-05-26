import { useState } from "react";
import {
  FileInput,
  RadioInput,
  RangeInput,
  TextInput,
} from "./components/Inputs";
import { validateEmail, validatePhoneNumber } from "./helpers";
import { Spinner } from "./components/Spinner";

interface IForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  photo: string | ArrayBuffer | null;
  age: number;
  level: "Beginner" | "Intermediate" | "Advanced";
}
interface IFormError {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  photo: string;
  age: string;
}

const initialState: IForm = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  photo: "",
  age: 0,
  level: "Beginner",
};

const initialErrorState: IFormError = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  photo: "",
  age: "",
};

// const URL = "http://marathon.pl/submit";

function App() {
  const [formState, setFormState] = useState(initialState);
  const [error, setError] = useState(initialErrorState);
  const [isLoading, setIsLoading] = useState(false);

  const newErrorState: IFormError = {
    firstName: !formState.firstName ? "First name is required" : "",
    lastName: !formState.lastName ? "Last name is required" : "",
    email: !formState.email
      ? "Email is required"
      : !validateEmail(formState.email)
      ? "Invalid email address"
      : "",
    photo: !formState.photo ? "Photo is required" : "",
    age: formState.age < 1 ? "Age cannot be less than 1" : "",
    phoneNumber: !formState.phoneNumber
      ? "Phone number is required"
      : !validatePhoneNumber(formState.phoneNumber)
      ? `Please use correct formatting. \n Example: +48 123 456 789`
      : "",
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    setError(newErrorState);

    if (Object.values(newErrorState).some((errorMsg) => errorMsg !== "")) {
      setIsLoading(false);
      return;
    }

    const formData = new FormData(e.currentTarget);

    for (const [name, value] of Object.entries(formState)) {
      formData.append(name, value);
    }

    // imitate awaiting for response with a sleep function

    await new Promise((res) => setTimeout(res, 1500));

    // hit API with a POST req

    // const response = await fetch(URL, {
    //   method: "POST",
    //   body: formData,
    // });
    // const result = await response.json();

    alert(JSON.stringify(formState));

    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormState((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handlePictureChange = async (
    e: React.ChangeEvent<HTMLInputElement> | undefined
  ) => {
    if (!e || !e.target.files) return null;

    setError((prev) => ({ ...prev, photo: "" }));
    const reader = new FileReader();

    reader.readAsText(e.target.files[0]);

    reader.onload = () => {
      setFormState((prevFormData) => ({
        ...prevFormData,
        photo: reader.result,
      }));
    };
    // decode in some api route
  };

  return (
    <div className="relative px-6 py-8 text-[#000853]">
      <h1 className="text-center text-[36px] leading-[44px]">
        Marathon Application Form
      </h1>
      <div className="h-12" />
      <form
        onSubmit={submitHandler}
        className="flex flex-col  items-center gap-6 md:mx-auto md:max-w-3xl md:rounded-2xl md:bg-[#ffffff26] md:p-12 md:pt-10 md:shadow-[inset_2px_2px_8px_rgba(255,255,255,0.25)]"
      >
        <div className="block w-full space-y-4 md:flex md:flex-wrap md:gap-6 md:space-y-0">
          <TextInput
            onChange={(e) => handleChange(e)}
            labelName="First Name"
            name="firstName"
            value={formState.firstName}
            onFocus={() => {
              setError((prev) => ({ ...prev, firstName: "" }));
            }}
            error={error.firstName}
          />
          <TextInput
            onChange={(e) => handleChange(e)}
            labelName="Last Name"
            name="lastName"
            value={formState.lastName}
            onFocus={() => {
              setError((prev) => ({ ...prev, lastName: "" }));
            }}
            error={error.lastName}
          />
          <TextInput
            onChange={(e) => handleChange(e)}
            labelName="Email Address"
            name="email"
            value={formState.email}
            onFocus={() => {
              setError((prev) => ({ ...prev, email: "" }));
            }}
            error={error.email}
          />
          <TextInput
            onChange={(e) => handleChange(e)}
            labelName="Phone Number"
            name="phoneNumber"
            value={formState.phoneNumber}
            onFocus={() => {
              setError((prev) => ({ ...prev, phoneNumber: "" }));
            }}
            error={error.phoneNumber}
          />
        </div>
        <FileInput
          labelName="Photo"
          onFileChange={(e) => handlePictureChange(e)}
          onFileRemove={() =>
            setFormState((prevFormData) => ({
              ...prevFormData,
              photo: null,
            }))
          }
          error={error.photo}
        />
        <RangeInput
          onRangeChanged={(e) => handleChange(e)}
          labelName="Age"
          name="age"
          min={0}
          max={100}
          onFocus={() => {
            setError((prev) => ({ ...prev, age: "" }));
          }}
          error={error.age}
          value={formState.age}
        />
        <RadioInput
          onRadioChanged={(e) => handleChange(e)}
          labelName="Level"
          name="level"
          options={["Beginner", "Intermediate", "Advanced"]}
          value={formState.level}
        />
        <button className="mt-14 flex w-full items-center justify-center gap-4 rounded-[4px] bg-[#761BE4] px-4 py-[10px] text-[18px] text-white transition-colors duration-300 hover:bg-[#6A19CD] md:ml-auto md:w-1/3">
          {isLoading ? "Sending..." : "  Send Application"}
          {isLoading ? <Spinner /> : null}
        </button>
      </form>
    </div>
  );
}

export default App;
