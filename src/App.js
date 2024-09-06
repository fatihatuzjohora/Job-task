import { useEffect, useState } from "react";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://endgame-job-task-server.vercel.app/api/products")
      .then((response) => {
        const products = response.data;
        setProducts(products);

        const uniqueCategories = [
          ...new Set(products.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);

        setFilteredProducts(products);
      });
  }, []);

  console.log(products);
  const filterProductsByCategory = (category) => {
    const filtered = products.filter(
      (product) => product.category === category
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="container mx-auto">
      {/* React Tabs for Filtering */}
      <Tabs>
        <TabList>
          {categories.map((category) => (
            <Tab
              key={category}
              onClick={() => filterProductsByCategory(category)}
            >
              {category}
            </Tab>
          ))}
        </TabList>

        {categories.map((category) => (
          <TabPanel key={category}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts
                .filter((product) => product.category === category)
                .map((product) => (
                  <div
                    key={product.id}
                    className="card p-4 border rounded-lg shadow-md"
                  >
                    <img
                      src={product.photoUrl}
                      alt={product.name}
                      className="w-full h-48 object-cover mb-4"
                    />
                    <h2 className="text-lg font-bold">{product.name}</h2>
                    <p className="text-gray-600">{product.brand}</p>
                    <p className="text-gray-800 font-semibold">
                      {product.price}
                    </p>
                    <p className="text-gray-500">{product.description}</p>
                  </div>
                ))}
            </div>
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
}

export default App;
