"use client";

import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { useApiContext } from "@/contexts/ApiContext";
import { ButtonDemo, InputDemo, BreadcrumbDemo, DialogDemo } from "@/components/index";
import localData from "@/localData";
import useAlert from "@/hooks/alert/useAlert";
import useJoiValidation from "@/hooks/joi-validation/useJoiValidation";

const { googleLogo } = localData.images;

const breadcrumbItems = [
  {
    href: "/",
    label: "Home",
  },
  {
    label: "Account",
  },
];

const Account = () => {
  const [isEmailPasswordMethodEnabled, setIsEmailPasswordMethodEnabled] = useState(false);
  const [isGoogleSignInMethodEnabled, setIsGoogleSignInMethodEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser, handleSignInWithGoogle } = useAuthContext();
  const { fetchedCurrentUser, fetchedUsers } = useApiContext();

  const { email, role } = fetchedCurrentUser.details;

  useEffect(() => {
    if (!currentUser) return;
    const _isEmailPasswordMethodEnabled = currentUser.providerData.find(
      (item) => item.providerId === "password"
    );
    if (_isEmailPasswordMethodEnabled) setIsEmailPasswordMethodEnabled(true);

    const _isGoogleSignInMethodEnabled = currentUser.providerData.find(
      (item) => item.providerId === "google.com"
    );
    if (_isGoogleSignInMethodEnabled) setIsGoogleSignInMethodEnabled(true);
  }, [currentUser]);

  const [admins, setAdmins] = useState<any[]>([]);

  useEffect(() => {
    if (!fetchedUsers.list.length) return;
    setAdmins(fetchedUsers.list.filter((user) => user.role === "admin"));
  }, [fetchedUsers]);

  return (
    <main className="p-5">
      <h2 className="text-2xl mb-3">Account</h2>
      <BreadcrumbDemo items={breadcrumbItems} />
      <br />
      <br />
      <br />

      <div className="mb-[300px]   grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] justify-center gap-[20px] ">
        <div className="min-h-[200px] flex-1   p-3 bg-gray-50 dark:bg-secondary rounded-lg">
          <h2 className="text-1xl mb-2 text-sm font-bold">Email/password sign in method:</h2>
          {isEmailPasswordMethodEnabled && <div className="text-success text-sm mb-4">Enabled</div>}
          {!isEmailPasswordMethodEnabled && (
            <div className="mb-2">
              <AddPasswordDialog />
            </div>
          )}
          {isEmailPasswordMethodEnabled && (
            <div className="mb-2">
              <UpdatePasswordDialog />
            </div>
          )}
          {isEmailPasswordMethodEnabled && !isGoogleSignInMethodEnabled && <UpdateEmailDialog />}
        </div>

        <div className="min-h-[200px] flex-1  p-3 bg-gray-50 dark:bg-secondary rounded-lg">
          <h2 className="text-1xl mb-2 text-sm font-bold">Google sign in method:</h2>
          {isGoogleSignInMethodEnabled ? (
            <div className="text-success text-sm  mb-4">Enabled</div>
          ) : (
            <ButtonDemo
              startIcon={<img src={googleLogo} className="h-[16px]" />}
              text={`${isLoading ? "Signing In..." : "Continue with Google"} `}
              className={` text-sm text-gray-700 `}
              disabled={isLoading}
              variant="outline"
              onClick={() => handleSignInWithGoogle({})}
            />
          )}
        </div>

        <div className="min-h-[200px] flex-1  p-3 bg-gray-50 dark:bg-secondary rounded-lg">
          <div className="flex items-center justify-between text-sm gap-5 py-1">
            <div className="font-bold">Email:</div>
            <div className="capitalize">{email}</div>
          </div>
          <div className="flex items-center justify-between text-sm gap-5 py-1">
            <div className="font-bold">Role:</div>
            <div className="capitalize">{role || "user"}</div>
          </div>
          <div className="flex items-center justify-between text-sm gap-5 py-1">
            <div className="font-bold">Is email verified:</div>
            <div className="capitalize">{currentUser?.emailVerified ? "Yes" : "No"}</div>
          </div>
        </div>

        <div className="min-h-[200px] flex-1  p-3 bg-gray-50 dark:bg-secondary rounded-lg">
          <div className="font-bold text-sm ">SuperAdmin:</div>
          <div className="mb-6 text-sm">
            {fetchedUsers.list.find((superAdmin) => superAdmin.role === "superAdmin")?.displayName || (
              <span className="text-sm text-gray-400">No SuperAdmin</span>
            )}
          </div>

          <div className="font-bold text-sm ">Admin(s):</div>
          <div className="">
            {admins.length ? (
              admins.map((admin, index) => (
                <span key={index} className="text-sm">
                  {admin.displayName}
                  {index < admins.length - 1 && ", "}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-400">No admin(s)</span>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

type ValidationResult = {
  error?: {
    details: {
      path: string[];
      message: string;
    }[];
  };
};

// ADD PASSWORD
const AddPasswordDialog = () => {
  return (
    <DialogDemo trigger={<ButtonDemo text="Add Password" variant="outline" className={` cursor-pointer `} />}>
      {(closeDialog) => <AddPasswordContent closeDialog={closeDialog} />}
    </DialogDemo>
  );
};

const AddPasswordContent = ({ closeDialog = () => {} }) => {
  const [state, setState] = useState({ password: "", repeatPassword: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { handleSignUp, handleSignInWithGoogle, handleLinkEmailPasswordAccount, currentUser, handleSignOut } =
    useAuthContext();

  const { validateAddPassword } = useJoiValidation();
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [result, setResult] = useState<ValidationResult>({});
  const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = validateAddPassword(state);
    if (!error) {
      if (!currentUser) return;
      handleLinkEmailPasswordAccount({
        email: currentUser.email,
        password: state.password,
        setIsLoading,
        callback: () => {
          sessionStorage.setItem("isPasswordAdded", "true");
          handleSignOut({});
        },
      });
      console.log("Submit");
    }
    if (!error) return;
    setWasSubmitted(true);
  };

  useEffect(() => setResult(validateAddPassword(state)), [state]);

  useEffect(() => {
    if (!wasSubmitted) return;
    const errors: Record<string, string> = {};
    result?.error?.details.forEach((item) => {
      if (errors[item.path[0]]) return;
      errors[item.path[0]] = item.message;
    });
    setErrorMessages(errors);
  }, [result, wasSubmitted]);

  return (
    <form onSubmit={onSubmit} className={`${wasSubmitted ? "was-submitted" : ""} m-5 max-w-[360px] mx-auto`}>
      <h2 className="text-2xl text-center mb-5">Add password</h2>
      <InputDemo
        label="Password"
        placeholder="Password"
        name="password"
        type="text"
        callback={(e) => onChange(e)}
        className="mb-5"
        value={state.password}
        errorMessage={errorMessages.password}
        inputClassName={errorMessages.password ? "is-invalid" : "is-valid"}
      />

      <InputDemo
        label="Repeat Password"
        placeholder="Repeat Password"
        name="repeatPassword"
        type="text"
        callback={(e) => onChange(e)}
        className="mb-5"
        value={state.repeatPassword}
        errorMessage={errorMessages.repeatPassword}
        inputClassName={errorMessages.repeatPassword ? "is-invalid" : "is-valid"}
      />

      <ButtonDemo
        text={`${isLoading ? "Loading..." : "Add Password"}`}
        className={`w-full mb-5 text-sm`}
        // disabled={isLoading || error}
      />
    </form>
  );
};

// UPDATE PASSWORD
const UpdatePasswordDialog = () => {
  return (
    <DialogDemo
      trigger={<ButtonDemo text="Update Password" variant="outline" className={` cursor-pointer `} />}
    >
      {(closeDialog) => <UpdatePasswordContent closeDialog={closeDialog} />}
    </DialogDemo>
  );
};

const UpdatePasswordContent = ({ closeDialog = () => {} }) => {
  const [state, setState] = useState({ password: "", repeatPassword: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { handleUpdatePassword, handleLinkEmailPasswordAccount, currentUser, handleSignOut } =
    useAuthContext();

  const { validateAddPassword } = useJoiValidation();
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [result, setResult] = useState<ValidationResult>({});
  const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = validateAddPassword(state);
    if (!error) {
      handleUpdatePassword({
        password: state.password,
        setIsLoading,
        callback: () => {
          sessionStorage.setItem("isPasswordUpdated", "true");
          handleSignOut({});
        },
      });
      console.log("Submit");
    }
    if (!error) return;
    setWasSubmitted(true);
  };

  useEffect(() => setResult(validateAddPassword(state)), [state]);

  useEffect(() => {
    if (!wasSubmitted) return;
    const errors: Record<string, string> = {};
    result?.error?.details.forEach((item) => {
      if (errors[item.path[0]]) return;
      errors[item.path[0]] = item.message;
    });
    setErrorMessages(errors);
  }, [result, wasSubmitted]);

  return (
    <form onSubmit={onSubmit} className={`${wasSubmitted ? "was-submitted" : ""} m-5 max-w-[360px] mx-auto`}>
      <h2 className="text-2xl text-center mb-5">Update password</h2>
      <InputDemo
        label="Password"
        placeholder="Password"
        name="password"
        type="text"
        callback={(e) => onChange(e)}
        className="mb-5"
        value={state.password}
        errorMessage={errorMessages.password}
        inputClassName={errorMessages.password ? "is-invalid" : "is-valid"}
      />

      <InputDemo
        label="Repeat Password"
        placeholder="Repeat Password"
        name="repeatPassword"
        type="text"
        callback={(e) => onChange(e)}
        className="mb-5"
        value={state.repeatPassword}
        errorMessage={errorMessages.repeatPassword}
        inputClassName={errorMessages.repeatPassword ? "is-invalid" : "is-valid"}
      />

      <ButtonDemo
        text={`${isLoading ? "Loading..." : "Update Password"}`}
        className={`w-full mb-5 text-sm`}
        // disabled={isLoading || error}
      />
    </form>
  );
};

// UPDATE Email
const UpdateEmailDialog = () => {
  return (
    <DialogDemo trigger={<ButtonDemo text="Update Email" variant="outline" className={` cursor-pointer `} />}>
      {(closeDialog) => <UpdateEmailContent closeDialog={closeDialog} />}
    </DialogDemo>
  );
};

const UpdateEmailContent = ({ closeDialog = () => {} }) => {
  const [state, setState] = useState({ email: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { handleUpdateEmail } = useAuthContext();

  const { validateUpdateEmail } = useJoiValidation();
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [result, setResult] = useState<ValidationResult>({});
  const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = validateUpdateEmail(state);
    if (!error) {
      handleUpdateEmail({
        email: state.email,
        setIsLoading,
        callback: () => {
          console.log("trigger");
          closeDialog();
        },
      });

      console.log("Submit");
    }
    if (!error) return;
    setWasSubmitted(true);
  };

  useEffect(() => setResult(validateUpdateEmail(state)), [state]);

  useEffect(() => {
    if (!wasSubmitted) return;
    const errors: Record<string, string> = {};
    result?.error?.details.forEach((item) => {
      if (errors[item.path[0]]) return;
      errors[item.path[0]] = item.message;
    });
    setErrorMessages(errors);
  }, [result, wasSubmitted]);

  return (
    <form onSubmit={onSubmit} className={`${wasSubmitted ? "was-submitted" : ""} m-5 max-w-[360px] mx-auto`}>
      <h2 className="text-2xl text-center mb-5">Update Email</h2>
      <InputDemo
        label="Email"
        placeholder="email"
        name="email"
        type="text"
        callback={(e) => onChange(e)}
        className="mb-5"
        value={state.email}
        errorMessage={errorMessages.email}
        inputClassName={errorMessages.email ? "is-invalid" : "is-valid"}
      />

      <ButtonDemo
        text={`${isLoading ? "Loading..." : "Update Email"}`}
        className={`w-full mb-5 text-sm`}
        // disabled={isLoading || error}
      />
    </form>
  );
};

export default Account;
