import toast from "react-hot-toast";

export const handleError = (error: unknown) => {
  let message = "An error occurred";
  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  }
  toast.error(message, {
    icon: "😒",
    iconTheme: {
      primary: "#000",
      secondary: "#fff",
    },
  });
};
