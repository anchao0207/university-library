import Image from "next/image";
import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <>
      <BookOverview></BookOverview>
      <BookList></BookList>
    </>
  );
};

export default Home;
