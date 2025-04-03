import Image from "next/image";
import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { Button } from "@/components/ui/button";
import { sampleBooks } from "@/constants";

const Home = () => {
  return (
    <>
      <BookOverview {...sampleBooks[0]}></BookOverview>
      <BookList
        title="Latest Book"
        books={sampleBooks}
        containerClassName="mt-28"
      ></BookList>
    </>
  );
};

export default Home;
