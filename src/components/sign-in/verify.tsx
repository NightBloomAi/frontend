import React from "react";

export default function Verify() {
  return (
    <form
      // onSubmit={}
      className="w-full h-auto flex flex-col items-center justify-center lg:p-12 p-9 gap-y-9"
    >
      <div className="text-4xl font-museo pt-5">Verify Your Email</div>
      <div className="text-base w-96 text-center">
        Please click on the link sent to your email address to continue
      </div>
      <button
        type="submit"
        className="duration-300 hover:text-[var(--opaque-trans-grey)] hover:bg-[var(--pink)] mb-5 rounded-full px-5 py-[10px] text-base text-[var(--pink)] border-2 border-[var(--pink)] w-96 flex justify-center items-center"
      >
        Resend Email
      </button>
    </form>
  );
}
