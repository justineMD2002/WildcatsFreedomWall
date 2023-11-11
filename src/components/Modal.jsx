import React, { useState } from 'react';

function Modal({ onAccept, onDecline }) {
  const [isModalVisible, setModalVisible] = useState(true);

  const handleAccept = () => {
    setModalVisible(!isModalVisible);
    // Call the onAccept callback
    onAccept();
  };

  const handleDecline = () => {
    setModalVisible(!isModalVisible);
    // Call the onDecline callback
    onDecline();
  };

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <div className="flex justify-end">
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700"
            onClick={onDecline}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div className="mt-4">
          {/* Your modal content here */}
          <h1>Wildcats Freedom Wall Terms and Conditions:</h1>
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            1. Anonymous Posting: Users will remain anonymous on the Freedom Wall, identified solely by their public key generated through blockchain technology.
            2, Content Responsibility: Users are solely responsible for the content they post. The university assumes no liability for the nature or consequences of the shared content.
            3. Decentralized Moderation: The Freedom Wall operates on a decentralized blockchain backend, minimizing direct university intervention. Users are encouraged to report inappropriate content, and the community will collectively participate in moderation through blockchain consensus.
            4. Freedom of Expression: The platform is a space for free expression. Users may share opinions, thoughts, or concerns, but must refrain from engaging in illegal activities, hate speech, or any form of harassment.
            5. Security: Users are responsible for securing their private keys. The university will not be held liable for unauthorized access to accounts due to compromised keys.
            6. No Endorsement: Content on the Freedom Wall does not represent the views or endorsements of the university. It is a platform for individual expression.
            7. Blockchain Immutability: Once posted, content on the Freedom Wall is immutable due to blockchain technology. Users are advised to consider the permanence of their contributions.
            8. Privacy: Respect the privacy of others. Posting personal information without consent is strictly prohibited.
          </p>
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            By accessing the University Freedom Wall, users agree to abide by these terms and conditions. The university reserves the right to update these terms as necessary.
          </p>
        </div>
        <div className="mt-6 flex justify-between"> {/* Change to justify-between */}
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleAccept}
          >
            I accept
          </button>
          <button
            type="button"
            className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            onClick={handleDecline}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
