"use client";
import React, { useContext, useState } from "react";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import { dividerClasses } from "@mui/material";
import { useAuthContext } from "@/contexts/authContext";

// const [subOpen, setSubOpen] = useState(false);

export default function AccountSettings() {
  const [emailOpen, setEmailOpen] = useState(false);
  const [passOpen, setPassOpen] = useState(false);
  const { forgotPassword } = useAuthContext();
  const [email, setEmail] = useState("");

  type SettingsType = {
    name: string;
    icon: React.ReactElement;
    buttonName: string;
    state: boolean | undefined;
  };

  const settingsItems: SettingsType[] = [
    // {
    //   name: "Email",
    //   icon: <EmailOutlinedIcon className="h-6 w-6" />,
    //   buttonName: "Change",
    //   state: emailOpen,
    // },
    {
      name: "Password",
      icon: <VpnKeyOutlinedIcon className="h-6 w-6" />,
      buttonName: "Change",
      state: passOpen,
    },
    // {
    //   name: "Subscription",
    //   icon: <AttachMoneyOutlinedIcon className="h-6 w-6" />,
    //   buttonName: "Manage",
    //   state: undefined,
    // },
  ];

  return (
    <main className="container mx-auto px-4 max-w-screen-xl">
      <div className="flex flex-col justify-center w-full">
        <p className="text-center text-4xl md:text-5xl font-museo my-16 md:my-32">
          Account Settings
        </p>
        <div className="flex flex-col justify-center items-center w-full gap-y-6">
          {settingsItems.map((item) => {
            return (
              <>
                <div
                  key={item.name}
                  className=" md:w-5/6 w-11/12 px-4 py-[14px] bg-[var(--trans-grey)] rounded flex items-center justify-between text-base relative"
                >
                  <div className="text-base flex items-center justify-center h-6 gap-x-3">
                    {item.icon}
                    {item.name}
                  </div>
                  <div
                    onClick={() => {
                      if (item.name == "Email") {
                        setEmailOpen(!emailOpen);
                      }
                      if (item.name == "Password") {
                        setPassOpen(!passOpen);
                      }
                    }}
                    className="px-6 py-2 border-solid border-[var(--lightest-grey)] border-2 rounded-full hover:bg-[var(--lightest-grey)] hover:text-[var(--opaque-trans-grey)] duration-300 cursor-pointer"
                  >
                    {item.buttonName}
                  </div>
                </div>
                {item.state == true && (
                  <div className="bg-[var(--trans-light-grey)] rounded-b md:w-5/6 w-11/12 -mt-6 duration-300 px-4 py-6 flex items-center justify-center">
                    {/* {(item.name == "Email") && (
                        <form className="flex flex-col gap-y-6">
                            <div>Enter New Email</div>
                            <input placeholder="Email Address" className="-mt-3 bg-transparent border-solid border-2 border-[var(--lightest-grey)] rounded placeholder:text-[var(--lightest-grey)] px-4 py-2 w-96"></input>
                            <button type="submit" className="px-6 py-2 border-solid border-[var(--lightest-grey)] border-2 rounded-full hover:bg-[var(--lightest-grey)] hover:text-[var(--opaque-trans-grey)] duration-300 cursor-pointer w-24 ml-auto">Save</button>
                        </form>
                    )} */}
                    {item.name == "Password" && (
                      <form className="flex flex-col gap-y-6">
                        <div>Enter the email you use for this account</div>
                        <input
                          placeholder="Email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          className="bg-transparent border-solid border-2 border-[var(--lightest-grey)] rounded placeholder:text-[var(--lightest-grey)] px-4 py-2 w-96 -mt-3"
                        ></input>
                        <div className="w-96">
                          You will receive an email with a link to reset your
                          password
                        </div>
                        <button
                          type="submit"
                          className="px-6 py-2 border-solid border-[var(--lightest-grey)] border-2 rounded-full hover:bg-[var(--lightest-grey)] hover:text-[var(--opaque-trans-grey)] duration-300 cursor-pointer w-24 ml-auto"
                          onClick={(e) => {
                            e.preventDefault();
                            forgotPassword({ email: email });
                          }}
                        >
                          Send
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>
      <div className="h-16"></div>
    </main>
  );
}
