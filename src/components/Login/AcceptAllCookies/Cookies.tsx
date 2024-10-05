import React, { useState } from "react";
import ReactDOM from "react-dom";
import { header } from "./CookieContents";
import { setCookie } from "typescript-cookie";
import SwitchToggle from "../../SwitchToggle";
import arrowDown from "../../../assets/LoginImg/BackArrow.svg";
type CookieConsentModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Cookie: React.FC<CookieConsentModalProps> = ({ isOpen, onClose }) => {
  const [contentOpen, setContentOpen] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const shouldEnable = true;
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const toggleAccordion = async (index: number): Promise<any> => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      {/* Semi-transparent background overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-10 z-40"></div>

      {/* Cookie modal */}
      <div className="fixed bottom-0 inset-x-0 bg-white text-zinc-500  py-4 px-10 z-50">
        <div className="mx-auto flex justify-between items-center">
          <div className="text-sm">
            <h3 className="text-lg font-semibold mb-2">Privacy Settings</h3>
            <p>
              This website uses cookies in order to offer you the most relevant
              information. Please accept cookies for optimal performance.
              Privacy Policy
            </p>
          </div>
          <div className={`flex space-x-4 `}>
            <button
              className={`text-[#45D2F5] px-4 py-2 rounded-lg font-semibold flex ${
                !buttonDisable ? "pointer-events-none opacity-60" : ""
              }`}
              onClick={() => {
                setContentOpen(!contentOpen);
              }}
              data-testid="customize-Cookies-button"
            >
              Customize Cookies
              <img
                src={arrowDown}
                alt=""
                className={`h-[1rem] w-[1rem]  mx-1 mt-1 ${
                  contentOpen && buttonDisable ? "rotate-90" : "-rotate-90"
                }`}
              />
            </button>
            <button
              className=" text-[#45D2F5] px-4 py-2 rounded-lg font-semibold"
              onClick={() => {
                onClose();
              }}
              data-testid="Reject-Cookies-button"
            >
              Reject All
            </button>
            <button
              className={`bg-[#45D2F5] text-white px-4 py-2 rounded-lg ${
                !buttonDisable ? "pointer-events-none opacity-60" : ""
              }`}
              onClick={() => {
                setCookie("cookieYesConsent", true);
                onClose();
              }}
              data-testid="Accept-Cookies-button"
            >
              Accept All
            </button>
          </div>
        </div>
        <div className="flex justify-between my-4">
          <div className="toggle font-['lato']  flex ">
            <h1 className="text-lg font-semibold mr-4">Necessary</h1>
            <SwitchToggle
              isEnable={shouldEnable}
              buttonDisable={buttonDisable}
              setButtonDisable={setButtonDisable}
            />
          </div>
          <button
            className={`text-[#45D2F5] px-2 py-2 rounded-lg font-semibold  ${
              !buttonDisable ? "pointer-events-none opacity-60" : ""
            }`}
            onClick={() => {
              setCookie("cookieYesConsent", true);
              onClose();
            }}
            data-testid="Reject-Cookies-button"
          >
            Save My Preference
          </button>
        </div>
        {contentOpen && buttonDisable && (
          <div className="my-4 font-['lato'] text-zinc-500">
            <h1 className="text-lg font-semibold mb-2">
              Customize Consent Preferences
            </h1>
            {!showMore && (
              <div className="less">
                We use cookies to help you navigate efficiently and perform
                certain functions. You will find detailed information about all
                cookies under each consent category below. The cookies that are
                categorized as Necessary are stored on your browser as they are
                essential for enabling the basic functionalities of the site.
                ...
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="text-[#45D2F5] text-sm font-semibold"
                >
                  Show more
                </button>
              </div>
            )}
            {showMore && (
              <div className="more">
                <p>
                  We use cookies to help you navigate efficiently and perform
                  certain functions. You will find detailed information about
                  all cookies under each consent category below. The cookies
                  that are categorized as Necessary are stored on your browser
                  as they are essential for enabling the basic functionalities
                  of the site. We also use third-party cookies that help us
                  analyze how you use this website, store your preferences, and
                  provide the content and advertisements that are relevant to
                  you. These cookies will only be stored in your browser with
                  your prior consent. You can choose to enable or disable some
                  or all of these cookies but disabling some of them may affect
                  your browsing experience.
                </p>
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="text-[#45D2F5] text-sm font-semibold"
                >
                  Show less
                </button>
              </div>
            )}

            <div className="my-3 h-[23rem] overflow-y-auto">
              {header?.map(({ name, content }, index) => (
                <div key={index} className="py-2">
                  <div className="flex items-center justify-start">
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="mr-4"
                    >
                      <img
                        src={arrowDown}
                        alt="toggle arrow"
                        className={`w-4 h-4 ${
                          openAccordion === index ? "-rotate-90" : "rotate-180"
                        }`}
                      />
                    </button>
                    <h3 className="text-lg my-2 font-semibold">{name}</h3>
                  </div>

                  <div className="text-sm text-gray-600 mt-2 pl-8">
                    {content}
                  </div>

                  {/* Expanded Content (visible only when accordion is open) */}
                  {openAccordion === index && (
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg ml-8">
                      <p>No cookies to display.</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>,
    document.body
  );
};
export default Cookie;
