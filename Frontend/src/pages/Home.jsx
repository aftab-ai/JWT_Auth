// Import local modules.
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
                <ul className="list-disc list-outside ml-4 mt-2 space-y-2 text-sm text-justify text-[#3D503A]">
                  {authenticationAndTokenStrategy.map((item) => (
                    <li key={item.id}>
                      <span className="text-[#10403B]">{item.key}</span>:{" "}
                      {Array.isArray(item.value) ? (
                        <ul className="list-[circle] list-outside ml-6 mt-1 space-y-1 font-medium">
                          {item.value.map((val, index) => (
                            <li key={index}>{val}</li>
                          ))}
                        </ul>
                      ) : (
                        <span className="font-medium">{item.value}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </li>

              {/* Advanced Session & Token Lifecycle */}
              <li>
                Advanced Session & Token Lifecycle:
                <ul className="list-disc list-outside ml-4 mt-2 space-y-2 text-sm text-justify text-[#3D503A]">
                  {advancedSessionAndTokenLifecycle.map((item) => (
                    <li key={item.id}>
                      <span className="text-[#10403B]">{item.key}</span>:{" "}
                      {Array.isArray(item.value) ? (
                        <ul className="list-[circle] list-outside ml-6 mt-1 space-y-1 font-medium">
                          {item.value.map((val, index) => (
                            <li key={index}>{val}</li>
                          ))}
                        </ul>
                      ) : (
                        <span className="font-medium">{item.value}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </li>

              {/* Security & Attack Prevention */}
              <li>
                Security & Attack Prevention:
                <ul className="list-disc list-outside ml-4 mt-2 space-y-2 text-sm text-justify text-[#3D503A]">
                  {securityAndAttackPrevention.map((item) => (
                    <li key={item.id}>
                      <span className="text-[#10403B]">{item.key}</span>:{" "}
                      {Array.isArray(item.value) ? (
                        <ul className="list-[circle] list-outside ml-6 mt-1 space-y-1 font-medium">
                          {item.value.map((val, index) => (
                            <li key={index}>{val}</li>
                          ))}
                        </ul>
                      ) : (
                        <span className="font-medium">{item.value}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </li>

              {/* Authorization & Validation */}
              <li>
                Authorization & Validation:
                <ul className="list-disc list-outside ml-4 mt-2 space-y-2 text-sm text-justify text-[#3D503A]">
                  {authorizationAndValidation.map((item) => (
                    <li key={item.id}>
                      <span className="text-[#10403B]">{item.key}</span>:{" "}
                      {Array.isArray(item.value) ? (
                        <ul className="list-[circle] list-outside ml-6 mt-1 space-y-1 font-medium">
                          {item.value.map((val, index) => (
                            <li key={index}>{val}</li>
                          ))}
                        </ul>
                      ) : (
                        <span className="font-medium">{item.value}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </li>

              {/* Device & Session Intelligence */}
              <li>
                Device & Session Intelligence:
                <ul className="list-disc list-outside ml-4 mt-2 space-y-2 text-sm text-justify text-[#3D503A]">
                  {deviceAndSessionIntelligence.map((item) => (
                    <li key={item.id}>
                      <span className="text-[#10403B]">{item.key}</span>:{" "}
                      {Array.isArray(item.value) ? (
                        <ul className="list-[circle] list-outside ml-6 mt-1 space-y-1 font-medium">
                          {item.value.map((val, index) => (
                            <li key={index}>{val}</li>
                          ))}
                        </ul>
                      ) : (
                        <span className="font-medium">{item.value}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </li>

              {/* Backend Architecture */}
              <li>
                Backend Architecture:
                <ul className="list-disc list-outside ml-4 mt-2 space-y-2 text-sm text-justify text-[#3D503A]">
                  {backendArchitecture.map((item) => (
                    <li key={item.id}>
                      <span className="text-[#10403B]">{item.key}</span>:{" "}
                      {Array.isArray(item.value) ? (
                        <ul className="list-[circle] list-outside ml-6 mt-1 space-y-1 font-medium">
                          {item.value.map((val, index) => (
                            <li key={index}>{val}</li>
                          ))}
                        </ul>
                      ) : (
                        <span className="font-medium">{item.value}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            </ol>
            {/* Frontend */}
            <ol className="list-[upper-roman] list-outside mx-4 mt-3 space-y-3 font-bold text-justify text-lg">
              <p className="w-full mt-2 underline text-center">Frontend</p>

              {/* Authentication Flow */}
              <li>
                Authentication Flow:
                <ul className="list-disc list-outside ml-4 mt-2 space-y-2 text-sm text-justify text-[#3D503A]">
                  {authenticationFlow.map((item) => (
                    <li key={item.id}>
                      <span className="text-[#10403B]">{item.key}</span>:{" "}
                      {Array.isArray(item.value) ? (
                        <ul className="list-[circle] list-outside ml-6 mt-1 space-y-1 font-medium">
                          {item.value.map((val, index) => (
                            <li key={index}>{val}</li>
                          ))}
                        </ul>
                      ) : (
                        <span className="font-medium">{item.value}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </li>

              {/* Form Handling & Validation */}
              <li>
                Form Handling & Validation:
                <ul className="list-disc list-outside ml-4 mt-2 space-y-2 text-sm text-justify text-[#3D503A]">
                  {formHandlingAndValidation.map((item) => (
                    <li key={item.id}>
                      <span className="text-[#10403B]">{item.key}</span>:{" "}
                      {Array.isArray(item.value) ? (
                        <ul className="list-[circle] list-outside ml-6 mt-1 space-y-1 font-medium">
                          {item.value.map((val, index) => (
                            <li key={index}>{val}</li>
                          ))}
                        </ul>
                      ) : (
                        <span className="font-medium">{item.value}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </li>

              {/* API Communication */}
              <li>
                API Communication:
                <ul className="list-disc list-outside ml-4 mt-2 space-y-2 text-sm text-justify text-[#3D503A]">
                  {apiCommunication.map((item) => (
                    <li key={item.id}>
                      <span className="text-[#10403B]">{item.key}</span>:{" "}
                      {Array.isArray(item.value) ? (
                        <ul className="list-[circle] list-outside ml-6 mt-1 space-y-1 font-medium">
                          {item.value.map((val, index) => (
                            <li key={index}>{val}</li>
                          ))}
                        </ul>
                      ) : (
                        <span className="font-medium">{item.value}</span>
                      )}
                    </li>
                  ))}
                </ul>
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
                <ul className="list-disc list-outside ml-4 mt-2 space-y-2 text-sm text-justify text-[#3D503A]">
                  {backendTechnologies.map((item) => (
                    <li key={item.id}>
                      <span className="text-[#10403B]">{item.key}</span>:{" "}
                      {Array.isArray(item.value) ? (
                        <ul className="list-[circle] list-outside ml-6 mt-1 space-y-1 font-medium">
                          {item.value.map((val, index) => (
                            <li key={index}>{val}</li>
                          ))}
                        </ul>
                      ) : (
                        <span className="font-medium">{item.value}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </li>

              {/* Frontend Technologies */}
              <li>
                Frontend Technologies:
                <ul className="list-disc list-outside ml-4 mt-2 space-y-2 text-sm text-justify text-[#3D503A]">
                  {frontendTechnologies.map((item) => (
                    <li key={item.id}>
                      <span className="text-[#10403B]">{item.key}</span>:{" "}
                      {Array.isArray(item.value) ? (
                        <ul className="list-[circle] list-outside ml-6 mt-1 space-y-1 font-medium">
                          {item.value.map((val, index) => (
                            <li key={index}>{val}</li>
                          ))}
                        </ul>
                      ) : (
                        <span className="font-medium">{item.value}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            </ol>
          </li>
        </ol>
      </div>
    </div>
  );
}

export default Home;
