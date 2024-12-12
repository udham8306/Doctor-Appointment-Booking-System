import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify"; // Assuming toast is used for notifications

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [tempData, setTempData] = useState({ ...userData });
  const [image, setImage] = useState(null);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", tempData.name);
      formData.append("phone", tempData.phone);
      formData.append("address", JSON.stringify(tempData.address));
      formData.append("gender", tempData.gender);
      formData.append("dob", tempData.dob);

      if (image) formData.append("image", image);

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        {
          headers: { token },
        }
      );
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(null);
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating profile");
    }
  };

  const handleEditToggle = () => {
    if (isEdit) {
      updateUserProfileData(); // Call update function when saving
    } else {
      setTempData(userData); // Reset temp data to current user data when entering edit mode
    }
    setIsEdit(!isEdit);
  };

  const handleCancel = () => {
    setTempData(userData); // Reset temp data
    setIsEdit(false); // Exit edit mode
    setImage(null); // Reset image
  };

  return (
    <div className="max-w-lg flex flex-col items-start p-4 bg-white rounded ">
      {isEdit ? (
        <label htmlFor="image" className="relative cursor-pointer">
          <div className="relative w-36 h-36 rounded-full overflow-hidden">
            <img
              className="w-full h-full rounded-full object-cover opacity-80"
              src={
                image
                  ? URL.createObjectURL(image)
                  : userData.image || assets.upload_area // Use dummy icon if no image
              }
            />
            {/* Render the upload icon on top */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25 rounded-full">
              <img
                src={assets.upload_icon}
                alt="Upload icon"
                className="w-10 h-10"
              />
            </div>
          </div>
          {/* Hidden input field for file selection */}
          <input
            type="file"
            id="image"
            className="hidden"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>
      ) : (
        <img
          className="w-36 h-36 rounded-full object-cover"
          src={userData.image || assets.upload_area} // Use upload_area if image is not available
          alt="Profile"
        />
      )}

      {isEdit ? (
        <input
          className="bg-gray-50 text-3xl font-medium max-w-full mt-4 px-2 py-1 rounded border border-gray-300"
          type="text"
          value={tempData.name}
          onChange={(e) =>
            setTempData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">
          {userData.name}
        </p>
      )}

      <hr className="bg-zinc-400 h-[1px] w-full my-4" />

      <div className="w-full">
        <p className="text-neutral-500 underline mt-3 font-semibold">
          CONTACT INFORMATION
        </p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p>Email:</p>
          <p className="text-blue-400">{userData.email}</p>
          <p>Phone:</p>
          {isEdit ? (
            <input
              className="bg-gray-50 px-2 py-1 rounded border border-gray-300"
              type="text"
              value={tempData.phone}
              onChange={(e) =>
                setTempData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p className="text-blue-400">{userData.phone}</p>
          )}
          <p>Address:</p>
          {isEdit ? (
            <div>
              <input
                className="bg-gray-50 px-2 py-1 rounded border border-gray-300 w-full mt-1"
                value={tempData.address?.line1 || ""}
                onChange={(e) =>
                  setTempData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                type="text"
              />
              <input
                className="bg-gray-50 px-2 py-1 rounded border border-gray-300 w-full mt-1"
                value={tempData.address?.line2 || ""}
                onChange={(e) =>
                  setTempData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                type="text"
              />
            </div>
          ) : (
            <p>
              {userData.address?.line1 || "No address line 1"}
              <br />
              {userData.address?.line2 || "No address line 2"}
            </p>
          )}
        </div>

        <p className="text-neutral-500 underline mt-6 font-semibold">
          BASIC INFORMATION
        </p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p>Gender:</p>
          {isEdit ? (
            <select
              className="bg-gray-50 px-2 py-1 rounded border border-gray-300 cursor-pointer"
              value={tempData.gender || ""} // Ensure the value is empty by default
              onChange={(e) =>
                setTempData((prev) => ({ ...prev, gender: e.target.value }))
              }
            >
              <option value="" >
                Select Gender
              </option>{" "}
              {/* Placeholder option */}
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          ) : (
            <p>{userData.gender}</p>
          )}

          <p>Birthday:</p>
          {isEdit ? (
            <input
              className="bg-gray-50 px-2 py-1 rounded border border-gray-300"
              type="date"
              value={tempData.dob}
              onChange={(e) =>
                setTempData((prev) => ({ ...prev, dob: e.target.value }))
              }
            />
          ) : (
            <p>{userData.dob}</p>
          )}
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleEditToggle}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          {isEdit ? "Save Information" : "Edit"}
        </button>
        {isEdit && (
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
