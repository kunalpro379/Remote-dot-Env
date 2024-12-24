import React from "react";

const SignupForms =()=>{
    return (
        <form onSubmit={handleSignup} className="grid grid-cols-1 gap-4">
        {/* Full Name */}
        <FormInput
            type="text"
            placeholder="Full Name"
            value={signupName}
            onChange={(e) => setSignupName(e.target.value)}
            icon="User"
            required
        />
                                <div className="grid grid-cols-1 gap-4">

        {/* Email */}
        <FormInput
            type="email"
            placeholder="Email"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
            icon="Mail"
            required
        />
        {/* Username */}
        <FormInput
            type="text"
            placeholder="Username"
            value={signupUsername}
            onChange={(e) => setSignupUsername(e.target.value)}
            icon="User"
            required
        /></div>
        <div className="grid grid-cols-1 gap-4">
            <div className="flex">
                <select 
                    value={countryCode} 
                    onChange={(e) => setCountryCode(e.target.value)} 
                    className="w-1/4 bg-black/50 border border-white/10 rounded-lg py-3 px-2 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    <option value="+1">+1</option>
                    <option value="+91">+91</option>
                    <option value="+44">+44</option>
                </select>
                <div className="w-5"></div>

                <input
                    type="text"
                    value={signupPhoneNumber}
                    onChange={(e) => setSignupPhoneNumber(e.target.value)}
                    className="w-3/4 bg-white/5 border border-white/10 rounded-lg py-3 px-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Phone Number"
                    required
                />
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <FormInput
                type="password"
                placeholder="Password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                icon="Lock"
                required
            />
            <FormInput
                type="password"
                placeholder="Confirm Password"
                value={signupConfirmPassword}
                onChange={(e) => setSignupConfirmPassword(e.target.value)}
                icon="Lock"
                required
            />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <FormInput
                type="text"
                placeholder="Bio"
                value={signupBio}
                onChange={(e) => setSignupBio(e.target.value)}
            />
            <FormInput
                type="text"
                placeholder="Profile Picture URL"
                value={signupProfilePic}
                onChange={(e) => setSignupProfilePic(e.target.value)}
            />
        </div>
        <div className="grid grid-cols-2 gap-4">

        {/* Gender Selection with Radio Buttons */}
        <div className="grid grid-cols-1 gap-4">
            <span className="text-white">Gender:</span>
            <div className="flex items-center">
                <input 
                    type="radio" 
                    id="male" 
                    name="gender" 
                    value="male" 
                    checked={signupGender === "male"}
                    onChange={(e) => setSignupGender(e.target.value)} 
                    className="mr-2"
                />
                <label htmlFor="male" className="text-white">Male</label>
                <input 
                    type="radio" 
                    id="female" 
                    name="gender" 
                    value="female" 
                    checked={signupGender === "female"}
                    onChange={(e) => setSignupGender(e.target.value)} 
                    className="mr-2 ml-4"
                />
                <label htmlFor="female" className="text-white">Female</label>
                <input 
                    type="radio" 
                    id="other" 
                    name="gender" 
                    value="other" 
                    checked={signupGender === "other"}
                    onChange={(e) => setSignupGender(e.target.value)} 
                    className="mr-2 ml-4"
                />
                <label htmlFor="other" className="text-white">Other</label>
            </div>
        </div>
        {/* Age */}
        <FormInput
            type="text"
            placeholder="Age"
            value={signupAge}
            onChange={(e) => setSignupAge(e.target.value)}
        />
</div>
        <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-lg transition-colors"
            disabled={loading}
        >
            Create Account
        </button>
        <button type="button" onClick={() => setShowSignupModal(false)}>Close</button>
    </form>
    )
}
const SigninForms =()=>{
    return (
        <div></div>
    )
}
const VerifyForms =()=>{
    return (
        <div></div>
    )
}
const ValidateForms =()=>{
    return (
        <div></div>
    )
}
export  {SignupForms, SigninForms, VerifyForms, ValidateForms};