import { useContext, useRef, useState } from "react";
import { assets } from "../../assets/admin_assets/assets";
import { ShopContext } from "../../context/ShopContext";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [sizes, setSizes] = useState([]);
  const [productData, setProductData] = useState({});
  const imgRef = useRef();
  const { addProduct } = useContext(ShopContext);


  const handleAddProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("description", productData.description);
      formData.append("price", productData.price);
      formData.append("category", productData.category);
      formData.append("subCategory", productData.subCategory);
      formData.append("image", productData.image); // Append the image file
      formData.append("sizes", JSON.stringify(sizes)); // ✅ Store array as a JSON string

      // 🔍 Debugging: Log FormData content
      // for (let pair of formData.entries()) {
      //   console.log(pair[0], pair[1]);
      // }

      const data = await addProduct(formData); // Send FormData instead of JSON
      if(data && data.success){
        setProductData({})
        return toast.success(data.message,{
          duration:3000,
          position:'bottom-right'
        })
      }
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  const handleSizeChange = (e) => {
    setSizes((prev) =>
      prev.includes(e.target.id)
        ? prev.filter((size) => size !== e.target.id)
        : [...prev, e.target.id]
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      imgRef.current.src = URL.createObjectURL(file); // Show preview

      setProductData((prev) => ({
        ...prev,
        image: file, // Store File object in state
      }));

      console.log("Selected file:", file);
    }
  };

  const handleProductDetailsChange = (fieldName, value) => {
    setProductData((prev) => ({
      ...prev,
      [fieldName]: value || "", // Ensure it doesn't become "undefined"
    }));
  };

  return (
    <div className=" w-[50%]">
      <div className=" w-full flex flex-col gap-2 text-gray-700">
        <div className="flex flex-col gap-4">
          <p className="font-semibold">Upload Image</p>
          <label
            className=" w-1/5 h-20 flex items-center justify-center cursor-pointer bg-gray-300"
            htmlFor="image1"
          >
            <img
              ref={imgRef}
              className=" w-full h-full"
              src={assets.upload_area}
            />
            <input
              hidden
              type="file"
              id="image1"
              onChange={(e) => handleImageChange(e)}
            />
          </label>
        </div>

        <div className="flex flex-col gap-4">
          <p className="font-semibold">Product name</p>
          <input
            onChange={(e) => handleProductDetailsChange("name", e.target.value)}
            className="border border-gray-400 px-3 py-2"
            type="text"
            placeholder="Type here"
          />
        </div>

        <div className="flex flex-col gap-4">
          <p className="font-semibold">Product description</p>
          <textarea
            onChange={(e) =>
              handleProductDetailsChange("description", e.target.value)
            }
            name="description"
            className="border border-gray-400 px-3 py-2"
            placeholder="Write content here"
          />
        </div>

        <div className="flex  gap-5 ">
          <div className="flex flex-col gap-4">
            <p className="font-semibold">Product category</p>
            <select
              className=" h-full px-3 py-2 outline-none border border-gray-400"
              onChange={(e) =>
                handleProductDetailsChange("category", e.target.value)
              }
            >
              <option value="">Select Category</option>
              <option value="Mens">Mens</option>
              <option value="Womens">Womens</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-semibold">Product Sub category</p>
            <select
              onChange={(e) =>
                handleProductDetailsChange("subCategory", e.target.value)
              }
              className=" h-full px-3 py-2 outline-none border border-gray-400"
              name="subCategory"
              id="subCategory"
            >
              <option value="">Select SubCategory</option>

              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-semibold">Product Price</p>
            <input
              onChange={(e) =>
                handleProductDetailsChange("price", parseInt(e.target.value))
              }
              min={0}
              className="border outline-none border-gray-400 px-3 py-2"
              type="number"
              placeholder="25"
            />
          </div>
        </div>

        <div className="flex gap-3 items-center my-3">
          <div>
            <p
              onClick={handleSizeChange}
              id="S"
              className={` p-3 w-8 h-8 flex items-center justify-center cursor-pointer  border-none ${
                sizes.includes("S") ? "bg-pink-200" : "bg-gray-300"
              }`}
            >
              S
            </p>
          </div>
          <div>
            <p
              onClick={handleSizeChange}
              id="M"
              className={` p-3 w-8 h-8 flex items-center justify-center cursor-pointer  border-none ${
                sizes.includes("M") ? "bg-pink-200" : "bg-gray-300"
              }`}
            >
              M
            </p>
          </div>
          <div>
            <p
              onClick={handleSizeChange}
              id="L"
              className={` p-3 w-8 h-8 flex items-center justify-center cursor-pointer  border-none ${
                sizes.includes("L") ? "bg-pink-200" : "bg-gray-300"
              }`}
            >
              L
            </p>
          </div>
          <div>
            <p
              onClick={handleSizeChange}
              id="XL"
              className={` p-3 w-8 h-8 flex items-center justify-center cursor-pointer border-none ${
                sizes.includes("XL") ? "bg-pink-200" : "bg-gray-300"
              }`}
            >
              XL
            </p>
          </div>
          <div>
            <p
              onClick={handleSizeChange}
              id="XXL"
              className={` p-3 w-8 h-8 flex items-center justify-center cursor-pointer border-none ${
                sizes.includes("XXL") ? "bg-pink-200" : "bg-gray-300"
              }`}
            >
              XXL
            </p>
          </div>
        </div>

        <button
          onClick={handleAddProduct}
          className=" w-1/3 px-4 py-2 bg-black text-white"
        >
          ADD
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
