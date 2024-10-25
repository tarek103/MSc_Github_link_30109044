import LoginForms from "./_components/LoginForms";

const loginPage = () => {
  return (
    <div className="w-full flex-col h-screen flex items-center justify-center">
      <div className="container px-4">
        <div>
          <div className="flex justify-center items-center">
            <div className="w-full sm:w-80 bg-[#f5f5f5] px-6 py-8 rounded-md">
              <LoginForms />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default loginPage;
