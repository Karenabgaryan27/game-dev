import React, { useState, useEffect } from "react";
import localData from "@/localData";
import { useApiContext } from "@/contexts/ApiContext";
import { useAuthContext } from "@/contexts/AuthContext";
import { ButtonDemo, DialogDemo, InputDemo, TextareaDemo, CropDemo } from "@/components/index";
import { Camera, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteUserDialog } from "../delete-user-dialog/DeleteUserDialog";
import useUtil from "@/hooks/useUtil";

const { bannerImage, avatarPlaceholderImage } = localData.images;

const ProfileHeader = () => {
  const {
    fetchedCurrentUser: { details },
  } = useApiContext();

  return (
    <div className="profile-header ">
      <div className="relative h-0 pt-[50%] sm:pt-[30%] bg-gray-100 rounded-lg ">
        {true && (
          <img
            className="banner absolute top-0 left-0 w-full h-full object-cover rounded-lg border"
            src={bannerImage}
            alt=""
          />
        )}
        <div className=" w-[25%]  lg:w-[170px]  left-[5%]  absolute avatar translate-y-[50%] bottom-0 ">
          <div className="  w-[100%] h-0 pt-[100%] relative rounded-full border-2 border-white shadow-[0_0_6px_rgba(0,0,0,0.3)] overflow-hidden ">
            <img
              src={details.base64PhotoURL || details.photoURL || avatarPlaceholderImage}
              className="block absolute bg-gray-50 top-0 left-0 w-full h-full object-cover"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-3 mb-[15px] sm:mb-[5%]">
        <div className="">
          <EditProfileDialog />
          <DeleteUserDialog id={details.uid} />
        </div>
      </div>

      <div className="md:pl-10 mb-10">
        <h2 className="font-bold text-2xl">{details.displayName}</h2>
        <div className="text-sm max-w-[380px] font-medium text-gray-500">{details.bio}</div>
      </div>
    </div>
  );
};

export default ProfileHeader;

const EditProfileDialog = () => {
  return (
    <DialogDemo
      trigger={
        <ButtonDemo text={`${"Edit Profile"}`} className={`mb-1 text-sm rounded-full flex w-full`} variant="outline" />
      }
    >
      {(closeDialog) => <EditProfileContent closeDialog={closeDialog} />}
    </DialogDemo>
  );
};

type StateProps = {
  isAvatarExist: boolean;
  isAvatarRemoved: boolean;
  newAvatar: string;
  inGameName: string;
  bio: string;
};

