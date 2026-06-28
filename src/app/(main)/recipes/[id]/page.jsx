import Image from "next/image";
import RecipeActions from "./RecipeActions";

async function getRecipe(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URI}/recipes/${id}`,
    { cache: "no-store" },
  );
  if (!res.ok) throw new Error("Failed to fetch recipe");
  return res.json();
}

export default async function RecipeDetailsPage({ params }) {
  const { id } = await params;
  const recipe = await getRecipe(id);

  const ingredientsList = Array.isArray(recipe.ingredients)
    ? recipe.ingredients
    : typeof recipe.ingredients === "string"
      ? recipe.ingredients.split("\n").filter((i) => i.trim() !== "")
      : [];

  return (
    <div className="min-h-screen p-4 md:p-10 bg-gray-50 dark:bg-[#0f121e] text-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-[#161a29] p-6 rounded-3xl dark:border-gray-800 shadow-xl">
            <div className="relative w-full h-80">
              <Image
                src={recipe.recipeImage}
                alt={recipe.recipeName}
                fill
                className="object-cover rounded-2xl"
                priority
              />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mt-6">
              {recipe.recipeName}
            </h1>
            <p className="text-gray-500 mt-2">
              {recipe.cuisineType} | {recipe.category} |{" "}
              {recipe.preparationTime || "N/A"}
            </p>

            <div className="mt-8">
              <h2 className="text-2xl font-bold">Instructions</h2>
              <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {recipe.instructions}
              </p>
            </div>

            <RecipeActions recipeId={recipe._id} />
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-[#161a29] p-6 rounded-3xl dark:border-gray-800 shadow-xl sticky top-20">
            <h2 className="text-xl font-bold mb-4">Ingredients</h2>

            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              {ingredientsList.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  {item}
                </li>
              ))}
            </ul>
            <form action={ '/api/payment' } method="POST">
              <input type="hidden"  name="price" value={recipe.price} />
              <input type="hidden"  name="title" value={recipe.recipeName} />
              <input type="hidden"  name="recipeId" value={recipe._id} />
              <button type="submit" className="w-full mt-8 bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition">
                Buy Recipe - $
                {recipe.price ? parseFloat(recipe.price).toFixed(2) : "0"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
