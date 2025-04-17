import { useState, FormEvent, ChangeEvent } from "react";
import {
  Camera,
  MapPin,
  Tag,
  DollarSign,
  Type,
  FileText,
  Loader,
} from "lucide-react";
import { RetroGrid } from "@/components/magicui/retro-grid";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Define TypeScript interfaces
interface FormDataState {
  name: string;
  description: string;
  price: string;
  location: string;
  category: string;
}

interface ImagesState {
  image1: File | null;
  image2: File | null;
  image3: File | null;
  image4: File | null;
}

interface UserData {
  name: string;
  email: string;
  userId: string;
}

const AddCar = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    description: "",
    price: "",
    location: "",
    category: "Sedan",
  });

  const [images, setImages] = useState<ImagesState>({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, files } = e.target;
    if (files && files.length > 0) {
      setImages((prev) => ({
        ...prev,
        [id]: files[0],
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Check if at least one image is uploaded
    if (!images.image1 && !images.image2 && !images.image3 && !images.image4) {
      setError("Please upload at least one image");
      setLoading(false);
      return;
    }

    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You must be logged in to list a car");
        setLoading(false);
        return;
      }

      // Get userId from the user object in localStorage
      let userId = "";
      const userDataString = localStorage.getItem("user");

      if (userDataString) {
        try {
          const userData: UserData = JSON.parse(userDataString);
          userId = userData.userId;
        } catch (err) {
          console.error("Error parsing user data:", err);
          // Continue anyway as the middleware will extract userId from token
        }
      }

      // Create FormData object to send multipart/form-data
      const formDataToSend = new FormData();

      // Add text fields
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("category", formData.category);

      // Add userId if we got it from localStorage
      if (userId) {
        formDataToSend.append("userId", userId);
      }

      // Add images (only the ones that were selected)
      Object.keys(images).forEach((key) => {
        const imageKey = key as keyof ImagesState;
        if (images[imageKey]) {
          formDataToSend.append(key, images[imageKey] as File);
        }
      });

      // Make API request with token in headers
      const response = await axios.post(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:8000"
        }/api/car/add`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // FormData will automatically set the correct Content-Type
          },
        }
      );

      // Handle success
      setSuccess("Car listed successfully!");
      console.log("Car added:", response.data);

      // Redirect after successful submission (optional)
      setTimeout(() => {
        navigate("/my-listings");
      }, 2000);
    } catch (err) {
      console.error("Error adding car:", err);
      setError("Failed to add car. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4 relative">
      {/* RetroGrid as background */}
      <div className="absolute inset-0 z-0">
        <RetroGrid />
      </div>

      {/* Form content with z-index to appear above the RetroGrid */}
      <div className="bg-black rounded-lg shadow-xl w-full max-w-4xl relative z-10 border-4 border-amber-500 text-white">
        <div className="py-4 px-6 rounded-t-lg">
          <h1 className="text-2xl font-bold text-center">LIST YOUR CAR</h1>
        </div>

        {error && (
          <div className="mx-6 mb-4 p-3 bg-red-900/50 border border-red-500 rounded text-red-200">
            {error}
          </div>
        )}

        {success && (
          <div className="mx-6 mb-4 p-3 bg-green-900/50 border border-green-500 rounded text-green-200">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-1">
            <label className="flex items-center text-sm font-medium">
              <Type className="w-5 h-5 mr-2 text-amber-500" />
              Car Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-amber-500 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-900 text-white"
              placeholder="e.g. Toyota Camry 2022"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="flex items-center text-sm font-medium">
              <FileText className="w-5 h-5 mr-2 text-amber-500" />
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full border border-amber-500 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-900 text-white"
              placeholder="Describe your car's condition, features, etc."
              required
            />
          </div>

          {/* Styled Image Upload Section */}
          <div className="space-y-1">
            <label className="flex items-center text-sm font-medium">
              <Camera className="w-5 h-5 mr-2 text-amber-500" />
              Images (at least one required)
            </label>
            <div className="flex gap-4 flex-wrap mt-2">
              {[1, 2, 3, 4].map((num) => {
                const imageKey = `image${num}` as keyof ImagesState;
                return (
                  <label
                    key={imageKey}
                    htmlFor={imageKey}
                    className="hover:opacity-75 transition-opacity group"
                  >
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-amber-600/40 to-amber-500/40 rounded-lg blur opacity-40 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="w-24 h-24 flex items-center justify-center object-cover rounded-lg border-2 border-dashed border-amber-500/70 relative z-10 bg-gray-800">
                        {!images[imageKey] ? (
                          <Camera className="text-amber-500" size={24} />
                        ) : (
                          <img
                            className="w-full h-full object-cover rounded-lg"
                            src={URL.createObjectURL(images[imageKey] as File)}
                            alt="Car"
                          />
                        )}
                      </div>
                    </div>
                    <input
                      onChange={handleImageChange}
                      type="file"
                      id={imageKey}
                      hidden
                      accept="image/*"
                    />
                  </label>
                );
              })}
            </div>
          </div>

          <div className="space-y-1">
            <label className="flex items-center text-sm font-medium">
              <DollarSign className="w-5 h-5 mr-2 text-amber-500" />
              Price (per day)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-amber-500 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-900 text-white"
              placeholder="Enter price in dollars"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="flex items-center text-sm font-medium">
              <MapPin className="w-5 h-5 mr-2 text-amber-500" />
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border border-amber-500 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-900 text-white"
              placeholder="e.g. New York, NY"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="flex items-center text-sm font-medium">
              <Tag className="w-5 h-5 mr-2 text-amber-500" />
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-amber-500 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-900 text-white"
              required
            >
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Truck">Truck</option>
              <option value="Sports">Sports</option>
              <option value="Electric">Electric</option>
              <option value="Luxury">Luxury</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-4 rounded-md transition duration-200 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              "Submit Listing"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