const EditProfileContent = ({ closeDialog = () => {} }) => {
  const { fetchedCurrentUser, updateUser, getUser } = useApiContext();
  const { convertToBase64, compressImage } = useUtil();
  const { details } = fetchedCurrentUser;

  const [state, setState] = useState<StateProps>({
    isAvatarExist: details.base64PhotoURL || details.photoURL,
    isAvatarRemoved: false,
    newAvatar: details.base64PhotoURL || details.photoURL || avatarPlaceholderImage,
    inGameName: "",
    bio: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuthContext();

  const [src, setSrc] = useState("");
  const [croppedImageSrc, setCroppedImageSrc] = useState("");

  const onSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // const compressedBlob = await compressImage(e.target.files[0], 300);
      const imageBase64 = await convertToBase64(e.target.files[0]);
      setSrc(imageBase64);

      e.target.value = "";
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedFields: { [key: string]: any } = {};

    if (state.newAvatar !== avatarPlaceholderImage) {
      updatedFields.base64PhotoURL = state.newAvatar;
    }
    if (state.isAvatarRemoved) {
      updatedFields.base64PhotoURL = "";
      // updatedFields.photoURL = "";
    }

    if (state.inGameName !== details.displayName) {
      updatedFields.displayName = state.inGameName;
    }
    if (state.bio !== details.bio) {
      updatedFields.bio = state.bio;
    }

    updateUser({
      id: currentUser?.uid,
      updatedFields,
      setIsLoading,
      callback: () => {
        closeDialog();
        getUser({ id: currentUser?.uid });
      },
    });
  };

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      inGameName: details.displayName,
      bio: details.bio,
    }));
  }, [fetchedCurrentUser]);

  return (
    <div>
      <CropAvatarDialog
        src={src}
        setSrc={setSrc}
        croppedImageSrc={croppedImageSrc}
        setCroppedImageSrc={setCroppedImageSrc}
        setState={setState}
      />
      <h2 className="text-2xl text-center mb-5">Edit Profile</h2>

      <div className="profile-header mb-[70px]">
        <div className="relative h-0 pt-[35%] sm:pt-[30%] bg-gray-100 rounded-lg ">
          {true && (
            <img
              className="banner absolute top-0 left-0 w-full h-full object-cover rounded-lg border"
              src={bannerImage}
              alt=""
            />
          )}
          <div className=" w-[25%] left-[5%]  absolute avatar translate-y-[50%] bottom-0 ">
            <div className="  w-[100%] h-0 pt-[100%] relative rounded-full border-2 border-white shadow-[0_0_6px_rgba(0,0,0,0.3)] overflow-hidden ">
              <img
                src={state.newAvatar}
                className="block absolute bg-gray-50 top-0 left-0 w-full h-full object-cover"
                alt=""
              />
              <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.3)] pointer-events-none"></div>

              <div className="absolute top-[50%] left-[50%] transform-[translate(-50%,-50%)] flex  gap-1">
                <ButtonDemo
                  onClick={() => {
                    const input = document.querySelector("#upload-avatar") as HTMLInputElement | null;
                    input?.click();
                  }}
                  startIcon={<Camera />}
                  className=" rounded-full w-[35px] h-[35px] bg-[rgba(0,0,0,0.7)] hover:bg-[rgba(0,0,0,0.8)] !shadow-none"
                />
                <input
                  id="upload-avatar"
                  type="file"
                  accept="image/*"
                  onChange={onSelectFile}
                  className="hidden"
                />
                {state.newAvatar !== avatarPlaceholderImage && !state.isAvatarRemoved && (
                  <ButtonDemo
                    startIcon={<X />}
                    className=" rounded-full w-[35px] h-[35px] bg-[rgba(0,0,0,0.7)] hover:bg-[rgba(0,0,0,0.8)] !shadow-none"
                    onClick={() => {
                      setState((prev) => ({
                        ...prev,
                        isAvatarRemoved: true,
                        newAvatar: avatarPlaceholderImage,
                      }));
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <form onSubmit={onSubmit} className={`${""}`}>
        <InputDemo
          label="In-Game Name (IGN)"
          placeholder="In-Game Name (IGN)"
          name="inGameName"
          type="text"
          callback={(e) => onChange(e)}
          className="mb-5"
          value={state.inGameName}
        />
        <TextareaDemo
          label={<div>Bio</div>}
          placeholder="Bio"
          name="bio"
          type="text"
          value={state.bio}
          callback={onChange}
          className="mb-5"
        />
        <div className="button-group flex gap-2 justify-end">
          <ButtonDemo className="" text="Cancel" variant="outline" type="button" onClick={closeDialog} />
          <ButtonDemo className="" text={`${isLoading ? "Loading..." : "Save"}`} />
        </div>
      </form>
    </div>
  );
};

const CropAvatarDialog = ({
  src = "",
  setSrc = (_: any) => {},
  croppedImageSrc = "",
  setCroppedImageSrc = (_: any) => {},
  setState = (_: any) => {},
}) => {
  const callback = (kkk: any) => {
    console.log(kkk);
    setSrc("");
  };
  return (
    <DialogDemo
      callback={callback}
      contentClassName="sm:max-w-[600px] py-[50px]"
      isDialogOpened={src ? true : false}
      trigger={<div>fdsf</div>}
    >
      {(closeDialog) => (
        <CropAvatarDialogContent
          closeDialog={closeDialog}
          src={src}
          setSrc={setSrc}
          croppedImageSrc={croppedImageSrc}
          setCroppedImageSrc={setCroppedImageSrc}
          setState={setState}
        />
      )}
    </DialogDemo>
  );
};

const CropAvatarDialogContent = ({
  closeDialog = () => {},
  src = "",
  setSrc = (_: any) => {},
  croppedImageSrc = "",
  setCroppedImageSrc = (_: any) => {},
  setState = (_: any) => {},
}) => {
  function getBase64ImageSize(base64String: any) {
    const padding = base64String.endsWith("==") ? 2 : base64String.endsWith("=") ? 1 : 0;
    const base64Length = base64String.length;
    const sizeInBytes = (base64Length * 3) / 4 - padding;
    const sizeInKB = sizeInBytes / 1024;
    return { bytes: sizeInBytes, kilobytes: sizeInKB };
  }
  return (
    <div className="crop-avatar-dialog">
      <div className="max-w-[500px] mx-auto flex mb-10">
        <CropDemo src={src} aspect={1} setCroppedImageSrc={setCroppedImageSrc} />
      </div>
      <div className="button-group flex gap-2 justify-end">
        <ButtonDemo
          className=""
          text="Cancel"
          variant="outline"
          type="button"
          onClick={() => {
            closeDialog();
            setSrc("");
          }}
        />
        <ButtonDemo
          className=""
          text={`${"Apply"}`}
          onClick={() => {
            const size = getBase64ImageSize(croppedImageSrc).kilobytes;
            if (size > 300)
              return alert("The image size cannot exceed 300KB. Please choose a smaller image.");
            setState((prev: any) => ({ ...prev, newAvatar: croppedImageSrc, isAvatarRemoved: false }));
            setSrc("");
            closeDialog();
          }}
        />
      </div>
    </div>
  );
};
