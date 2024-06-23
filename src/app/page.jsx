
import fetchToursData, { searchTours } from "@/actions/tourActions/tour";
import MainLayout from "@/components/home/MainLayout";

export default async function Home() {
  

  const searchTour = async (query) => {
    "use server";
    return await searchTours(query);
  };

  const toursData = await fetchToursData().then((data) => data.data.data);


  return (
    <main>
     <MainLayout  toursData={toursData} searchTour={searchTour}/>
    </main>
  );
}
