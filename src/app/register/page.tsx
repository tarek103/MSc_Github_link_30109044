import SignupForm from "./_components/SignupForm";

const RegisterPage = () => {
  return (
    <div className="w-full flex-col h-screen flex items-center justify-center">
      <div className="container px-4">
        <div>
          <div className="flex justify-center items-center">
            <div className="w-full sm:w-80 bg-[#f5f5f5] px-6 py-8 rounded-md">
              <SignupForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
