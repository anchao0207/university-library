"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { borrowBook } from "@/lib/actions/book";

interface Props {
  userId: string;
  bookId: string;
  borrowEligibility: {
    isEligible: boolean;
    message: string;
  };
}

const BorrowBook = ({
  userId,
  bookId,
  borrowEligibility: { isEligible, message },
}: Props) => {
  const router = useRouter();
  const [borrowing, setBorrowing] = useState(false);

  const handleBorrow = async () => {
    if (!isEligible) {
      toast.error("Error", {
        description: message,
      });
    }

    setBorrowing(true);

    try {
      const result = await borrowBook({ bookId, userId });

      if (result.success) {
        toast.success("Book borrowed successfully.");

        router.push("/");
      } else {
        toast.error("Error borrowing book.", {
          description: "An error occurred while borrowing the book",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error", {
        description: "An error occurred while borrowing the book",
      });
    } finally {
      setBorrowing(false);
    }
  };
  return (
    <Button
      className="book-overview_btn"
      onClick={handleBorrow}
      disabled={borrowing}
    >
      <Image src="/icons/book.svg" width={20} height={20} alt="book"></Image>
      <p className="font-bebas-neue text-xl text-dark-100">
        {borrowing ? "Borrowing..." : "Borrow Book"}
      </p>
    </Button>
  );
};

export default BorrowBook;
