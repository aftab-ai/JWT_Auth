// Import local modules.
import ListComponent from "../components/ListComponent";
import authenticationAndTokenStrategy from "../assets/docs/backend/features/authenticationAndTokenStrategy";
import advancedSessionAndTokenLifecycle from "../assets/docs/backend/features/advancedSessionAndTokenLifecycly";
import securityAndAttackPrevention from "../assets/docs/backend/features/securityAndAttackPrevention";
import authorizationAndValidation from "../assets/docs/backend/features/authorizationAndValidation";
import deviceAndSessionIntelligence from "../assets/docs/backend/features/deviceAndSessionIntelligence";
import backendArchitecture from "../assets/docs/backend/features/backendArchitecture";
import authenticationFlow from "../assets/docs/frontend/features/authenticationFlow";
import formHandlingAndValidation from "../assets/docs/frontend/features/formHandlingAndValidation";
import apiCommunication from "../assets/docs/frontend/features/apiCommunication";
import keyHighlights from "../assets/docs/keyHighlights";
import backendTechnologies from "../assets/docs/backend/technologies/backendTechnologies";
import frontendTechnologies from "../assets/docs/frontend/technologies/frontendTechnologies";

function Home() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full">
      {/* Title */}
      <div className="w-full max-w-3xl px-4 sm:px-6 py-4 sm:py-8 my-6 rounded-xl bg-[#D3D2C7]">
        <h1 className="font-bold text-3xl text-center text-[#10403B]">
          Full-Stack JWT Authentication System
        </h1>
      </div>

      {/* Content */}
      <div className="w-full max-w-3xl px-4 sm:px-6 py-4 sm:py-6 my-6 rounded-xl bg-[#D3D2C7]">
        <p className="p-4 font-bold rounded-2xl text-center text-[#3D503A] bg-[#B3C1A8] ">
          This is the template for using JWT for 'Authentication' and
          'Authorization'.
        </p>

        {/* Data */}
        <ol className="list-decimal list-outside mx-4 mt-8 space-y-6 font-bold text-xl text-[#10403B]">
          {/* Project Features */}
          <li>
            Project Features
            {/* Backend */}
            <ol className="list-[upper-roman] list-outside mx-4 mt-3 space-y-3 font-bold text-justify text-lg">
              <p className="w-full mt-2 underline text-center">Backend</p>

              {/* Authentication & Token Strategy */}
              <li>
                Authentication & Token Strategy:
                <ListComponent listItem={authenticationAndTokenStrategy} />
              </li>

              {/* Advanced Session & Token Lifecycle */}
              <li>
                Advanced Session & Token Lifecycle:
                <ListComponent listItem={advancedSessionAndTokenLifecycle} />
              </li>

              {/* Security & Attack Prevention */}
              <li>
                Security & Attack Prevention:
                <ListComponent listItem={securityAndAttackPrevention} />
              </li>

              {/* Authorization & Validation */}
              <li>
                Authorization & Validation:
                <ListComponent listItem={authorizationAndValidation} />
              </li>

              {/* Device & Session Intelligence */}
              <li>
                Device & Session Intelligence:
                <ListComponent listItem={deviceAndSessionIntelligence} />
              </li>

              {/* Backend Architecture */}
              <li>
                Backend Architecture:
                <ListComponent listItem={backendArchitecture} />
              </li>
            </ol>
            {/* Frontend */}
            <ol className="list-[upper-roman] list-outside mx-4 mt-3 space-y-3 font-bold text-justify text-lg">
              <p className="w-full mt-2 underline text-center">Frontend</p>

              {/* Authentication Flow */}
              <li>
                Authentication Flow:
                <ListComponent listItem={authenticationFlow} />
              </li>

              {/* Form Handling & Validation */}
              <li>
                Form Handling & Validation:
                <ListComponent listItem={formHandlingAndValidation} />
              </li>

              {/* API Communication */}
              <li>
                API Communication:
                <ListComponent listItem={apiCommunication} />
              </li>
            </ol>
          </li>

          {/* Key Highlights */}
          <li>
            Key Highlights:
            <ul className="list-disc list-outside ml-4 mt-2 space-y-2 text-sm text-justify text-[#3D503A]">
              {keyHighlights.map((item) => (
                <li key={item.id}>
                  <span className="font-medium">{item.value}</span>
                </li>
              ))}
            </ul>
          </li>

          {/* Technologies Used */}
          <li>
            Technologies Used:
            <ol className="list-[upper-roman] list-outside mx-4 mt-3 space-y-3 font-bold text-justify text-lg">
              {/* Backend Technologies */}
              <li>
                Backend Technologies:
                <ListComponent listItem={backendTechnologies} />
              </li>

              {/* Frontend Technologies */}
              <li>
                Frontend Technologies:
                <ListComponent listItem={frontendTechnologies} />
              </li>
            </ol>
          </li>
        </ol>
      </div>
    </div>
  );
}

export default Home;
