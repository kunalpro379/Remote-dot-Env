import React, { useState } from "react";
import Verification from "./Verify.jsx";

const ParentComponent = () => {
    const [showVerification, setShowVerification] = useState(false);

    return (
        <div>
            <button onClick={() => setShowVerification(true)}>Show Verification</button>
            {showVerification && (
                <Verification setShowVerification={setShowVerification} usrname="exampleUsername" />
            )}
        </div>
    );
};

export default ParentComponent;
