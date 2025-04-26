// "use client";

// import React, { useState } from "react";
// import { useApiContext } from "@/contexts/ApiContext";
// import { ButtonDemo, InputDemo, TextareaDemo, DialogDemo } from "@/components/index";
// import localData from "@/localData";
// import useUtil from "@/hooks/useUtil";

// const { placeholderImage } = localData.images;

// type EventStateProps = {
//   type: string | number;
//   name: string;
//   description: string;
//   points: number;
//   background: string;
// };

// const defaultState = {
//   type: "",
//   name: "",
//   description: "",
//   points: 5,
//   background: "",
// };

// const EventCardUpdateDialog = ({ item = {}, className = "" }: { [key: string]: any }) => {
//   return (
//     <DialogDemo
//       color="warning"
//       title={item.type}
//       description={item.description}
//       trigger={
//         <ButtonDemo
//           color="warning"
//           text="Update"
//           className={`ml-auto flex cursor-pointer w-full ${className}`}
//         />
//       }
//     >
//       {(closeDialog) => <Content closeDialog={closeDialog} {...item} />}
//     </DialogDemo>
//   );
// };

// const Content = ({
//   id = "",
//   createdBy = "",
//   name = "",
//   points = 0,
//   background = placeholderImage,
//   closeDialog = () => {},
// }) => {
//   const [state, setState] = useState<EventStateProps>(defaultState);
//   const [isLoading, setIsLoading] = useState(false);
//   const { updateEvent } = useApiContext();

//   const { compressImage, convertToBase64 } = useUtil();

//   const onSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     updateEvent({
//       id,
//       name: state.name,
//       background: state.background,
//       setIsLoading,
//       callback: () => {
//         closeDialog();
//       },
//     });
//   };

//   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setState((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;
//     const file = e.target.files[0];
//     try {
//       const compressedBlob = await compressImage(file, 300); // target 300KB
//       const imageBase64 = await convertToBase64(compressedBlob);
//       console.log(imageBase64);
//       setState((prev) => ({ ...prev, imageBase64 }));
//     } catch (err) {
//       console.error("Error during upload process:", err);
//     }
//   };
//   return (
//     <div className="card event-card">
//       <div className="card-header  mb-3 ">
//         {name && <h2 className="text-xs font-bold mb-6 bg-gray-100 p-3">{name}</h2>}
//         <div className="flex items-center justify-between">
//           <span className="flex items-center gap-1">
//             <div className="badge bg-success rounded-full w-5 h-5 flex items-center justify-center text-custom-sm  font-normal text-white">
//               <span className="ml-[-2px]  ">+{points}</span>
//             </div>
//             <span className="text-sm">Points</span>
//           </span>
//           <h2 className="text-sm font-medium">
//             Created by <span className="capitalize underline">{createdBy}</span>{" "}
//           </h2>
//         </div>
//       </div>

//       <div className="card-content mb-3 h-0 pt-[56.25%] relative wrapper rounded-lg">
//         <img className=" absolute w-full h-full top-0 object-cover" src={background} alt="" />
//       </div>

//       <div className="card-footer">
//         <form action="" onSubmit={onSubmit}>
//           <InputDemo
//             placeholder="Name"
//             name="name"
//             type="text"
//             callback={(e) => onChange(e)}
//             className="mb-3"
//           />

//           <InputDemo type="file" callback={(e) => handleUpload(e)} className="mb-5" />
//           {/* <TextareaDemo
//                         label="Description"
//                         placeholder="Description"
//                         name="description"
//                         type="text"
//                         callback={(e) => onChange(e)}
//                         className="mb-5"
//                         value={state.description}
//                       /> */}
//           <ButtonDemo
//             text={`${isLoading ? "Updating..." : "Update Event"}`}
//             className={`w-full mb-3 text-sm`}
//             disabled={isLoading}
//             color="warning"
//           />
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EventCardUpdateDialog;

"use client";

import React, { useState } from "react";
import { useApiContext } from "@/contexts/ApiContext";
import { ButtonDemo, InputDemo, TextareaDemo, SelectScrollable, DialogDemo } from "@/components/index";
import useUtil from "@/hooks/useUtil";

type EventStateProps = {
  type: string | number;
  name: string;
  points: string | number;
  expiry: string | number;
  background: string;
  description: string;
};

const defaultState = {
  type: "Custom",
  name: "",
  points: "",
  expiry: "",
  background: "",
  description: "",
};

