import Banner from "@/components/Banner";
import CommunityAndNewsletter from "@/components/CommunityAndNewsletter";
import FeaturedRecipes from "@/components/FeaturedRecipes";
import PopularRecipes from "@/components/PopularRecipes";
import WhyChooseUs from "@/components/WhyChooseUs";


export default function Home() {
  return (
    <div>
      <Banner/>
      <FeaturedRecipes/>
      <PopularRecipes/>
      <WhyChooseUs/>
      <CommunityAndNewsletter/>
    </div>
  );
}
