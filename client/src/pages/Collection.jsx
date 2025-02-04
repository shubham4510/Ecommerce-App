import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [allProducts, setAllProducts] = useState(products);
  const [searchedProducts, setSearchedProducts] = useState("");
  const { showSearchBar, setShowSearchBar } = useContext(ShopContext);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  const sortProductsByPrice = (e) => {
    const order = e.target.value;
    if (searchedProducts.length > 0) {
      const searchedAndSortedProducts = [...allProducts].sort((a, b) =>
        order === "asc" ? a.price - b.price : b.price - a.price
      );
      setAllProducts(searchedAndSortedProducts);
      return;
    } else if (order === "relevant") {
      setAllProducts(products);
      return;
    } else {
      const sortedProducts = [...products].sort((a, b) =>
        order === "asc" ? a.price - b.price : b.price - a.price
      );
      setAllProducts(sortedProducts);
    }
  };

  const findProduct = () => {
    if (searchedProducts.trim().length < 1) {
      setAllProducts(products);
      return;
    }
    const searchProductsList = products.filter((product) =>
      product.name.toLowerCase().includes(searchedProducts.toLowerCase())
    );
    setAllProducts(searchProductsList);
  };

  // Filter Products based on selected categories and subcategories
const handleFilterProducts = () => {
  let filteredProducts = products.filter((product) =>
    (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
    (selectedSubCategories.length === 0 || selectedSubCategories.includes(product.subCategory))
  );

  setAllProducts(filteredProducts.length > 0 ? filteredProducts : products);
};


  // Handling Category Filter Change
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category) // Remove if already selected
        : [...prev, category] // Add if not selected
    );
  };
  
  const handleSubCategoryChange = (subcategory) => {
    setSelectedSubCategories((prev) =>
      prev.includes(subcategory)
        ? prev.filter((s) => s !== subcategory)
        : [...prev, subcategory]
    );
  };
  
  // Effect to search products
  useEffect(() => {
    findProduct();
  }, [searchedProducts]);

  // Effect to set all products initially
  useEffect(() => {
    setAllProducts(products);
  }, [products]);

  // Effect to handle filtering when categories or subcategories change
  useEffect(() => {
    handleFilterProducts();
  }, [selectedCategories, selectedSubCategories]);

  return (
    <div className=" h-full md:min-h-[100vh] flex flex-col items-center">
      <div
        className={` ${
          showSearchBar ? "flex" : "hidden"
        } w-[70%]  items-center justify-center gap-4`}
      >
        <div className="w-[60%] flex items-center justify-between border border-gray-400 rounded-full px-5 py-1 ">
          <input
            onChange={(e) => setSearchedProducts(e.target.value)}
            value={searchedProducts}
            className=" w-[90%] bg-transparent px-4 py-2 outline-none"
            type="text"
            placeholder="Search"
          />
          <img
            onClick={findProduct}
            className=" w-5 h-5 cursor-pointer"
            src={assets.search_icon}
          />
        </div>
        {/* CROSS ICON  */}
        <img
          onClick={() => setShowSearchBar(false)}
          className="w-4 h-4 cursor-pointer"
          src={assets.cross_icon}
        />
      </div>{" "}
      <div className="flex w-full gap-5 mt-5 h-full">
        {/* <Search/> */}
        <div className="flex flex-col gap-4 w-[20%] h-1/2">
          <p className=" text-2xl">FILTERS</p>
          <div className="flex flex-col w-full h-[20%] border border-gray-300 px-3 py-4 gap-2">
            <p className="font-semibold">CATEGORIES</p>
            <div className="">
              <p className="">
                <input
                  checked={selectedCategories.includes("Men")}
                  onChange={() => handleCategoryChange("Men")}
                  className=" mr-2"
                  type="checkbox"
                  value={"Men"}
                />
                Men
              </p>
              <p className="">
                <input
                  checked={selectedCategories.includes("Women")}
                  onChange={() => handleCategoryChange("Women")}
                  className=" mr-2"
                  type="checkbox"
                  value={"Women"}
                />
                Women
              </p>
              <p className="">
                <input
                  checked={selectedCategories.includes("Kids")}
                  onChange={() => handleCategoryChange("Kids")}
                  className=" mr-2"
                  type="checkbox"
                  value={"Kids"}
                />
                Kids
              </p>
            </div>
          </div>
          <div className="flex flex-col w-full h-[20%] border border-gray-300 px-3 py-4 gap-2">
            <p className="font-semibold">TYPE</p>
            <div className="">
              <p className="">
                <input
                  checked={selectedSubCategories.includes("Topwear")}
                  onChange={() => handleSubCategoryChange("Topwear")}
                  className=" mr-2"
                  type="checkbox"
                  value={"Topwear"}
                />
                Topwear
              </p>
              <p className="">
                <input
                  checked={selectedSubCategories.includes("Bottomwear")}
                  onChange={() => handleSubCategoryChange("Bottomwear")}
                  className=" mr-2"
                  type="checkbox"
                  value={"Bottomwear"}
                />
                Bottomwear
              </p>
              <p className="">
                <input
                  checked={selectedSubCategories.includes("Winterwear")}
                  onChange={() => handleSubCategoryChange("Winterwear")}
                  className=" mr-2"
                  type="checkbox"
                  value={"Winterwear"}
                />
                Winterwear
              </p>
            </div>
          </div>
        </div>


        {/* HERO SECTION */}
        <div className="flex flex-col gap-4 w-[80%]">
          {/* SORTING  */}
          <div className="flex items-center justify-between">
            <Title text1={"ALL"} text2={"COLLECTIONS"} />
            <form>
              <select
                onChange={sortProductsByPrice}
                className=" border border-gray-500 p-2 cursor-pointer outline-none"
                name="sort"
                id="sort"
              >
                <option value="relevant">Sort by: Relevant</option>
                <option value="asc">Sort by: Low to High</option>
                <option value="dsc">Sort by: High to Low</option>
              </select>
            </form>
          </div>

          <div className="gap-4 grid grid-cols-4">
            {allProducts.map(({ _id, image, name, price }) => (
              <ProductItem
                key={_id}
                id={_id}
                image={image}
                name={name}
                price={price}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