const EventCardUpdateDialog = ({
  item = {},
  className = "",
}: {
  item: Record<string, unknown>;
  className: string;
}) => {
  return (
    <DialogDemo
      color="warning"
      title="Update Event"
      description={"This applies only on custom events"}
      trigger={
        <ButtonDemo
          color="warning"
          text="Update"
          className={`ml-auto flex cursor-pointer w-full ${className}`}
        />
      }
    >
      {(closeDialog) => <Content closeDialog={closeDialog} item={item} />}
    </DialogDemo>
  );
};

const Content = ({
  item = {},
  closeDialog = () => {},
}: {
  item: Record<string, any>;
  closeDialog: () => void;
}) => {
  const [state, setState] = useState<EventStateProps>(defaultState);
  const [isLoading, setIsLoading] = useState(false);

  const { updateEvent } = useApiContext();
  const { compressImage, convertToBase64 } = useUtil();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let expires = null;

    if (state.expiry) {
      const hours = Number(state.expiry) * 60;
      expires = new Date(Date.now() + hours * 60 * 1000);
    }
    updateEvent({
      id: item.id,
      name: state.name,
      description: state.description,
      points: state.points,
      background: state.background,
      expires,
      setIsLoading,
      callback: () => {
        closeDialog();
        setTimeout(() => setState(defaultState), 500);
      },
    });

    if (e.target instanceof HTMLFormElement) e.target.reset();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    try {
      const compressedBlob = await compressImage(file, 100); // target 300KB
      const imageBase64 = await convertToBase64(compressedBlob);
      console.log(imageBase64);
      setState((prev) => ({ ...prev, background: imageBase64 }));
    } catch (err) {
      console.error("Error during upload process:", err);
    }
  };

  // useEffect(()=>{
  //   setState(prev=>({
  //     ...prev,

  //   }))
  // },[item])

  return (
    <div className="wrapper">
      <form onSubmit={onSubmit} className="m-5 max-w-[360px] mx-auto add-movie-form ">
        <div className="text-sm mb-5 text-gray-300">Type: Custom</div>
        {state.type === "Custom" && (
          <>
            <InputDemo
              label="Name"
              placeholder="Name"
              name="name"
              type="text"
              callback={(e) => onChange(e)}
              className="mb-5"
              value={state.name}
            />

            <div className="flex gap-2">
              <div className="flex-1">
                <SelectScrollable
                  label="Expiry"
                  triggerClassName="w-full mb-5"
                  contentClassName=""
                  defaultItems={[
                    ...Array.from({ length: 24 }, (_, i) => {
                      const value = `${i + 1}`;
                      return {
                        label: `${value} hour${value !== "1" ? "s" : ""}`,
                        value,
                        isSelected: value === state.expiry.toString(),
                      };
                    }),
                    {
                      label: "No time limit",
                      value: "none",
                      isSelected: false,
                    },
                  ]}
                  callback={(selectedItem) => {
                    setState((prev) => ({
                      ...prev,
                      expiry: selectedItem.value,
                    }));
                  }}
                />
              </div>
              <div className="flex-1">
                <SelectScrollable
                  label="Points"
                  triggerClassName="w-full mb-5"
                  contentClassName=""
                  defaultItems={[
                    ...Array.from({ length: 100 }, (_, i) => {
                      const value = `${i + 1}`;
                      return {
                        label: `${value} point${value !== "1" ? "s" : ""}`,
                        value,
                        isSelected: value === state.points.toString(),
                      };
                    }),
                    {
                      label: "No points",
                      value: "none",
                      isSelected: false,
                    },
                  ]}
                  callback={(selectedItem) => {
                    setState((prev) => ({
                      ...prev,
                      points: selectedItem.value,
                    }));
                  }}
                />
              </div>
            </div>

            <InputDemo
              label="background"
              type="file"
              callback={(e) => handleUpload(e)}
              className="mb-5 find-me"
            />
            <TextareaDemo
              label="Description"
              placeholder="Description"
              name="description"
              type="text"
              callback={(e) => onChange(e)}
              className="mb-5"
              value={state.description}
            />
          </>
        )}

        <ButtonDemo
          text={`${isLoading ? "Updating..." : "Update Event"}`}
          className={`w-full mb-5 text-sm`}
          disabled={isLoading || state.type === ""}
          color="warning"
        />
      </form>
    </div>
  );
};

export default EventCardUpdateDialog;
