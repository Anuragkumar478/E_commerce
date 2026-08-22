import React from "react";
import { Grid2X2, ArrowRight } from "lucide-react";



const categories = [
  { name: "Books", icon: "📚" },
  { name: "Stationery", icon: "✏️" },
  { name: "Notebooks", icon: "📓" },
  { name: "Pens & Pencils", icon: "🖊️" },
  { name: "Art & Craft", icon: "🎨" },
  { name: "School Supplies", icon: "🎒" },
  { name: "Exam Preparation", icon: "📖" },
  { name: "Calculators", icon: "🧮" },
  { name: "Gifts", icon: "🎁" },
];


const CategorySection = ({
  selectedCategory,
  onCategoryClick,
}) => {
  return (
    <section className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-2 py-2">

        {/* Heading */}
        <div className="flex items-center justify-between mb-2">
         
          
        </div>

        {/* Categories */}
        <div className="flex gap-3 sm:gap-5 overflow-x-auto scrollbar-hide pb-2">
            
 <button
            onClick={() => onCategoryClick("All")}
            className="text-xs sm:text-sm text-blue-600 font-medium"
          >
             <Grid2X2 size={18} />
  <span>View All</span>
  <ArrowRight size={16} />
          </button>

          {categories.map((category) => {
            const selected =
              selectedCategory === category.name;

            return (
              <button
                key={category.name}
                type="button"
                onClick={() =>
                  onCategoryClick(category.name)
                }
                className="flex-shrink-0 w-20 sm:w-24 group"
              >
                {/* Icon */}
                <div
                  className={`
                    w-16 h-16
                    sm:w-18 sm:h-18
                    mx-auto
                    rounded-xl
                    flex items-center justify-center
                    text-3xl
                    border
                    transition-all duration-200
                    ${
                      selected
                        ? "bg-blue-50 border-blue-500 shadow-sm"
                        : "bg-gray-50 border-gray-200 group-hover:border-blue-300 group-hover:bg-blue-50"
                    }
                  `}
                >
                  {category.icon}
                </div>

                {/* Name */}
                <p
                  className={`
                    mt-1.5
                    text-xs
                    font-medium
                    text-center
                    truncate
                    ${
                      selected
                        ? "text-blue-600"
                        : "text-gray-700"
                    }
                  `}
                >
                  {category.name}
                </p>
              </button>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default CategorySection;